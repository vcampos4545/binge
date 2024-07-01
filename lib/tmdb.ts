const searchMovies = async (query: string) => {
  const apiUrl = `http://127.0.0.1:8000/rated/tmdb/search_movies?query=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(apiUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

const getMovieList = async (username: string) => {
  const apiUrl = `http://127.0.0.1:8000/binge/movierank/user/${encodeURIComponent(
    username
  )}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};
