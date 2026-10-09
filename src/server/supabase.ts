import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import type { AdminUser } from "@/services/interface";
import { StorageBucket, type Table } from "@/types/enums";
import { SUPABASE_KEY, SUPABASE_URL } from "./config";

type WithId = { id?: number };

const publicClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
});

export const createAdminClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(SUPABASE_URL, SUPABASE_KEY, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (list) => {
        try {
          list.forEach(({ name, value, options }) => cookieStore.set(name, value, { ...options, httpOnly: true }));
        } catch {}
      },
    },
  });
};

export const getSingle = async <T>(table: Table) => {
  const { data, error } = await publicClient.from(table).select("*").limit(1).maybeSingle();
  if (error) throw error;
  return data as T | null;
};

export const getList = async <T>(table: Table) => {
  const { data, error } = await publicClient.from(table).select("*").order("sort_order").order("id");
  if (error) throw error;
  return data as T[];
};

export const saveSingle = async <T>(table: Table, row: Partial<T>) => {
  const supabase = await createAdminClient();
  const { data, error } = await supabase
    .from(table)
    .upsert({ ...row, id: 1 })
    .select()
    .single();
  if (error) throw error;
  return data as T;
};

export const saveList = async <T extends WithId>(table: Table, items: T[]) => {
  const supabase = await createAdminClient();
  const rows = items.map((item, index) => ({ ...item, sort_order: index + 1 }));
  const existing = rows.filter((row) => row.id);
  const fresh = rows.filter((row) => !row.id).map((row) => Object.fromEntries(Object.entries(row).filter(([key]) => key !== "id")));
  const keepIds = existing.map((row) => row.id as number);

  if (existing.length) {
    const { error } = await supabase.from(table).upsert(existing);
    if (error) throw error;
  }

  if (fresh.length) {
    const { data, error } = await supabase.from(table).insert(fresh).select("id");
    if (error) throw error;
    keepIds.push(...data.map((row) => row.id as number));
  }

  const remove = supabase.from(table).delete();
  const { error } = keepIds.length ? await remove.not("id", "in", `(${keepIds.join(",")})`) : await remove.gt("id", 0);
  if (error) throw error;

  return getList<T>(table);
};

export const getRow = async <T>(table: Table, column: string, value: string) => {
  const { data, error } = await publicClient.from(table).select("*").eq(column, value).maybeSingle();
  if (error) throw error;
  return data as T | null;
};

export const insertPublic = async (table: Table, row: object) => {
  const { error } = await publicClient.from(table).insert(row);
  if (error) throw error;
};

export const listForAdmin = async <T>(table: Table, orderBy: string) => {
  const supabase = await createAdminClient();
  const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: false });
  if (error) throw error;
  return data as T[];
};

export const updateForAdmin = async (table: Table, id: number, changes: object) => {
  const supabase = await createAdminClient();
  const { error } = await supabase.from(table).update(changes).eq("id", id);
  if (error) throw error;
};

export const deleteForAdmin = async (table: Table, id: number) => {
  const supabase = await createAdminClient();
  const { error } = await supabase.from(table).delete().eq("id", id);
  if (error) throw error;
};

export const upsertForAdmin = async (table: Table, rows: object[], onConflict: string) => {
  const supabase = await createAdminClient();
  const { error } = await supabase.from(table).upsert(rows, { onConflict });
  if (error) throw error;
};

export const uploadImage = async (path: string, file: Blob) => {
  const supabase = await createAdminClient();
  const { error } = await supabase.storage.from(StorageBucket.Images).upload(path, file, { contentType: file.type });
  if (error) throw error;
  return supabase.storage.from(StorageBucket.Images).getPublicUrl(path).data.publicUrl;
};

const readProfile = async (supabase: Awaited<ReturnType<typeof createAdminClient>>) => {
  const { data } = await supabase.from("users").select("email,full_name,role").maybeSingle();
  return data as AdminUser | null;
};

export const signIn = async (email: string, password: string) => {
  const supabase = await createAdminClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return readProfile(supabase);
};

export const signOut = async () => {
  const supabase = await createAdminClient();
  await supabase.auth.signOut();
};

export const getProfile = async () => {
  const supabase = await createAdminClient();
  const { data: claims } = await supabase.auth.getClaims();
  if (!claims) return null;
  return readProfile(supabase);
};
