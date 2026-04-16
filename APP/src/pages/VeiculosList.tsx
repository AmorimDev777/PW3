import { VeiculoCard } from "../components/VeiculoCard";
import { useVeiculos } from "../hooks/useVeiculos";

export function VeiculosList() {
  const { veiculos, loading, error } = useVeiculos();

  if (loading) {
    return <p>Carregando veículos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Veículos</h1>

      {veiculos.map((v) => (
        <VeiculoCard key={v.id} veiculo={v} />
      ))}
    </div>
  );
}