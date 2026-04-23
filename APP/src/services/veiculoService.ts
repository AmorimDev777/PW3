import type { Veiculo } from "../types/veiculo"
import { api } from "./api"

export async function getVeiculos(): Promise<Veiculo[]> {
  const response = await api.get("/veiculos")
  return response.data
}