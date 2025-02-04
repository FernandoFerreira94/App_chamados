import { Link } from "react-router-dom";
import { useContext, useEffect } from "react";
import { FiHome, FiUser, FiSettings, FiLogOut } from "react-icons/fi";

import { AuthContext } from "../../contexts/auth";

import "./header.css";
import avatarImg from "../../assets/avatar.png";

export default function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="sidebar">
      <div>
        <img
          src={user.avatarUrl === null ? avatarImg : user.avatarUrl}
          alt="foto do usuario"
        />
      </div>
      <Link to="/dashboard">
        <FiHome color="#fff" size={24} /> Chamados
      </Link>

      <Link to="/customers">
        <FiUser color="#fff" size={24} /> Clientes
      </Link>

      <Link to="/profile">
        <FiSettings color="#fff" size={24} /> Perfil
      </Link>
      <Link onClick={logout} className="btn-exit">
        <FiLogOut color="#fff" size={24} /> Exit
      </Link>
    </div>
  );
}
