import { useContext } from "react";
import { GrudgeContext } from "../store/grudge";

function GrudgeItem({ grudge }) {
  const { toggleForgiveness } = useContext(GrudgeContext);
  const forgive = () => toggleForgiveness(grudge.id);
  return (
    <article className="grudge">
      <h3>{grudge.person}</h3>
      <p>{grudge.reason}</p>
      <div className="grudge-controls">
        <label className="grudge-forgiven">
          <input type="checkbox" checked={grudge.forgiven} onChange={forgive} />{" "}
          Forgiven
        </label>
      </div>
    </article>
  );
}

export default GrudgeItem;
