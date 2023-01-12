export default function checkProperty(data: unknown, key: string) {
  return Object.prototype.hasOwnProperty.call(data, key);
}
