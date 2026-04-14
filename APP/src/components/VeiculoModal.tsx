import type { Veiculo } from "../types/veiculo";
import type { Fabricante } from "../types/fabricante";
import type { Anunciante } from "../types/anunciante";
import { FaX } from "react-icons/fa6";

interface Props {
  veiculo: Veiculo;
  fabricantes: Fabricante[];
  anunciantes: Anunciante[];
  onClose: () => void;
}

export function VeiculoModal({ veiculo, fabricantes, anunciantes, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

      <div className="bg-white w-[700px] rounded-2xl shadow-2xl overflow-hidden relative shadow-lg border-3 border-green-700">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 cursor-pointer text-red-700 text-xl transition-all duration-300  hover:text-red-900"
        >
          <FaX/>  
        </button>

        <div className="w-full h-64 bg-white flex items-center justify-center">
          <img
            src={veiculo.fotos[0]}
            className="object-contain h-full"
          />
        </div>

        <div className="p-5">
          <h2 className="text-2xl font-bold">
            {fabricantes.find(f => f.id == veiculo.Fabricantes_id)?.nome ?? veiculo.Fabricantes_id} {veiculo.modelo}
          </h2>
          <p className="text-gray-600 mt-1">
            {veiculo.ano} / {veiculo.ano_modelo}
          </p>
          <strong className="block mt-3 text-3xl text-green-700">
            {veiculo.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <p className="mt-4 text-gray-700 text-sm leading-relaxed">
            {veiculo.descricao}
          </p>
          <div className="border-t my-4"></div>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl text-gray-500">Anunciante</p>
              <p className="mt-1 text-lg font-semibold">{anunciantes.find(a => a.id == veiculo.Anunciantes_id)?.nome ?? veiculo.Anunciantes_id}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}