import React, { useEffect, useState } from "react";
import { Button, Input } from "../../shared";
import { getAdmins } from "../../../database/firebase";

function Login({ onLoginSuccess }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const rememberMeValue = localStorage.getItem("rememberMe");
    if (rememberMeValue === "true") {
      setRememberMe(true);
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(savedUser);
      }
    }
  }, []);

  const handleCheckUser = async () => {
    try {
      console.log("Usuario:", user);
      console.log("Contraseña:", pass);
      const admin = await getAdmins(user, pass);
      if (admin) {
        if (rememberMe) {
          localStorage.setItem("user", user);
        } else {
          localStorage.removeItem("user");
        }
        onLoginSuccess(admin);
      } else {
        setError("Credenciales incorrectas. Por favor, intenta nuevamente.");
      }
    } catch (error) {
      setError("Error al iniciar sesión. Por favor, intenta nuevamente.");
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
    localStorage.setItem("rememberMe", !rememberMe);
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="flex flex-col gap-8 justify-center items-center text-white">
        <img
          className="w-1/2 lg:w-1/3"
          src="https://i.ibb.co/x14BwGV/SBS808-LOGOcomp-RED.png"
          alt="logo-completo"
        />
        <h1 className="text-2xl font-bold">Login</h1>
        <Input
          label={"Usuario"}
          labelFor={"user"}
          name={"user"}
          type={"text"}
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <Input
          label={"Contraseña"}
          labelFor={"pass"}
          name={"pass"}
          type={"password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <Button name={"Iniciar Sesión"} onClick={handleCheckUser} />
        <div className="flex flex-row-reverse gap-2 items-center">
          <label htmlFor={"remember"}>Mantener sesión abierta</label>
          <input
            type={"checkbox"}
            name={"remember"}
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
