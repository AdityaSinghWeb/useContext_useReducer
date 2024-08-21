import logoImg from "./assets/logo.png";
import ConfirmDelete from "./components/ConfirmDelete";
import Places from "./components/Places";
import { AVAILABLE_PLACES } from "./imageData";
import Modal from "./components/Modal";
import { useRef, useState } from "react";

function App() {
  const [pickedPlaces, setPickedPlaces] = useState([]);
  const modal = useRef();
  const selectedPlace = useRef();

  function handleOpenModal(id) {
    modal.current.open();
    selectedPlace.current = id;
  }

  function handleCloseModal() {
    modal.current.close();
  }

  function handleDelete() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    modal.current.close();
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      let place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });
  }

  return (
    <>
      <Modal ref={modal}>
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
          place={AVAILABLE_PLACES}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
