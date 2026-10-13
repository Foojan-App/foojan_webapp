const clean = (value: unknown) => (typeof value === "string" ? value.replace(/ *\| */g, " ") : value);

export const pick = <T extends object>(data: T, keys: (keyof T)[]) => {
  const result: Partial<T> = {};

  for (const key of keys) {
    if (key in data) {
      result[key] = clean(data[key]) as T[keyof T];
    }
  }

  return result;
};
