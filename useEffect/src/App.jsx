import logoImg from "./assets/logo.png";
import ConfirmDelete from "./components/ConfirmDelete";
import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./imageData";
import Modal from "./components/Modal";
import { useRef, useState, useEffect, useCallback } from "react";
import { sortPlacesByDistance } from "./loc";

const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);

function App() {
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const selectedPlace = useRef();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      let sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );
      setAvailablePlaces(sortedPlaces);
    });
  }, []);

  function handleOpenModal(id) {
    setModalOpen(true);
    selectedPlace.current = id;
  }

  function handleCloseModal() {
    setModalOpen(false);
  }

  const handleDelete = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((id) => id !== selectedPlace.current))
    );
  }, []);

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      let place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  return (
    <>
      <Modal isOpen={modalOpen} close={handleCloseModal}>
        <ConfirmDelete onClose={handleCloseModal} onConfirm={handleDelete} />
      </Modal>
      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          place={pickedPlaces}
          fallbackText={"Select the places you would like to visit below."}
          onSelectPlace={handleOpenModal}
        />
        <Places
          title="Available Places"
          place={availablePlaces}
          fallbackText="Sorting places by distance..."
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
