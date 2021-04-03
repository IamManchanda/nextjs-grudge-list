import { useState, memo } from "react";

const NewGrudge = memo(({ onSubmit }) => {
  const [person, setPerson] = useState("");
  const [reason, setReason] = useState("");

  function handleChange(event) {
    event.preventDefault();
    onSubmit({ person, reason });
    setPerson("");
    setReason("");
  }

  return (
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
  );
});

export default NewGrudge;
