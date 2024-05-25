export function toArray(data: any): any {
  if (Array.isArray(data)) {
    return data;
  }
  return Array.from(Object.values(data));
}
