import { initializeApp } from "firebase/app";
import "firebase/firestore";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  deleteDoc,
  doc,
  where,
  getDoc,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDb6_cvgO0yiNr7LznDjjz3MoD71sIX870",
  authDomain: "sbsticket.firebaseapp.com",
  projectId: "sbsticket",
  storageBucket: "sbsticket.appspot.com",
  messagingSenderId: "598909285517",
  appId: "1:598909285517:web:1cd90c64d6b178c5c59ec4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const handleStoreGuest = async ({
  name,
  lastName,
  dni,
  email,
  tickets,
  date,
  twone,
  ticketValue,
  ticketType,
}) => {
  const clientsCollection = collection(db, "guests");

  const clientData = {
    name,
    lastName,
    dni,
    email,
    tickets,
    date,
    twone,
    ticketValue,
    ticketType,
  };

  try {
    const docRef = await addDoc(clientsCollection, clientData);
    console.log("Cliente almacenado con ID: ", docRef.id);
  } catch (error) {
    console.error("Error al almacenar el cliente: ", error);
  }
};

export async function getGuests() {
  const guestsRef = collection(db, "guests");
  let q;
  q = query(guestsRef);
  const snapshot = await getDocs(q);
  const guests = snapshot.docs.map((item) => ({
    ...item.data(),
    id: item.id,
  }));
  return guests;
}

export async function getGuestsData() {
  const guestsRef = collection(db, "guests");
  const guestsSnapshot = await getDocs(guestsRef);

  let soldPresale = 0;
  let soldGeneral = 0;
  let sold2x1 = 0;

  guestsSnapshot.forEach((guestDoc) => {
    const guest = guestDoc.data();
    const ticketsNumber = parseInt(guest.tickets);

    if (!isNaN(ticketsNumber)) {
      const ticketType = guest.ticketType;

      if (ticketType === "presale") {
        soldPresale += ticketsNumber;
      } else if (ticketType === "general") {
        soldGeneral += ticketsNumber;
      }

      if (guest.twone === true && ticketType !== "presale") {
        sold2x1 += ticketsNumber;
      }
    }
  });

  let totalSold = soldPresale + soldGeneral + sold2x1;

  return {
    soldPresale,
    soldGeneral,
    sold2x1,
    totalSold,
  };
}

export const deleteGuest = async (guestId) => {
  await deleteDoc(doc(db, "guests", guestId));
};

export async function deleteAllGuests() {
  const guestsRef = collection(db, "guests");
  try {
    const querySnapshot = await getDocs(guestsRef);
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log("Todos los documentos de la colección 'guests' eliminados");
  } catch (error) {
    console.error(
      "Error al eliminar los documentos de la colección 'guests': ",
      error
    );
    throw error;
  }
}

export async function getAdmins(username, password) {
  const adminsRef = collection(db, "admins");
  const q = query(
    adminsRef,
    where("user", "==", username),
    where("pass", "==", password)
  );
  const snapshot = await getDocs(q);

  if (snapshot.docs.length === 1) {
    const admin = snapshot.docs[0].data();
    return { id: snapshot.docs[0].id, ...admin };
  } else {
    return null;
  }
}

export async function getAdminsData() {
  const adminsRef = collection(db, "admins");
  const q = query(adminsRef);
  const adminsSnapshot = await getDocs(q);

  const adminsData = adminsSnapshot.docs.map((adminDoc) => {
    const adminData = adminDoc.data();
    const adminId = adminDoc.id;
    return { id: adminId, ...adminData };
  });

  return adminsData;
}

export async function createAdmin(newAdminData) {
  const adminsCollection = collection(db, "admins");

  try {
    await addDoc(adminsCollection, newAdminData);
    console.log("¡Nuevo administrador agregado con éxito!");
  } catch (error) {
    console.error("Error al agregar un nuevo administrador: ", error);
    throw error;
  }
}

export const editAnAdmin = async (adminId, updatedAdminData) => {
  const adminRef = doc(db, "admins", adminId);

  try {
    await setDoc(adminRef, updatedAdminData, { merge: true });
    console.log("¡Administrador editado con éxito!");
  } catch (error) {
    console.error("Error al editar el administrador:", error);
    throw error;
  }
};

export async function deleteAdmin(adminId) {
  const adminDocRef = doc(db, "admins", adminId);

  try {
    await deleteDoc(adminDocRef);
    console.log("¡Administrador eliminado con éxito!");
  } catch (error) {
    console.error("Error al eliminar el administrador: ", error);
    throw error;
  }
}

export async function createEvent(
  date,
  location,
  link,
  inversion,
  presale,
  presaleDate,
  general,
  generalDate
) {
  try {
    const eventsRef = collection(db, "events");
    const mainEventRef = doc(eventsRef, "main-event");

    const newEvent = {
      date: date,
      location: location,
      link: link,
      inversion: inversion,
      presale: presale,
      presaleDate: presaleDate,
      general: general,
      genetalDate: generalDate,
    };

    await setDoc(mainEventRef, newEvent);

    console.log("Evento creado con ID 'main-event'");
  } catch (error) {
    console.error("Error al crear el evento: ", error);
    throw error;
  }
}

export async function getEvent() {
  try {
    const eventRef = doc(db, "events", "main-event");

    const eventSnapshot = await getDoc(eventRef);

    if (eventSnapshot.exists()) {
      const eventData = eventSnapshot.data();
      return eventData;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el evento: ", error);
    throw error;
  }
}

export async function deleteEvent() {
  try {
    const eventRef = doc(db, "events", "main-event");

    await deleteDoc(eventRef);

    console.log("Evento 'main-event' eliminado");
  } catch (error) {
    console.error("Error al eliminar el evento: ", error);
    throw error;
  }
}

export async function editEvent(eventId, updatedProperties) {
  try {
    const eventRef = doc(db, "events", eventId);

    await setDoc(eventRef, updatedProperties, { merge: true });

    console.log("Propiedades del evento actualizadas correctamente");
  } catch (error) {
    console.error("Error al actualizar las propiedades del evento: ", error);
    throw error;
  }
}
