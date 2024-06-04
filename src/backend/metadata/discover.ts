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
      with_genres: withGenre,
      language: currentLanguage,
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
