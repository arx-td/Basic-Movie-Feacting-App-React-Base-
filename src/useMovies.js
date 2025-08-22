import { useState, useEffect } from "react";
const KEY = "7f44b81c";

export function useMovies(query, callBack) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoding(true);
          setError("");
          const res = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&s=${encodeURIComponent(
              query
            )}`,
            { signal: controller.signal }
          );

          if (!res.ok) throw new Error("Somthing went wrong with the movies");

          const data = await res.json();
          if (data.Response === "False")
            throw new Error(" Movies are not Found");
          setMovies(data.Search);
        } catch (err) {
          console.log(err);

          if (err.name !== "AbortError") {
            setError(err.message);
          }
        } finally {
          setIsLoding(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }
      fetchMovies();

      return function () {
        controller.abort();
      };
    },
    [query]
  );
  return { isLoding, movies, error };
}
