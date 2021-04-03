import { useState, useContext } from "react";
import { GrudgeContext } from "../contexts/grudge";

function NewGrudge() {
  const [person, setPerson] = useState("");
  const [reason, setReason] = useState("");

  const { addGrudge } = useContext(GrudgeContext);

  function handleChange(event) {
    event.preventDefault();
    addGrudge({ person, reason });
    setPerson("");
    setReason("");
  }

  return (
    <>
      <h2>Add a Grudge</h2>
      <form className="new-grudge" onSubmit={handleChange}>
        <input
          className="new-grudge-input"
          placeholder="Person"
          type="text"
          value={person}
          onChange={(event) => setPerson(event.target.value)}
        />
        <input
          className="new-grudge-input"
          placeholder="Reason"
          type="text"
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />
        <input className="new-grudge-submit button" type="submit" />
      </form>
    </>
  );
}

export default NewGrudge;
