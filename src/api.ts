export interface Image {
  id: number;
  name: string;
  status: string;
  url: string;
  processedUrl: string | null;
}

const VITE_API_URL = import.meta.env.VITE_API_URL;

export function fetchImages(): Promise<{ data: Image[] }> {
  return fetch(`${VITE_API_URL}/images`)
    .then((e) => e.json())
    .then((response) => response);
}
