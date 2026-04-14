import type { Fabricante } from "../types/fabricante";

const API_URL = "https://refactored-halibut-v6r4vxqw6rp5cwx44-3000.app.github.dev/fabricantes";

export async function getFabricantes(): Promise<Fabricante[]> {
  const response = await fetch(API_URL);
  return response.json();
}