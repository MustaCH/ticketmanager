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
}) => {
  const clientsCollection = collection(db, "guests");

  const clientData = {
    name,
    lastName,
    dni,
    email,
    tickets,
    date,
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

export const deleteGuest = async (guestId) => {
  await deleteDoc(doc(db, "guests", guestId));
};

export async function deleteAllGuests() {
  const guestsRef = collection(db, "guests");

  try {
    // Obtén todos los documentos de la colección "guests".
    const querySnapshot = await getDocs(guestsRef);

    // Itera a través de los documentos y elimínalos uno por uno.
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

export async function createEvent(date, location) {
  try {
    const eventsRef = collection(db, "events");
    const mainEventRef = doc(eventsRef, "main-event");

    const newEvent = {
      date: date,
      location: location,
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
    const eventRef = doc(db, "events", "main-event"); // Asegúrate de usar el mismo ID que usaste al crear el evento.

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
