import { VeiculoCard } from "../components/VeiculoCard";
import { useVeiculos } from "../hooks/useVeiculos";
import { IoMdRefresh } from "react-icons/io";   

export function VeiculosList() {
  const { veiculos, loading, error } = useVeiculos();

  if (loading) {
    return <p>Carregando veículos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col p-10 gap-5 bg-zinc-900">
      <h1 className="text-center text-4xl text-white">Lista de Veículos</h1>
      <button><IoMdRefresh/></button>
      <div className="grid justify-start items-start grid-cols-4 gap-3">
        {veiculos.map((v) => (
          <VeiculoCard key={v.id} veiculo={v} />
        ))}
      </div>
    </div>
  );
}