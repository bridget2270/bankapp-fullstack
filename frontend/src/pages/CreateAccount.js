import React, { useState, useContext } from "react";
import Card from "../components/Card.js";
import UserContext from "../context/UserContext.js";

export default function CreateAccount() {
  const { register, showRegisterMsg, logout } = useContext(UserContext);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validate(field, label) {
    if (!field) {
      setStatus("Error: " + label);
      setTimeout(() => setStatus(""), 3000);
      return false;
    }
    if (label === "email" && !isValidEmail(field)) {
      setStatus("Enter a valid email!");
      return false;
    }
    if (label === "password" && password.length < 8) {
      setStatus("Password should be 8 characters or more");
      return false;
    }
    return true;
  }

  async function handleCreate() {
    setStatus("");
    if (!validate(name, "name")) return;
    if (!validate(email, "email")) return;
    if (!validate(password, "password")) return;
    const err = await register(name, email, password);
    if (err) setStatus(err);
  }
  function clearForm() {
    setName("");
    setEmail("");
    setPassword("");
    logout();
  }
  function isValidEmail(email) {
    // Regular expression for basic email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    // Use the test() method to check if the email matches the regex
    return emailRegex.test(email);
  }

  return (
    <Card
      bgcolor="primary"
      header="Create Account"
      status={status}
      body={
        !showRegisterMsg ? (
          <>
            Name
            <br />
            <input
              type="input"
              className="form-control"
              id="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
            <br />
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
              onClick={handleCreate}
              disabled={!name || !email || !password}
            >
              Create Account
            </button>
          </>
        ) : (
          <>
            <h5>Success</h5>
            <button type="submit" className="btn btn-light" onClick={clearForm}>
              Add another account
            </button>
          </>
        )
      }
    />
  );
}
