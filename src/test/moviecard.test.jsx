import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import MovieCard from '../components/MovieCard'
import { MemoryRouter } from 'react-router-dom'

const fakeMovie = {
    id: 1,
    title: 'Matrix',
    poster_path: '/test.jpg',
    vote_average: 8.2,
    release_date: '1999-03-31'
}

describe("cardMatrix", () => {
    it("affiche le titre du film", () => {
        render(
        <MemoryRouter>
        <MovieCard movie={fakeMovie} />
        </MemoryRouter>)
        expect(screen.getByText('Matrix')).toBeInTheDocument()
    })
    it("affiche la note du film", () => {
        render(
        <MemoryRouter>
        <MovieCard movie={fakeMovie} />
        </MemoryRouter>)
        expect(screen.getByText(/8.2/)).toBeInTheDocument()
    })
    it("affiche l'affiche du film", () => {
        render(
        <MemoryRouter>
        <MovieCard movie={fakeMovie} />
        </MemoryRouter>)
        const img = screen.getByRole('img')
        expect(img).toHaveAttribute('src', expect.stringContaining('/test.jpg'))
    })
})