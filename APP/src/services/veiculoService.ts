import type { Veiculo } from "../types/veiculo";

const API_URL = "https://refactored-halibut-v6r4vxqw6rp5cwx44-3000.app.github.dev/veiculos";

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await fetch(API_URL);
  return response.json();
}