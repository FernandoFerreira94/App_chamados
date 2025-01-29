import { useState, createContext, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db, auth } from "../services/firebaseConection.js";

export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadUser() {
      const storageUser = localStorage.getItem("@userPro");

      if (storageUser) {
        setUser(JSON.parse(storageUser));
        setLoading(false);
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function signIn(email, password) {
    setLoadingAuth(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;

        const docRef = doc(db, "users", uid);
        const docSnap = await getDoc(docRef);

        let data = {
          uid: uid,
          nome: docSnap.data().nome,
          email: value.user.email,
          avatarUrl: docSnap.data().avatarUrl,
        };

        setUser(data);
        storageUser(data);
        setLoadingAuth(false);
        toast.success("Seja bem vindo! :D");
        navigate("/dashboard");
      })
      .catch((error) => {
        console.log(error);
        toast.error("ops");
        setLoadingAuth(false);
      });
  }

  async function signUp(name, email, password) {
    setLoadingAuth(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (value) => {
        let uid = value.user.uid;
        await setDoc(doc(db, "users", uid), {
          nome: name,
          avatarUrl: null,
        }).then(() => {
          let data = {
            uid: uid,
            nome: name,
            email: value.user.email,
            avatarUrl: null,
          };

          setUser(data);

          storageUser(data);

          setLoadingAuth(false);

          toast.success("Seja bem vindo! :D");

          navigate("/dashboard");
        });
      })
      .catch((error) => {
        toast.error(`erro ao cadastrar ${error}`);
        setLoadingAuth(false);
      });
  }

  function storageUser(data) {
    localStorage.setItem("@userPro", JSON.stringify(data));
  }

  async function logout() {
    await signOut(auth)
      .then(() => {
        localStorage.removeItem("@userPro");
        toast.info("Voçê foi deslogado");
        setUser(null);
      })
      .catch((error) => toast.error("Ops erro ao deslogar"));
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loadingAuth,
        loading,
        logout,
        signIn,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
