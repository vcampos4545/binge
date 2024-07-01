import { createContext, useContext, useEffect, useState } from "react";
import { Movie } from "../lib/types";
import useSession from "./useSession";
import { supabase } from "../lib/supabase";

const Context = createContext<null | any>(null);

export const MovieContext = ({ children }: { children: React.ReactNode }) => {
  const { user, session } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // TODO: Get movies from the database

    // TODO: Get rated movies from the database
    supabase
      .from("rated_movies")
      .select("*")
      .eq("user_id", user?.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching rated movies: ", error.message);
          return;
        }
        setRatedMovies(data);
      });
  }, []);

  useEffect(() => {
    //TODO: Filter movies for search query
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{ movies, filteredMovies, searchQuery, setSearchQuery }}
    >
      {children}
    </Context.Provider>
  );
};

const useMovies = () =>
  useContext<{
    movies: Movie[];
    filteredMovies: Movie[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }>(Context);
export default useMovies;
