import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";
import Card from "../components/Card.js";

function AllData() {
  const { users } = useContext(UserContext);
  return (
    <Card
      txtcolor="black"
      header="All Data in Store"
      title="Users"
      text=""
      body={
        users.length > 0 ? (
          users.map((user) => (
            <div>
              <hr />
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <p>Password: {user.password}</p>
            </div>
          ))
        ) : (
          <p>No user added yet!</p>
        )
      }
    />
  );
}

export default AllData;
