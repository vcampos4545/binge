import { Movie } from "./types";
import { supabase } from "./supabase";

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiUrl = `http://127.0.0.1:5000/search?query=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Movie[];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}

export async function getMovieByTMDBID(tmdbId: string): Promise<Movie> {
  const apiUrl = `http://127.0.0.1:5000/movies?tmdb_id=${encodeURIComponent(
    tmdbId
  )}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.data as Movie;
  } catch (error) {
    console.error("Error fetching data: ", error);
    return {} as Movie;
  }
}
