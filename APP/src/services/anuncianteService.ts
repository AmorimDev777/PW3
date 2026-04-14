import type { Anunciante } from "../types/anunciante";

const API_URL = "https://refactored-halibut-v6r4vxqw6rp5cwx44-3000.app.github.dev/anunciantes";

export async function getAnunciantes(): Promise<Anunciante[]> {
  const response = await fetch(API_URL);
  return response.json();
}