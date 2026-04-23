import type { Anunciante } from "../types/anunciante";

const API_URL = "http://localhost:3000/anunciantes";

export async function getAnunciantes(): Promise<Anunciante[]> {
  const response = await fetch(API_URL);
  return response.json();
}