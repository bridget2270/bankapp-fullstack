import { useState, createContext, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5001/api/users"
    : window.location.host + "/api/users";

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [logedInUser, setLogedInUser] = useState();
  const [showRegisterMsg, setShowRegisterMsg] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  console.log("BaseUrl: ", baseUrl);

  useEffect(() => {
    getStoredUser();
  }, []);

  useEffect(() => {
    getAllUsers();
  }, []);

  // get all users
  const getAllUsers = async () => {
    // api call to register user
    const response = await axios.get(baseUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    if (data.message) return alert(data.message);

    setUsers(data);
  };

  // register function
  const register = async (name, email, password) => {
    // api call to register user
    const response = await axios.post(
      baseUrl,
      { name, email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    if (data.message) return data.message;

    turnOn(data);
    getAllUsers();
  };

  // login function
  const login = async (email, password) => {
    // api call to register user
    const response = await axios.post(
      baseUrl + "/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = response.data;

    if (data.message) return data.message;

    turnOn(data);
  };

  // deposit function
  const deposit = async (amount) => {
    if (logedInUser.id) {
      // api call to deposit
      const response = await axios.put(
        baseUrl + "/deposit",
        { amount, id: logedInUser.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.message) return data.message;

      turnOn(data);
    } else return "You have to be logged in!";
  };

  // withdrawal function
  const withdraw = async (amount) => {
    if (logedInUser.id) {
      // api call to withdraw
      const response = await axios.put(
        baseUrl + "/withdraw",
        { amount, id: logedInUser.id },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;

      if (data.message) return data.message;

      turnOn(data);
    } else return "You have to be loged in!";
  };

  // logout of acc
  const logout = () => {
    deleteUserFromStorage();
    setLogedInUser();
    setShowLoginMsg(false);
    setShowRegisterMsg(false);
  };

  // store user in state
  const turnOn = (user) => {
    storeUserInStorage(user);
    setLogedInUser(user);
    setShowLoginMsg(true);
    setShowRegisterMsg(true);
  };

  // withdraw or deposit
  const transaction = async (type, amount) => {
    if (type === "Deposit") {
      return await deposit(amount);
    } else {
      return await withdraw(amount);
    }
  };

  function storeUserInStorage(user) {
    localStorage.setItem("bankapp-user", JSON.stringify(user));
  }
  function deleteUserFromStorage() {
    localStorage.removeItem("bankapp-user");
  }
  function getStoredUser() {
    const user = JSON.parse(localStorage.getItem("bankapp-user"));
    if (user) {
      turnOn(user);
      alert("You were automatically logged in!");
    }
  }

  return (
    <UserContext.Provider
      value={{
        users,
        register,
        login,
        transaction,
        logedInUser,
        showRegisterMsg,
        showLoginMsg,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
export { UserContextProvider };
