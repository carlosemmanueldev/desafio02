import Loading from "../../components/UI/Loading.tsx";
import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import Carousel from "../../components/Carousel/Carousel.tsx";
import {useEffect, useState} from "react";
import {MovieProps} from "./index.tsx";
import {getDetails, getSimilar} from "../../api/Details.ts";
import classes from "./Movie.module.css";
import {useParams} from "react-router-dom";

function Movie() {
    const params = useParams();
    const [movie, setMovie] = useState({} as MovieProps);
    const [isLoading, setIsLoading] = useState(false);
    const [similarMovies, setSimilarMovies] = useState([] as MovieProps[]);

    useEffect(() => {
        document.title = "Detalhes do filme"
        fetchMovie();
    }, [params]);

    async function fetchMovie() {
        setIsLoading(true);
        const movieId = +params.id!;
        const movieDetails = await getDetails('movie', movieId);
        setMovie(movieDetails);
        const similarMoviesData = await getSimilar('movie', movieId,);
        setSimilarMovies(similarMoviesData);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background
                    image={movie.backdrop_path}
                >
                    <Menu/>
                    <Highlight
                        data={movie}
                        isMovie
                        type={'duration'}
                        descriptionPosition={'bottom'}
                        hasGenre
                        hasWatchNow
                        hasTrailer
                        hasAdd
                        hasFav
                    />
                </Background>

                <div className={classes.carousel}>
                    <Carousel type='movie' title='Similares' data={similarMovies}/>
                </div>
            </>
    )
}

export default Movie;