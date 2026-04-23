import type { Veiculo } from "../types/veiculo";

interface Props {
  veiculo: Veiculo;
}

export function VeiculoCard({ veiculo }: Props) {

  return (
    <div className="p-10 bg-white text-center shadow-md shadow-black/30">
      <h2 className="text-xl">{veiculo.modelo}</h2>
      <img src={veiculo.fotos[0]} alt={veiculo.modelo} className="object-contain aspect-[2/1]"/>
      <p className="text-xl">{veiculo.descricao}</p>

      <p className="text-xl">Ano: {veiculo.ano} / {veiculo.ano_modelo}</p>

      <p className="text-lg">
        {veiculo.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}
