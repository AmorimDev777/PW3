import { useEffect, useState } from "react";
import { getVeiculos } from "../services/veiculoService";
import type { Veiculo } from "../types/veiculo";
import { VeiculoCard } from "../components/VeiculoCard";


export function VeiculosList() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);

  useEffect(() => {
    getVeiculos().then(setVeiculos);
  }, []);
  return (
    <div className="flex flex-col gap-4 p-7 w-screen">
      <h1 className="text-center text-4xl">Lista de Veiculos</h1>

      <div className="veiculosList grid-cols-[repeat(1,1fr)] md:grid-cols-[repeat(2,1fr)] xl:grid-cols-[repeat(3,1fr)] 2xl:grid-cols-[repeat(4,1fr)]">
      {veiculos.map((veiculo) => (
        <VeiculoCard key={veiculo.id} veiculo={veiculo} />
      ))}
      </div>
    </div>
  );

}
//   return (
//     <div className="flex flex-col gap-5 w-[calc(100vw-3vw)]">
//         <h1 className="text-[2.6vw] text-blue-600 mt-4">Lista de Veículos</h1>

//         <div className="grid grid-cols-2 gap-[1vw] min-w-full sm:grid-cols-3 lg:grid-cols-4">
//             {veiculos.map((veiculo) => (
//               <div key={veiculo.id} className="flex flex-col justify-between gap-1 bg-white rounded-[2vw] p-[1.7vw] hover:opacity-[.9] transition-all">
//               <h2 className="text-black text-[2.9vw] sm:text-[2vw] lg:text-[1.7vw]">{veiculo.modelo}</h2>
//               <p className="text-zinc-800 text-[2.3vw] sm:text-[1.5vw] lg:text-[1vw]">{veiculo.descricao}</p>
//               <p className="text-zinc-600 text-[2.5vw] sm:text-[1.8vw] lg:text-[1.3vw]">{veiculo.valor.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
//                 </div>
//             ))}
//         </div>
//     </div>
//   );
// }