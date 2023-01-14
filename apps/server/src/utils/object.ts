/**
 * Check if object has own property
 * @param data unknow
 * @param key string
 * @returns boolean
 */
export function checkProperty(data: unknown, key: string | number | symbol): boolean {
  return Object.prototype.hasOwnProperty.call(data, key);
}

/**
 * Pick properties from object based on keys
 * Useful to "type check" any object at runtime
 * @param object T
 * @param keys K extends keyof T
 * @returns T
 */
export function pick<T, K extends keyof T>(object: T, keys: K[]): T {
  return Object.assign(
    {},
    ...keys.map((key) => {
      if (object && checkProperty(object, key)) {
        return { [key]: object[key] };
      }
      return null;
    })
  );
}

/**
 * Exclude generic properties (like password)
 * @param entity T
 * @returns T
 */
export function exclude<T>(object: T, keysToExclude = ['password', 'createdAt', 'updatedAt']): T {
  const filtered = Object.entries(object as never).filter(([key, _val]) => !keysToExclude.includes(key));

  return <T>Object.fromEntries(filtered);
}
