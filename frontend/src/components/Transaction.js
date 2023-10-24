import React, { useState, useContext } from "react";
import Card from "./Card.js";
import UserContext from "../context/UserContext.js";

function Transaction({ title }) {
  const { logedInUser, transaction } = useContext(UserContext);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (event) => {
    setMsg(""); // reset
    event.preventDefault();

    const amount = parseFloat(transactionAmount);

    if (isNaN(amount) || amount <= 0) {
      return setMsg("Please enter a valid positive amount.");
    }

    const err = await transaction(title, amount);

    if (err) return setMsg(err);

    setMsg(title + " successfull!");
    setTransactionAmount(0);
  };

  return (
    <Card
      bgcolor={logedInUser ? "primary" : "danger"}
      header={title}
      body={
        logedInUser ? (
          <>
            <h1>Account Balance: ${logedInUser.balance.toFixed(2)}</h1>
            <form onSubmit={handleSubmit}>
              <label htmlFor="amount">Enter amount:</label>
              <input
                type="number"
                step="0.01"
                min="0"
                required
                value={transactionAmount}
                onChange={(e) => setTransactionAmount(e.currentTarget.value)}
              />

              <button
                type="submit"
                className="btn btn-light mt-2"
                disabled={transactionAmount <= 0}
              >
                Submit
              </button>
              {msg && <p className="mt-1">{msg}</p>}
            </form>
          </>
        ) : (
          <p>Log in to have access!</p>
        )
      }
    />
  );
}

export default Transaction;
