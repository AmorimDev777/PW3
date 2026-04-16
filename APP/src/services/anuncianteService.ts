import type { Anunciante } from "../types/anunciante";

const API_URL = "https://glorious-sniffle-wr567wgxrvg72gw5q-3000.app.github.dev/anunciantes";

export async function getAnunciantes(): Promise<Anunciante[]> {
  const response = await fetch(API_URL);
  return response.json();
}