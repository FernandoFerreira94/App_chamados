import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);

  useEffect(() => console.log(user), []);

  async function handleLogout() {
    await logout();
  }
  return (
    <>
      <Header />
      <div className="container">
        <h1>Pagina Dashboard</h1>

        <button onClick={handleLogout}>Sair</button>
      </div>
    </>
  );
}
