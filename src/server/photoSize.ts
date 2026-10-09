import { readFile } from "node:fs/promises";
import path from "node:path";
import type { PhotoSize } from "@/services/interface";

const HEADER_BYTES = 65536;

const readHeader = async (src: string): Promise<Uint8Array | null> => {
  if (src.startsWith("/")) {
    const file = await readFile(path.join(process.cwd(), "public", decodeURIComponent(src.split("?")[0])));
    return file.subarray(0, HEADER_BYTES);
  }
  if (!src.startsWith("http")) return null;
  const response = await fetch(src, { headers: { Range: `bytes=0-${HEADER_BYTES - 1}` } });
  if (!response.ok) return null;
  return new Uint8Array(await response.arrayBuffer()).subarray(0, HEADER_BYTES);
};

const parseSize = (b: Uint8Array): { width: number; height: number } | null => {
  const view = new DataView(b.buffer, b.byteOffset, b.byteLength);
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) {
    return { width: view.getUint32(16), height: view.getUint32(20) };
  }
  if (b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) {
        i += 1;
        continue;
      }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker)) {
        return { height: view.getUint16(i + 5), width: view.getUint16(i + 7) };
      }
      i += 2 + view.getUint16(i + 2);
    }
    return null;
  }
  const text = (from: number, to: number) => String.fromCharCode(...b.subarray(from, to));
  if (text(0, 4) === "RIFF" && text(8, 12) === "WEBP") {
    const chunk = text(12, 16);
    if (chunk === "VP8X") return { width: 1 + (b[24] | (b[25] << 8) | (b[26] << 16)), height: 1 + (b[27] | (b[28] << 8) | (b[29] << 16)) };
    if (chunk === "VP8L") {
      const bits = view.getUint32(21, true);
      return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 };
    }
    if (chunk === "VP8 ") return { width: view.getUint16(26, true) & 0x3fff, height: view.getUint16(28, true) & 0x3fff };
  }
  return null;
};

export const withPhotoSize = async <T extends PhotoSize & { image_url: string }>(content: T): Promise<T> => {
  if (!content.image_url) return content;
  try {
    const header = await readHeader(content.image_url);
    const size = header && parseSize(header);
    if (!size?.width || !size.height) return content;
    return { ...content, image_width: size.width, image_height: size.height };
  } catch {
    return content;
  }
};
