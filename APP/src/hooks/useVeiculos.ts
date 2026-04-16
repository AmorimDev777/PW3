import { useEffect, useState } from "react";
import { getVeiculos } from "../services/veiculoService";
import type { Veiculo } from "../types/veiculo";

export function useVeiculos() {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getVeiculos();
        setVeiculos(data);
      } catch (err) {
        setError(`Erro ao carregar veículos: ${err instanceof Error ? err.message : "Erro desconhecido"}`);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { veiculos, loading, error };
}