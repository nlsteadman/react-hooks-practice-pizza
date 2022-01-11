import React, { useState, useEffect } from "react";
import Header from "./Header";
import PizzaForm from "./PizzaForm";
import PizzaList from "./PizzaList";

function App() {
  const [pizzas, setPizzas] = useState([])
  const [selectedPizza, setSelectedPizza] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3001/pizzas")
      .then(r => r.json())
      .then(setPizzas)
  }, []);

  function handleChange(name, value) {
    setSelectedPizza({ ...selectedPizza, [name]: value});
  }

  function handleEdit(editedPizza) {
    const editedPizzas = pizzas.map(pizza => 
      pizza.id === editedPizza.id ? editedPizza : pizza)
    setSelectedPizza(editedPizza)
    setPizzas(editedPizzas)
  }

  return (
    <>
      <Header />
      <PizzaForm 
        pizza={selectedPizza}
        onChange={handleChange}
        onEdit={handleEdit}
      />
      <PizzaList pizzas={pizzas} onSelectPizza={setSelectedPizza} />
    </>
  );
}

export default App;
