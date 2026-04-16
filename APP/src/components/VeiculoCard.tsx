import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Veiculo } from "../types/veiculo";
import type { Fabricante } from "../types/fabricante";

interface Props {
  veiculo: Veiculo;
  fabricantes: Fabricante[];
  onClick: () => void;
}


export function VeiculoCard({ veiculo, fabricantes, onClick }: Props) {
  const [fotoIndex, setFotoIndex] = useState(0);
  return (
    <div onClick={onClick} 
    className="overflow-hidden flex flex-col items-center justify-start shadow-lg w-72 h-[20rem] rounded-lg text-center bg-white cursor-pointer 
    transition-all duration-200
    hover:scale-105">
      <div className="w-full bg-white relative">
          <img className="object-contain aspect-[1.6/1]" src={veiculo.fotos[fotoIndex]} alt="" />
      </div>

      <div className="m-2">
          <h2>{fabricantes.find(f => f.id == veiculo.Fabricantes_id )?.nome ?? veiculo.Fabricantes_id}</h2>
          <h2>{veiculo.modelo}</h2>
          <p>{veiculo.ano + " / " + veiculo.ano_modelo}</p>
          {/* <p>{veiculo.descricao}</p> */}
            <strong className="text-green-800">
                {veiculo.valor.toLocaleString('pt-BR', {style: "currency", currency: "BRL"})}
            </strong>
          </div>
        </div>
  );
}