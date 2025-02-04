import React, { useContext, useState, useEffect } from "react";
import { FiSettings, FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

import "./profile.css";
import Header from "../../components/Header";
import Title from "../../components/Title";
import avatarImg from "../../assets/avatar.png";
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConection.js";

export default function Profile() {
  const { user, storageUser, setUser, logout } = useContext(AuthContext);

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
  const [imageAvatar, setImageAvatar] = useState(null);

  const [name, setName] = useState(user && user.nome);
  const [email, setEmail] = useState(user && user.email);

  useEffect(() => {
    const storadUser = JSON.parse(localStorage.getItem("@userPro"));

    if (storadUser) {
      setUser(storadUser);
      setAvatarUrl(storadUser.avatarUrl);
      setName(storadUser.nome);
      setEmail(storadUser.email);
    }
  }, [setUser]);

  function handleFile(e) {
    console.log(e.target.files[0]);
    if (e.target.files[0]) {
      const image = e.target.files[0];

      if (image.type === "image/jpeg" || image.type === "image/png") {
        setImageAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      } else {
        toast.info('Insira uma imagem do tipo "PNG ou JPEG"');
        setImageAvatar(null);
        return;
      }
    }
  }

  async function handleUpload() {
    const reader = new FileReader();
    reader.onload = () => {
      const imageLocalStorage = reader.result;

      let data = {
        ...user,
        avatarUrl: imageLocalStorage,
      };

      setUser(data);
      storageUser(data);
      setAvatarUrl(imageLocalStorage);
      setImageAvatar(null);

      toast.success("Foto de perfil atualizada com sucesso!");
    };

    reader.readAsDataURL(imageAvatar);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (imageAvatar === null && name !== "") {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, {
        nome: name,
      })
        .then(() => {
          let data = {
            ...user,
            nome: name,
          };

          setUser(data);
          storageUser(data);

          toast.info("Nome atualizado!");
        })
        .catch((e) => toast.error("Erro ao atualizar o nome"));
    } else if (name !== "" && imageAvatar !== null) {
      handleUpload();
    }
  }

  return (
    <>
      <Header />
      <div className="content">
        <Title name="Minha conta">
          <FiSettings size={25} />
        </Title>
        <div className="container">
          <form className="form-profile" onSubmit={handleSubmit}>
            <label className="label-avatar">
              <span>
                <FiUpload color="#fff" size={25} />
              </span>
              <input type="file" accept="image/*" onChange={handleFile} />
              <br />
              {avatarUrl === null ? (
                <img
                  src={avatarImg}
                  alt="Foto do perfil"
                  width={220}
                  height={220}
                />
              ) : (
                <img
                  src={avatarUrl}
                  alt="Foto do perfil"
                  width={220}
                  height={220}
                />
              )}
            </label>

            <label>Nome</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input type="text" value={email} disabled={true} />

            <input type="submit" value="Salvar" />
          </form>
        </div>

        <div className="container">
          <button className="btn-logout" onClick={logout}>
            Sair
          </button>
        </div>
      </div>
    </>
  );
}
