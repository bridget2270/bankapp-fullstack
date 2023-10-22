import { useState, createContext } from "react";
import axios from "axios";

const UserContext = createContext();
const baseUrl = "http://localhost:5001/api/users";

const UserContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [logedInUser, setLogedInUser] = useState();
  const [balance, setBalance] = useState(0);
  const [showRegisterMsg, setShowRegisterMsg] = useState(false);
  const [showLoginMsg, setShowLoginMsg] = useState(false);

  const register = async (name, email, password) => {
    setUsers([...users, { name, email, password }]);
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
    console.log(data);
    if (data.message) return alert(data.message);

    setLogedInUser(data);
    turnOn();
  };
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
    console.log(data);
    if (data.message) return alert(data.message);

    setLogedInUser(data);
    turnOn();
  };

  const logout = () => {
    setShowLoginMsg(false);
    setShowRegisterMsg(false);
    setLogedInUser();
  };
  const turnOn = () => {
    setShowLoginMsg(true);
    setShowRegisterMsg(true);
  };

  const transaction = (type, amount) => {
    if (type === "Deposit") {
      setBalance(balance + amount);
    } else {
      if (balance > amount) setBalance(balance - amount);
      else return "Amount should be less than balance";
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        register,
        login,
        balance,
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
