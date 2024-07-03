import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Movie } from "../lib/types";
import useSession from "./useSession";
import { supabase } from "../lib/supabase";
import { searchMovies } from "../lib/util";
import { debounce } from "lodash";

const Context = createContext<null | any>(null);

export const MovieContext = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSession();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [ratedMovies, setRatedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    // TODO: Get movies from the database

    // TODO: Get rated movies from the database
    supabase
      .from("movie_ranks")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching rated movies: ", error.message);
          return;
        }
        if (data) {
          setRatedMovies(data);
        }
      });
  }, []);

  useEffect(() => {
    //TODO: Filter movies for search query
    if (searchQuery.length > 2) {
      searchMovies(searchQuery).then((r) => {
        if (r.length > 0) {
          setFilteredMovies(r);
        }
      });
    } else {
      setFilteredMovies(movies);
    }
  }, [searchQuery]);

  return (
    <Context.Provider
      value={{
        movies,
        ratedMovies,
        filteredMovies,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </Context.Provider>
  );
};

const useMovies = () =>
  useContext<{
    movies: Movie[];
    ratedMovies: Movie[];
    filteredMovies: Movie[];
    searchQuery: string;
    setSearchQuery: (query: string) => void;
  }>(Context);
export default useMovies;
