import type { Veiculo } from "../types/veiculo";

const API_URL = "https://glorious-sniffle-wr567wgxrvg72gw5q-3000.app.github.dev/veiculos";

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await fetch(API_URL);
  return response.json();
}