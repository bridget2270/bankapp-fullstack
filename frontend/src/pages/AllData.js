import React, { useContext } from "react";
import UserContext from "../context/UserContext.js";
import Card from "../components/Card.js";

function AllData() {
  const { logedInUser, users } = useContext(UserContext);

  const cardContent = logedInUser ? (
    <>
      {users.length > 0 ? (
        users.map((user) => (
          <div key={user.email}>
            <hr />
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Password: {user.password}</p>
          </div>
        ))
      ) : (
        <p>No user added yet!</p>
      )}
    </>
  ) : (
    <p>Log in to have access!</p>
  );

  return (
    <Card
      txtcolor="black"
      header="All Data in Store"
      title="Users"
      body={cardContent}
    />
  );
}

export default AllData;
