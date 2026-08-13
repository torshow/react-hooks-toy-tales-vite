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
  
  //increase a toy's like on the server then update state in place
  function updateToysLikes(id) {
    const toyToUpdate = toys.find((toy) => toy.id === id);

    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ likes: toyToUpdate.likes + 1 }),
    })
      .then((res) => res.json())
      .then((updatedToy) => {
        setToys((currentToys) =>
          currentToys.map((toy) => (toy.id === id ? updatedToy : toy))
        );
      });
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm addToy={addToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={deleteToy} onUpdateLikes={updateToysLikes}/>
    </>
  );
}

export default App;
