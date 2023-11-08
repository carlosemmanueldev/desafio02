import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import {useEffect, useState} from "react";
import {getNowPlaying, getPopular, getTopRated, getUpcoming} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";
import classes from "../Movies/Movies.module.css";
import Highlight from "../../components/Highlight/Highlight.tsx";
import ButtonRounded from "../../components/UI/ButtonRounded.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";

export interface Genres {
    id: number;
    name: string;
}

export interface MovieProps {
    id: number,
    title: string;
    release_date: string;
    runtime: number;
    genres: Genres[];
    overview: string;
    backdrop_path: string;
    number_of_seasons: number;
    number_of_movies: number;
    vote_average: number;
    poster_path: string;
    media_type: string;
}

function Movies() {
    const [movie, setMovie] = useState({} as MovieProps);
    const [isLoading, setIsLoading] = useState(false);
    const [popularMovies, setPopularMovies] = useState([] as MovieProps[]);
    const [topRatedMovies, setTopRatedMovies] = useState([] as MovieProps[]);
    const [nowPlayingMovies, setNowPlayingMovies] = useState([] as MovieProps[]);
    const [upcomingMovies, setUpcomingMovies] = useState([] as MovieProps[]);

    useEffect(() => {
        document.title = "Filmes"
        requestHighlitedMovie();
    }, []);

    async function requestHighlitedMovie() {
        setIsLoading(true);
        const popularMoviesData = await getPopular('movie');
        setPopularMovies(popularMoviesData.results)
        const choosenMovie = chooseItem(popularMoviesData.results);
        const movieDetails = await getDetails('movie', choosenMovie.id);
        setMovie(movieDetails);
        const topRatedMoviesData = await getTopRated('movie');
        setTopRatedMovies(topRatedMoviesData.results);
        const nowPlayingMoviesData = await getNowPlaying();
        setNowPlayingMovies(nowPlayingMoviesData.results);
        const upcomingMoviesData = await getUpcoming();
        setUpcomingMovies(upcomingMoviesData.results);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background
                    image={movie.backdrop_path}
                >
                    <Menu/>

                    <div className={classes.title}>
                        <h2>Filmes</h2>
                        <ButtonRounded>Gêneros</ButtonRounded>
                    </div>

                    <Highlight
                        data={movie}
                        isMovie
                        type={'duration'}
                        descriptionPosition={'top'}
                        hasGenre
                        hasWatchNow
                        hasMoreInfo
                        hasAdd
                        hasFav
                    />
                </Background>

                <div className={classes.carousel}>
                    <Carousel type='movie' title='Lançamentos' data={nowPlayingMovies}/>
                    <Carousel type='movie' title='Populares' data={popularMovies}/>
                    <Carousel type='movie' title='Mais bem avaliados' data={topRatedMovies}/>
                    <Carousel type='movie' title='Em breve' data={upcomingMovies}/>
                </div>
            </>
    )
}

export default Movies;