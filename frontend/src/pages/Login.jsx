import React, { useState } from "react";
import { request } from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setMsg(null);
    try {
      const res = await request("/login", "POST", { email, password });
      localStorage.setItem("user", JSON.stringify(res.user));
      window.location.href = "/users";
    } catch (err) {
      setMsg({ type: "error", text: err.error || "Login failed" });
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {msg && <div className={`alert ${msg.type}`}>{msg.text}</div>}
      <form onSubmit={submit} className="form">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <button className="btn">Login</button>
      </form>
    </div>
  );
}
