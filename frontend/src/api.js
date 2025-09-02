const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000/api/auth";

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
