export const pick = <T extends object>(data: T, keys: (keyof T)[]) => {
  const result: Partial<T> = {};

  for (const key of keys) {
    if (key in data) {
      result[key] = data[key];
    }
  }

  return result;
};
