import React, { useEffect, useState } from "react";
import { request } from "../api";

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await request("/teachers", "GET");
        setTeachers(data);
      } catch (e) {
        setErr(e.error || "Error fetching teachers");
      }
    })();
  }, []);

  return (
    <div className="card">
      <h2>Teachers</h2>
      {err && <div className="alert error">{err}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>University</th>
            <th>Gender</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id}>
              <td>{t.id}</td>
              <td>{t.email}</td>
              <td>
                {t.first_name} {t.last_name}
              </td>
              <td>{t.university_name}</td>
              <td>{t.gender}</td>
              <td>{t.year_joined}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
