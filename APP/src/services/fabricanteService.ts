import type { Fabricante } from "../types/fabricante";

const API_URL = "https://glorious-sniffle-wr567wgxrvg72gw5q-3000.app.github.dev/fabricantes";

export async function getFabricantes(): Promise<Fabricante[]> {
  const response = await fetch(API_URL);
  return response.json();
}