import { useAuth } from "@clerk/clerk-react";

export function useApi() {
  const { getToken } = useAuth();

  async function request(path, options = {}) {
    const token = await getToken();
    const res = await fetch(`http://localhost:4000${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  return {
    listClients: () => request("/api/clients"),
    getClient: (id) => request(`/api/clients/${id}`),
    createClient: (data) =>
      request("/api/clients", { method: "POST", body: JSON.stringify(data) }),
    updateClient: (id, data) =>
      request(`/api/clients/${id}`, { method: "PUT", body: JSON.stringify(data) }),
    deleteClient: (id) => request(`/api/clients/${id}`, { method: "DELETE" }),
  };
}
