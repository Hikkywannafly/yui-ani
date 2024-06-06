import { conf } from "@/setup/config";
import { Category } from "@/utils/discover";

import {
  formatTMDBDiscoverResult,
  formatTMDBDiscoverResultArray,
  get,
} from "./tmdb";
import { TMDBContentTypes, TMDBSearchResult } from "./types/tmdb";

export const fetchForCategory = async (
  category: Category,
  setState: React.Dispatch<React.SetStateAction<any>>,
  currentLanguage: string,
  mediatype?: TMDBContentTypes,
  withGenre?: string,
  arrayMode?: boolean,
) => {
  try {
    const data = await get<TMDBSearchResult>(category.endpoint, {
      api_key: conf().TMDB_READ_API_KEY,
      language: currentLanguage,
      with_genres: withGenre,
    });
    let dataFormat: any;
    if (arrayMode) {
      dataFormat = data.results.map((r: any) =>
        formatTMDBDiscoverResultArray(r, mediatype),
      );
      console.log(arrayMode);
    } else {
      dataFormat = data.results.map((r: any) =>
        formatTMDBDiscoverResult(r, mediatype),
      );
    }

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
    setState(data.genres.slice(0, 6));
  } catch (error) {
    console.error("Error fetching TV show genres:", error);
  }
};
