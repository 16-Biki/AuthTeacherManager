import React, { useEffect, useState } from "react";
import { request } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/users", "GET");
        setUsers(data);
      } catch (e) {
        setErr(e.error || "Error fetching users");
      }
    })();
  }, []);

  return (
    <div className="card">
      <h2>Users</h2>
      {err && <div className="alert error">{err}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First</th>
            <th>Last</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.email}</td>
              <td>{u.first_name}</td>
              <td>{u.last_name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
