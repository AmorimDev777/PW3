import type { Fabricante } from "../types/fabricante";

const API_URL = "https://super-broccoli-7v5qvrr59v94fxggj-3000.app.github.dev/fabricantes";

export async function getFabricantes(): Promise<Fabricante[]> {
  const response = await fetch(API_URL);
  return response.json();
}