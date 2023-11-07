import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import {useEffect, useState} from "react";
import {getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";
import classes from "../Movies/Movies.module.css";
import Highlight from "../../components/Highlight/Highlight.tsx";
import ButtonRounded from "../../components/UI/ButtonRounded.tsx";

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
}

function Movies() {
    const [movie, setMovie] = useState({} as MovieProps);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.title = "Filmes"
        requestHighlitedMovie();
    }, []);

    async function requestHighlitedMovie() {
        setIsLoading(true);
        const popularMovies = await getPopular('movie');
        const choosenMovie = chooseItem(popularMovies.results);
        const movieDetails = await getDetails('movie', choosenMovie.id);
        setMovie(movieDetails);
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
                    <Menu/>
                    <Menu/>
                    <Menu/>
                    <Menu/>
                </div>
            </>
    )
}

export default Movies;