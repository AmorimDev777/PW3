import type { Veiculo } from "../types/veiculo";

interface Props {
  veiculo: Veiculo;
}

export function VeiculoCard({ veiculo }: Props) {

  return (
    <div className="veiculo-card">
      <h2>{veiculo.modelo}</h2>
        <img src={veiculo.fotos[0]} alt={veiculo.modelo} style={{ width: "300px", height: "auto" }} />
      <p>{veiculo.descricao}</p>

      <p>
        Ano: {veiculo.ano} / {veiculo.ano_modelo}
      </p>

      <strong>
        {veiculo.valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </strong>
    </div>
  );
}
