import { conf } from "@/setup/config";
import { Category } from "@/utils/discover";

import { formatTMDBDiscoverResult, get } from "./tmdb";
import { TMDBContentTypes, TMDBSearchResult } from "./types/tmdb";

export const fetchForCategory = async (
  category: Category,
  setState: React.Dispatch<React.SetStateAction<any>>,
  currentLanguage: string,
  mediatype?: TMDBContentTypes,
  withGenre?: string,
) => {
  try {
    const data = await get<TMDBSearchResult>(category.endpoint, {
      api_key: conf().TMDB_READ_API_KEY,
      language: currentLanguage,
      with_genres: withGenre,
    });

    const dataFormat = data.results.map((r: any) =>
      formatTMDBDiscoverResult(r, mediatype),
    );

    for (let i = dataFormat.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [dataFormat[i], dataFormat[j]] = [dataFormat[j], dataFormat[i]];
    }

    setState((prevCategoryMovies: any) => ({
      ...prevCategoryMovies,
      [category.name]: dataFormat,
    }));
  } catch (error) {
    console.error(
      `Error fetching movies for category ${category.name}:`,
      error,
    );
  }
};

export const fetchForGenres = async (
  category: Category,
  setState: React.Dispatch<React.SetStateAction<any>>,
  currentLanguage: string,
  quantity: number,
) => {
  try {
    const data = await get<any>(category.endpoint, {
      api_key: conf().TMDB_READ_API_KEY,
      language: currentLanguage,
    });

    // Shuffle the array of genres
    for (let i = data.genres.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [data.genres[i], data.genres[j]] = [data.genres[j], data.genres[i]];
    }

    // Fetch only the first 6 TV show genres
    setState(data.genres.slice(0, quantity));
  } catch (error) {
    console.error("Error fetching TV show genres:", error);
  }
};

export const fetchForCategoryGenres = async (
  category: Category,
  setState: React.Dispatch<React.SetStateAction<any>>,
  currentLanguage: string,
  mediatype?: TMDBContentTypes,
  withGenre?: string | any,
) => {
  try {
    const data = await get<TMDBSearchResult>(category.endpoint, {
      api_key: conf().TMDB_READ_API_KEY,
      language: currentLanguage,
      with_genres: withGenre,
    });

    const dataFormat = data.results.map((r: any) =>
      formatTMDBDiscoverResult(r, mediatype),
    );

    setState((prevCategoryMovies: any) => ({
      ...prevCategoryMovies,
      [withGenre]: dataFormat,
    }));
  } catch (error) {
    console.error(
      `Error fetching movies for category ${category.name}:`,
      error,
    );
  }
};
