import React, { useEffect, useState } from "react";
import {
  AiOutlinePlusCircle,
  AiOutlineEdit,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import {
  createAdmin,
  deleteAdmin,
  getAdminsData,
  editAnAdmin,
} from "../../../../../database/firebase";
import { Button, Input } from "../../../../shared";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [editAdmin, setEditAdmin] = useState(false);
  const [editedAdminData, setEditedAdminData] = useState("");
  const [newAdminDialog, setNewAdminDialog] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    name: "",
    user: "",
    pass: "",
  });

  useEffect(() => {
    getAdminsData().then((adminsData) => {
      setAdmins(adminsData);
    });
  }, []);

  const handleOpenEdit = (adminId) => {
    const adminToEdit = admins.find((admin) => admin.id === adminId);
    setSelectedAdmin(adminToEdit);
    setEditAdmin(true);
  };

  const handleCloseEdit = () => {
    setSelectedAdmin(null);
    setEditAdmin(false);
  };

  const handleNameChange = (e) => {
    setEditedAdminData({
      ...editedAdminData,
      name: e.target.value,
    });
  };

  const handleUsernameChange = (e) => {
    setEditedAdminData({
      ...editedAdminData,
      user: e.target.value,
    });
  };

  const handleSaveAdmin = async () => {
    try {
      const adminId = selectedAdmin?.id;
      const isNameProvided =
        editedAdminData.name !== undefined && editedAdminData.name !== "";
      const isUserProvided =
        editedAdminData.user !== undefined && editedAdminData.user !== "";

      if (isNameProvided || isUserProvided) {
        const updatedAdminData = {
          name: isNameProvided ? editedAdminData.name : selectedAdmin.name,
          user: isUserProvided ? editedAdminData.user : selectedAdmin.user,
        };

        await editAnAdmin(adminId, updatedAdminData);

        setEditAdmin(false);
        setSelectedAdmin(null);
      } else {
        console.error("Error: Debes completar al menos un campo");
      }
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  const handleDeleteAdmin = async (adminId) => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de que quieres eliminar este usuario?"
    );

    if (confirmDelete) {
      try {
        await deleteAdmin(adminId);
        getAdminsData().then((adminsData) => {
          setAdmins(adminsData);
        });
        setEditAdmin(false);
        setSelectedAdmin(null);
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminData.name || !newAdminData.user || !newAdminData.pass) {
      alert("Todos los campos son requeridos");
      return;
    }
    try {
      await createAdmin(newAdminData);
      const adminsData = await getAdminsData();
      setAdmins(adminsData);
      setNewAdminData({ name: "", user: "", pass: "" });
      setNewAdminDialog(false);
    } catch (error) {
      console.error("Error al crear el nuevo administrador:", error);
    }
  };

  return (
    <section className="bg-neutral-900/30 backdrop-blur-xl rounded-lg w-96 h-96">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-bold text-white text-center">
          Administradores
        </h2>
        <ul className="flex flex-col gap-2 my-4 text-white text-lg">
          {admins.map((admin) => (
            <li
              className="grid grid-cols-2 items-center gap-8 truncate"
              key={admin.id}
            >
              {admin.name}
              <span className="flex justify-end">
                <AiOutlineEdit
                  className="text-gray-400 cursor-pointer"
                  onClick={() => handleOpenEdit(admin.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div
        onClick={() => {
          setNewAdminDialog(true);
        }}
        className="group fixed bottom-0 w-full flex justify-center bg-neutral-500 hover:bg-neutral-900 duration-150 py-2 rounded-br-lg rounded-bl-lg cursor-pointer"
      >
        <button className="flex flex-col items-center font-bold text-gray-300 group-hover:text-red-500 duration-150">
          Añadir nuevo <AiOutlinePlusCircle className="text-2xl " />
        </button>
      </div>
      <dialog
        open={editAdmin === true}
        className="absolute top-3 z-50 rounded-lg pb-4 pt-4 bg-neutral-900 text-white drop-shadow-2xl"
      >
        <div className="flex justify-between gap-2 items-center mb-4 px-4">
          <h2 className="text-xl font-semibold">Editar usuario:</h2>
          <AiOutlineCloseCircle
            className="text-2xl cursor-pointer"
            onClick={handleCloseEdit}
          />
        </div>
        <div className="flex flex-col gap-4 px-8 mt-8">
          <Input
            label="Nombre:"
            placeholder={selectedAdmin?.name}
            value={editedAdminData.name}
            onChange={handleNameChange}
          />
          <Input
            label="Usuario:"
            placeholder={selectedAdmin?.user}
            value={editedAdminData.user}
            onChange={handleUsernameChange}
          />
          <div className="flex gap-4 flex-row-reverse justify-center">
            <Button
              name="Eliminar"
              customStyle={"bg-transparent"}
              onClick={() => handleDeleteAdmin(selectedAdmin.id)}
            />
            <Button name="Guardar" onClick={handleSaveAdmin} />
          </div>
        </div>
      </dialog>
      <dialog
        open={newAdminDialog === true}
        className="absolute top-0 z-50 rounded-lg pb-4 pt-4 bg-neutral-900 text-white drop-shadow-2xl"
      >
        <div className="flex justify-between items-center mb-4 px-4">
          <h2 className="text-xl font-semibold">Crear usuario</h2>
          <AiOutlineCloseCircle
            className="text-2xl cursor-pointer"
            onClick={() => setNewAdminDialog(false)}
          />
        </div>
        <div className="flex flex-col gap-1 px-8">
          <Input
            label="Nombre:"
            value={newAdminData.name}
            onChange={(e) =>
              setNewAdminData({ ...newAdminData, name: e.target.value })
            }
          />
          <Input
            label="Usuario:"
            value={newAdminData.user}
            onChange={(e) =>
              setNewAdminData({ ...newAdminData, user: e.target.value })
            }
          />
          <Input
            label="Constraseña:"
            value={newAdminData.pass}
            onChange={(e) =>
              setNewAdminData({ ...newAdminData, pass: e.target.value })
            }
          />
          <div className="flex gap-4 flex-row-reverse justify-center">
            <Button
              name="Cancelar"
              customStyle={"bg-transparent"}
              onClick={() => setNewAdminDialog(false)}
            />
            <Button name="Guardar" onClick={handleCreateAdmin} />
          </div>
        </div>
      </dialog>
    </section>
  );
}

export default Admins;
