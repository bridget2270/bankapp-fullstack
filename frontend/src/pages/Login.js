import React, { useState, useContext } from "react";
import Card from "../components/Card.js";
import UserContext from "../context/UserContext.js";

export default function Login() {
  const { login, showLoginMsg, logout } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    return true;
  }

  async function handleLogin() {
    setStatus("");
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const err = await login(email, password);
    if (err) return setStatus(err);
    clearForm();
  }
  function clearForm() {
    setEmail("");
    setPassword("");
  }

  return (
    <Card
      bgcolor="primary"
      header="Login to Account"
      status={status}
      body={
        !showLoginMsg ? (
          <>
            Email address
            <br />
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <br />
            Password
            <br />
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <br />
            <button
              type="submit"
              className="btn btn-light"
              onClick={handleLogin}
              disabled={!email || !password}
            >
              Login
            </button>
          </>
        ) : (
          <>
            <h5>Successfully logged in</h5>
            <button type="submit" className="btn btn-light" onClick={logout}>
              Logout
            </button>
          </>
        )
      }
    />
  );
}
