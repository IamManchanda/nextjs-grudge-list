import { useContext } from "react";
import GrudgeItem from "./grudge-item";
import { GrudgeContext } from "../store/grudge";

function GrudgeList() {
  const { grudges } = useContext(GrudgeContext);

  return (
    <section className="grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map((grudge) => (
        <GrudgeItem key={grudge.id} grudge={grudge} />
      ))}
    </section>
  );
}

export default GrudgeList;
