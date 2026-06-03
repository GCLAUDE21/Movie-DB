import { describe, it, expect } from "vitest";
import {
  searchIdMovies,
  searchMovies,
  searchPopularMovies,
} from "../api/moviedb";

describe("searchMovies", () => {
  it("retourne des films", async () => {
    const { results } = await searchMovies("harry", 1);
    expect(results.length).toBeGreaterThan(0);
  });
});

describe("searchPopularMovies", () => {
  it("retourne des films", async () => {
    const { results, totalPages } = await searchPopularMovies(1);
    expect(results.length).toBeGreaterThan(0);
    expect(totalPages).toBeGreaterThan(0);
  });
});

describe("searcheIdMovies", () => {
  it("retourne un film par id", async () => {
    const film = await searchIdMovies(603);
    expect(film.title).toBe("Matrix");
  });
});
