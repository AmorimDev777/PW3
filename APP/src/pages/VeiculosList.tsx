import { useEffect, useState } from "react";
import { getVeiculos } from "../services/veiculoService";
import { getFabricantes } from "../services/fabricanteService";
import type { Veiculo } from "../types/veiculo";
import type { Fabricante } from "../types/fabricante";
import { VeiculoCard } from "../components/VeiculoCard";
import { ListaVazia } from "../components/ListaVazia";
import { VeiculoModal } from "../components/VeiculoModal";
import { getAnunciantes } from "../services/anuncianteService";
import type { Anunciante } from "../types/anunciante";

export function VeiculosList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [fabricantes, setFabricantes] = useState<Fabricante[]>([]);
  const [anunciantes, setAnunciantes] = useState<Anunciante[]>([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState<Veiculo | null>(null);

  useEffect(() => {
    getVeiculos().then(setVeiculos);
    getFabricantes().then(setFabricantes);
    getAnunciantes().then(setAnunciantes);
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="font-bold text-4xl m-7">Lista de Veículos</h1>

      <div className="grid grid-cols-4 gap-4">
        {veiculos.length > 0 ? (
          veiculos.map((v) => (
            <VeiculoCard
              key={v.id}
              veiculo={v}
              fabricantes={fabricantes}
              onClick={() => setVeiculoSelecionado(v)} 
            />
          ))
        ) : (
          <ListaVazia />
        )}

      </div>
      {veiculoSelecionado && (
        <VeiculoModal
          veiculo={veiculoSelecionado}
          fabricantes={fabricantes}
          anunciantes={anunciantes}
          onClose={() => setVeiculoSelecionado(null)}
        />
      )}
    </div>
  );
}