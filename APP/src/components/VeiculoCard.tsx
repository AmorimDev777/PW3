import type { Veiculo } from "../types/veiculo";

interface Props {
  veiculo: Veiculo;
}

export function VeiculoCard({ veiculo }: Props) {

  return (
    <div className="veiculoCard text-center shadow-md shadow-black/30">
      <h2 className="text-[clamp(30px,2vw,90px)]">{veiculo.modelo}</h2>
      <img src={veiculo.fotos[0]} alt={veiculo.modelo} className="border-[2px] border-black"/>
      <p className="text-[clamp(20px,1vw,70px)]">{veiculo.descricao}</p>

      <p className="text-[clamp(30px,1vw,90px)]">Ano: {veiculo.ano} / {veiculo.ano_modelo}</p>

      <p className="text-[clamp(10px,1vw,90px)]">
        {veiculo.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
    </div>
  );
}
