import type { Fabricante } from "../types/fabricante";

const API_URL = "http://localhost:3000/fabricantes";

export async function getFabricantes(): Promise<Fabricante[]> {
  const response = await fetch(API_URL);
  return response.json();
}