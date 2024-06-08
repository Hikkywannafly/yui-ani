import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import {
  fetchForCategory,
  fetchForCategoryGenres,
  fetchForGenres,
} from "@/backend/metadata/discover";
import { get } from "@/backend/metadata/tmdb";
import { TMDBContentTypes } from "@/backend/metadata/types/tmdb";
import { WideContainer } from "@/components/layout/WideContainer";
import { WatchedMediaCard } from "@/components/media/WatchedMediaCard";
import { Divider } from "@/components/utils/Divider";
import { HomeLayout } from "@/pages/layouts/HomeLayout";
import { conf } from "@/setup/config";
import i18n from "@/setup/i18n";
import {
  Genre,
  Movie,
  TVShow,
  categories,
  ortherCategories,
  tvCategories,
} from "@/utils/discover";
import { MediaItem } from "@/utils/mediaTypes";

import { HeroPart2 } from "./parts/home/HeroPart2";
import { PageTitle } from "./parts/util/PageTitle";
import { Icon, Icons } from "../components/Icon";

export function Discover() {
  const { t } = useTranslation();
  const currentLanguage = i18n.language;
  const [showBg, setShowBg] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [genreMovies, setGenreMovies] = useState<{
    [genreId: number]: Movie[];
  }>({});
  const [countdown, setCountdown] = useState<number | null>(null);
  const navigate = useNavigate();
  const [categoryShows, setCategoryShows] = useState<{
    [categoryName: string]: MediaItem[];
  }>({});
  const [categoryMovies, setCategoryMovies] = useState<{
    [categoryName: string]: MediaItem[];
  }>({});
  const [tvGenres, setTVGenres] = useState<Genre[]>([]);
  const [tvShowGenres, setTVShowGenres] = useState<{
    [genreId: number]: TVShow[];
  }>({});
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const gradientRef = useRef<HTMLDivElement>(null);
  const [countdownTimeout, setCountdownTimeout] =
    useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    categories.forEach((category) =>
      fetchForCategory(category, setCategoryMovies, currentLanguage),
    );
  }, [currentLanguage]);

  useEffect(() => {
    tvCategories.forEach((category) =>
      fetchForCategory(
        category,
        setCategoryShows,
        currentLanguage,
        TMDBContentTypes.TV,
      ),
    );
  }, [currentLanguage]);

  // Fetch TV show genres
  useEffect(() => {
    fetchForGenres(ortherCategories[0], setTVGenres, currentLanguage, 6);
  }, [currentLanguage]);

  // Fetch TV shows for each genre
  useEffect(() => {
    tvGenres.forEach((genre) =>
      fetchForCategoryGenres(
        ortherCategories[1],
        setTVShowGenres,
        currentLanguage,
        TMDBContentTypes.TV,
        genre.id,
      ),
    );
  }, [currentLanguage, tvGenres]);
  // Fetch Movie genres
  useEffect(() => {
    fetchForGenres(ortherCategories[2], setGenres, currentLanguage, 4);
  }, [currentLanguage]);
  // Fetch movies for each genre
  useEffect(() => {
    genres.forEach((genre) =>
      fetchForCategoryGenres(
        ortherCategories[3],
        setGenreMovies,
        currentLanguage,
        TMDBContentTypes.MOVIE,
        genre.id,
      ),
    );
  }, [currentLanguage, genres]);
  // Update the scrollCarousel function to use the new ref map
  function scrollCarousel(categorySlug: string, direction: string) {
    const carousel = carouselRefs.current[categorySlug];
    if (carousel) {
      const movieElements = carousel.getElementsByTagName("a");
      if (movieElements.length > 0) {
        const movieWidth = movieElements[0].offsetWidth;
        const visibleMovies = Math.floor(carousel.offsetWidth / movieWidth);
        const scrollAmount = movieWidth * visibleMovies * 0.69; // Silly number :3
        if (direction === "left") {
          carousel.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        } else {
          carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }
  }
  const [movieWidth, setMovieWidth] = useState(
    window.innerWidth < 600 ? "150px" : "200px",
  );

  useEffect(() => {
    const handleResize = () => {
      setMovieWidth(window.innerWidth < 600 ? "150px" : "200px");
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (carouselRef.current && gradientRef.current) {
      const carouselHeight = carouselRef.current.getBoundingClientRect().height;
      gradientRef.current.style.top = `${carouselHeight}px`;
      gradientRef.current.style.bottom = `${carouselHeight}px`;
    }
  }, [movieWidth]);

  const browser = !!window.chrome; // detect chromium browser
  let isScrolling = false;

  function handleWheel(e: React.WheelEvent, categorySlug: string) {
    if (isScrolling) {
      return;
    }

    isScrolling = true;
    const carousel = carouselRefs.current[categorySlug];
    if (carousel) {
      const movieElements = carousel.getElementsByTagName("a");
      if (movieElements.length > 0) {
        if (e.deltaY < 5) {
          scrollCarousel(categorySlug, "left");
        } else {
          scrollCarousel(categorySlug, "right");
        }
      }
    }

    if (browser) {
      setTimeout(() => {
        isScrolling = false;
      }, 345); // disable scrolling after 345 milliseconds for chromium-based browsers
    } else {
      // immediately reset isScrolling for non-chromium browsers
      isScrolling = false;
    }
  }

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    document.body.style.overflow = "hidden";
    setIsHovered(true);
  };

  useEffect(() => {
    if (!isHovered) {
      document.body.style.overflow = "auto";
    }
  }, [isHovered]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    window.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  function renderMovies(
    medias: MediaItem[],
    category: string,
    isTVShow = false,
  ) {
    const categorySlug = `${category
      .toLowerCase()
      .replace(/ /g, "-")}${Math.random()}`; // Convert the category to a slug
    const displayCategory =
      category === "Now Playing"
        ? "In Cinemas"
        : category.includes("Movie")
          ? `${category}s`
          : isTVShow
            ? `${category}`
            : `${category}`;

    return (
      <div className="relative overflow-hidden mt-2">
        <h2 className="text-2xl cursor-default font-bold text-white sm:text-3xl md:text-2xl mx-auto pl-5">
          {displayCategory}
        </h2>
        <div
          id={`carousel-${categorySlug}`}
          className="flex pt-4 overflow-auto scrollbar overflow-y-hidden gap-6 mt-5 p-3"
          style={{
            scrollbarWidth: "thin",
            scrollbarColor: "transparent transparent",
          }}
          ref={(el) => {
            carouselRefs.current[categorySlug] = el;
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onWheel={(e) => handleWheel(e, categorySlug)}
        >
          {medias.map((media: any) => (
            <a
              key={media.id}
              // className="text-center relative mt-3 mx-[0.285em] mb-3 transition-transform hover:scale-105 duration-[0.45s]"
              style={{ flex: `0 0 ${movieWidth}` }}
            >
              <WatchedMediaCard media={media} key={media.id} />
            </a>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            title="Back"
            className="absolute left-5 top-1/2 transform -translate-y-3/4 z-10"
            onClick={() => scrollCarousel(categorySlug, "left")}
          >
            <div className="cursor-pointer text-white flex justify-center items-center h-10 w-10 rounded-full bg-search-hoverBackground active:scale-110 transition-[transform,background-color] duration-200">
              <Icon icon={Icons.ARROW_LEFT} />
            </div>
          </button>
          <button
            type="button"
            title="Next"
            className="absolute right-5 top-1/2 transform -translate-y-3/4 z-10"
            onClick={() => scrollCarousel(categorySlug, "right")}
          >
            <div className="cursor-pointer text-white flex justify-center items-center h-10 w-10 rounded-full bg-search-hoverBackground active:scale-110 transition-[transform,background-color] duration-200">
              <Icon icon={Icons.ARROW_RIGHT} />
            </div>
          </button>
        </div>
      </div>
    );
  }

  const handleRandomMovieClick = () => {
    const allMovies = Object.values(genreMovies).flat(); // Flatten all movie arrays
    const uniqueTitles = new Set<string>(); // Use a Set to store unique titles
    allMovies.forEach((movie) => uniqueTitles.add(movie.title)); // Add each title to the Set
    const uniqueTitlesArray = Array.from(uniqueTitles); // Convert the Set back to an array
    const randomIndex = Math.floor(Math.random() * uniqueTitlesArray.length);
    const selectedMovie = allMovies.find(
      (movie) => movie.title === uniqueTitlesArray[randomIndex],
    );

    if (selectedMovie) {
      setRandomMovie(selectedMovie);

      if (countdown !== null && countdown > 0) {
        // Clear the countdown
        setCountdown(null);
        if (countdownTimeout) {
          clearTimeout(countdownTimeout);
          setCountdownTimeout(null);
          setRandomMovie(null);
        }
      } else {
        setCountdown(5);
        // Schedule navigation after 5 seconds
        const timeoutId = setTimeout(() => {
          navigate(
            `/media/tmdb-movie-${selectedMovie.id}-${selectedMovie.title}`,
          );
        }, 5000);
        setCountdownTimeout(timeoutId);
      }
    }
  };

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;
    if (countdown !== null && countdown > 0) {
      countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) =>
          prevCountdown !== null ? prevCountdown - 1 : prevCountdown,
        );
      }, 1000);
    }

    return () => {
      clearInterval(countdownInterval);
    };
  }, [countdown]);

  return (
    <HomeLayout showBg={showBg}>
      <div className="mb-16 sm:mb-2">
        <style type="text/css">{`
            html, body {
              scrollbar-width: none;
              -ms-overflow-style: none;
            }
          `}</style>
        <PageTitle subpage k="global.pages.discover" />
        <HeroPart2 title={t("global.pages.discover")} setIsSticky={setShowBg} />
      </div>
      <div className="">
        <WideContainer ultraWide>
          <div className="flex items-center justify-center mb-6">
            <button
              type="button"
              className="flex items-center space-x-2 rounded-full px-4 text-white py-2 bg-pill-background bg-opacity-50 hover:bg-pill-backgroundHover transition-[background,transform] duration-100 hover:scale-105"
              onClick={handleRandomMovieClick}
            >
              <span className="flex items-center">
                {countdown !== null && countdown > 0 ? (
                  <div className="flex items-center ">
                    <span>Cancel Countdown</span>
                    <Icon
                      icon={Icons.X}
                      className="text-2xl ml-[4.5px] mb-[-0.7px]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center ">
                    <span>{t("discover.w_s_t")}</span>
                  </div>
                )}
              </span>
            </button>
          </div>
          {randomMovie && (
            <div className="mt-4 mb-4 text-center">
              <p>
                Now Playing{" "}
                <span className="font-bold">{randomMovie.title}</span> in{" "}
                {countdown}
              </p>
            </div>
          )}
          <div className="flex flex-col ">
            {categories.map((category: any) => (
              <div
                key={category.name}
                id={`carousel-${category.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="mt-8"
              >
                {renderMovies(
                  categoryMovies[category.name] || [],
                  category.name,
                )}
              </div>
            ))}
            {genres.map((genre) => (
              <div
                key={genre.id}
                id={`carousel-${genre.name.toLowerCase().replace(/ /g, "-")}`}
                className="mt-8"
              >
                {renderMovies(genreMovies[genre.id] || [], genre.name)}
              </div>
            ))}
            <div className="flex items-center">
              <Divider marginClass="mr-5" />
              <h1 className="flex text-3xl font-bold text-white items-center">
                {t("discover.shows").split(" ").join("\u00A0")}
              </h1>
              <Divider marginClass="ml-5" />
            </div>
            {tvCategories.map((category) => (
              <div
                key={category.name}
                id={`carousel-${category.name
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="mt-8"
              >
                {renderMovies(
                  categoryShows[category.name] || [],
                  category.name,
                  true,
                )}
              </div>
            ))}
            {tvGenres.map((genre) => (
              <div
                key={genre.id}
                id={`carousel-${genre.name.toLowerCase().replace(/ /g, "-")}`}
                className="mt-8"
              >
                {renderMovies(tvShowGenres[genre.id] || [], genre.name, true)}
              </div>
            ))}
          </div>
        </WideContainer>
      </div>
    </HomeLayout>
  );
}
