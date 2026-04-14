import type { Anunciante } from "../types/anunciante";

const API_URL = "https://super-broccoli-7v5qvrr59v94fxggj-3000.app.github.dev/anunciantes";

export async function getAnunciantes(): Promise<Anunciante[]> {
  const response = await fetch(API_URL);
  return response.json();
}