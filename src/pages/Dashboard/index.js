import React, { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

import Header from "../../components/Header";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);

  async function handleLogout() {
    await logout();
  }
  return (
    <>
      <Header />
      <h1>Pagina Dashboard</h1>
      <button onClick={handleLogout}>Sair</button>
    </>
  );
}
