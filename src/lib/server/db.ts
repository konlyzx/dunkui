
import fs from 'fs';
import path from 'path';

const DB_PATH = path.resolve('src/lib/server/db.json');

// Ensure DB exists
if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ movies: [] }, null, 2));
}

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    video_type: 'trailer' | 'local';
    video_src: string; // YouTube Key or Local Path
    added_at: string;
}

export const getMovies = (): Movie[] => {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data).movies;
};

export const saveMovie = (movie: Movie) => {
    const movies = getMovies();
    const index = movies.findIndex(m => m.id === movie.id);
    
    if (index >= 0) {
        movies[index] = movie;
    } else {
        movies.push(movie);
    }
    
    fs.writeFileSync(DB_PATH, JSON.stringify({ movies }, null, 2));
    return movie;
};

export const getMovieById = (id: number): Movie | undefined => {
    return getMovies().find(m => m.id === id);
};
