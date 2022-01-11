import React from "react";

function PizzaForm({ pizza, onChange, onEdit }) {
  function handleChange(e) {
    onChange(e.target.name, e.target.value)
  }

  function handleFilter(e) {
    onChange(e.target.name, e.target.value === "Vegetarian")
  }

  function handleSubmit(e) {
    e.preventDefault()
    fetch(`http://localhost:3001/pizzas/${pizza.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pizza),
    })
    .then(r => r.json())
    .then(onEdit)
  }

  if (!pizza) return null;

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="col-5">
          <input
            className="form-control"
            type="text"
            name="topping"
            placeholder="Pizza Topping"
            value={pizza.topping}
            onChange={handleChange}
          />
        </div>
        <div className="col">
          <select 
            className="form-control" 
            name="size"
            value={pizza.size}
            onChange={handleChange}
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
        </div>
        <div className="col">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Vegetarian"
              checked={pizza.vegetarian}
              onChange={handleFilter}
            />
            <label className="form-check-label">Vegetarian</label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="vegetarian"
              value="Not Vegetarian"
              checked={!pizza.vegetarian}
              onChange={handleFilter}
            />
            <label className="form-check-label">Not Vegetarian</label>
          </div>
        </div>
        <div className="col">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default PizzaForm;
