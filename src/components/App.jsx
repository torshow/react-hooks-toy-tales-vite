import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);

  //fetch all toys once when te app first loads
  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((response) => response.json())
    .then((toysFromServer) => setToys(toysFromServer));
  }, []);

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  //add a toy into state
  function addToy(newToy) {
    setToys((currentToys) => [...currentToys, newToy])
  }

  //remove a toy from the server then from state
  function deleteToy(id) {
    fetch(`htt:p//localhost:3001/toys/${id}`, {
      method:"DELETE",
    }).then(() => {
      setToys((currentToys) => currentToys.filter((toy) => toy.id !== id));
    });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={deleteToy} />
    </>
  );
}

export default App;
