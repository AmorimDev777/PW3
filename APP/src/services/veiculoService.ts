import type { Veiculo } from "../types/veiculo";

const API_URL = "https://super-broccoli-7v5qvrr59v94fxggj-3000.app.github.dev/veiculos";

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await fetch(API_URL);
  return response.json();
}