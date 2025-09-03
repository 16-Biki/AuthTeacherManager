import React, { useState } from "react";
import { request } from "../api";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    university_name: "",
    gender: "",
    year_joined: "",
  });
  const [msg, setMsg] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await request("/register", "POST", form);
      setMsg({ type: "success", text: res.message });
      setTimeout(() => (window.location.href = "/login"), 900);
    } catch (err) {
      setMsg({ type: "error", text: err.error || "Registration failed" });
    }
  };

  return (
    <div className="card">
      <h2>Register (Teacher)</h2>
      {msg && <div className={`alert ${msg.type}`}>{msg.text}</div>}

      <form onSubmit={submit} className="form">
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          type="email"
          required
        />
        <div className="row">
          <input
            name="first_name"
            placeholder="First name"
            value={form.first_name}
            onChange={onChange}
            required
          />
          <input
            name="last_name"
            placeholder="Last name"
            value={form.last_name}
            onChange={onChange}
            required
          />
        </div>
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />
        <input
          name="university_name"
          placeholder="University name"
          value={form.university_name}
          onChange={onChange}
          required
        />
        <div className="row">
          <input
            name="gender"
            placeholder="Gender"
            value={form.gender}
            onChange={onChange}
            required
          />
          <input
            name="year_joined"
            placeholder="Year joined (e.g. 2015)"
            value={form.year_joined}
            onChange={onChange}
            required
          />
        </div>
        <button className="btn">Register</button>
      </form>
    </div>
  );
}
