/* Define shit here */
import { MediaItem } from "./mediaTypes";
// Define the Media type
export interface Media {
  id: number;
  poster_path: string;
  title?: string;
  name?: string;
}

// Update the Movie and TVShow interfaces to extend the Media interface
export interface Movie extends MediaItem {
  title: string;
}

export interface TVShow extends MediaItem {
  name: string;
}

// Define the Genre type
export interface Genre {
  id: number;
  name: string;
}

// Define the Category type
export interface Category {
  name: string;
  endpoint: string;
}

// Define the categories
export const categories: Category[] = [
  {
    name: "now_playing",
    endpoint: "/movie/now_playing",
  },
  {
    name: "top_rated",
    endpoint: "/movie/top_rated",
  },
  {
    name: "most_popular",
    endpoint: "/movie/popular",
  },
];

export const tvCategories: Category[] = [
  {
    name: "top_rated",
    endpoint: "/tv/top_rated",
  },
  {
    name: "most_popular",
    endpoint: "/tv/popular",
  },
];

export const ortherCategories: Category[] = [
  {
    name: "Genre TV ",
    endpoint: "/genre/tv/list",
  },
  {
    name: "Discover TV",
    endpoint: "/discover/tv",
  },
  {
    name: "Genre Moive",
    endpoint: "/genre/movie/list",
  },
  {
    name: "Discover Moive ",
    endpoint: "/discover/movie",
  },
];
