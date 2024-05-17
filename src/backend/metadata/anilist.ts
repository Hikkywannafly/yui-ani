import axios from "axios";

const GRAPHQL_URL = "https://graphql.anilist.co";
const query = `
query ($id: Int) {
  Media (id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
  }
}
`;

export const anilistFetcher = async <T>(querys: string, variables: any) => {
  type Response = {
    data: T;
  };

  const { data } = await axios.post<Response>(GRAPHQL_URL, {
    query,
    variables,
  });

  return data?.data;
};

interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string;
    native: string;
  };
}

export const getMediaAnimeFromAnilist = async (
  anilistIds: any[],
): Promise<Anime[]> => {
  const promises = anilistIds.map((id) => anilistFetcher<Anime>(query, { id }));

  const results = await Promise.all(promises);

  return results.filter(
    (result): result is Anime => result !== undefined && result !== null,
  );
};
