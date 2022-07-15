import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-app/firebase-config";

const { createContext, useState, useContext, useEffect } = require("react");

const AuthContext = createContext();
const AuthProvider = (props) => {
  const [userInfo, setUserInfo] = useState({});
  const value = { userInfo, setUserInfo };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUserInfo(user);
    });
  }, []);
  return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>;
};
function useAuth() {
  const context = useContext(AuthContext);
  if (context === "undefined")
    throw new Error("useAuth must be used within AuthProvider");
  return context;
}
export { AuthProvider, useAuth };
