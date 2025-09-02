const API_BASE =
  import.meta.env.VITE_API_BASE ||
  "https://authteachermanager.onrender.com/api/auth";

export async function request(path, method = "GET", body = null) {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });
  const data = await res.json();
  if (!res.ok) throw data;
  return data;
}
