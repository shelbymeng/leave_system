function set(key: string, value: object): void {
  if (value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}

function get(key: string): object | null {
  const value = sessionStorage.getItem(key);
  if (!value) {
    return null;
  }
  return JSON.parse(value);
}

function remove(key: string): void {
  sessionStorage.removeItem(key);
}
export default { set, get, remove };
