import React, { useState, useContext } from "react";
import Card from "./Card.js";
import UserContext from "../context/UserContext.js";

function Transaction({ title }) {
  const { balance, transaction } = useContext(UserContext);
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [msg, setMsg] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const amount = parseFloat(transactionAmount);

    if (isNaN(amount) || amount <= 0) {
      return setMsg("Please enter a valid positive amount.");
    }

    const err = transaction(title, amount);
    if (err) return setMsg(err);
    
    setMsg(title + " successfull!");
    setTransactionAmount(0);
    setTimeout(() => {
      setMsg("");
    }, 5000);
  };

  const cardContent = (
    <>
      <h1>Account Balance: ${balance.toFixed(2)}</h1>
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
  );

  return <Card bgcolor="primary" header={title} body={cardContent} />;
}

export default Transaction;
