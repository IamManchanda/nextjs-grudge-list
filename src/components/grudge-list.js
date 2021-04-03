import GrudgeItem from "./grudge-item";

function GrudgeList({ grudges = [], onForgive }) {
  return (
    <section className="Grudges">
      <h2>Grudges ({grudges.length})</h2>
      {grudges.map((grudge) => (
        <GrudgeItem key={grudge.id} grudge={grudge} onForgive={onForgive} />
      ))}
    </section>
  );
}

export default GrudgeList;
