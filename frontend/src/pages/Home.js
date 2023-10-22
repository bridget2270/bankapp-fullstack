import React from "react";
import Card from "../components/Card.js";
import bankImg from "../assets/bank.png";

function Home() {
  return (
    <div>
      <Card
        txtcolor="black"
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={
          <img src={bankImg} className="img-fluid" alt="Responsive image" />
        }
      />
    </div>
  );
}
export default Home;
