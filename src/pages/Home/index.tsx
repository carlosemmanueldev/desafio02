import Menu from "../../components/Menu";
import classes from "./Home.module.css";
import Highlight from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import Background from "../../components/UI/Background.tsx";
import Loading from "../../components/UI/Loading.tsx";
import {getCollection, getPopular} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import {MovieProps} from "../Movies";
import Carousel from "../../components/Carousel/Carousel.tsx";

function Home() {
    const [movie, setMovie] = useState({} as MovieProps);
    const [isLoading, setIsLoading] = useState(false);
    const [popularMovies, setPopularMovies] = useState([] as MovieProps[]);
    const [popularSeries, setPopularSeries] = useState([] as MovieProps[]);
    const [collection, setcollection] = useState([] as MovieProps[]);

    useEffect(() => {
        document.title = "Início"
        requestHighlitedMovie();
    }, []);

    async function requestHighlitedMovie() {
        setIsLoading(true);
        const popMovies = await getPopular('movie');
        setPopularMovies(popMovies.results);
        const choosenMovie = chooseItem(popMovies.results);
        const movieDetails = await getDetails('movie', choosenMovie.id);
        setMovie(movieDetails);
        const popSeries = await getPopular('tv');
        setPopularSeries(popSeries.results);
        const choosenCollection = await getCollection(10);
        setcollection(choosenCollection.parts)
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
                        descriptionPosition={'top'}
                        hasGenre
                        hasWatchNow
                        hasMoreInfo
                        hasAdd
                        hasFav
                    />
                </Background>

                <div className={classes.carousel}>
                    <Carousel type='movie' title='Coleção de Star Wars' data={collection}/>
                    <Carousel type='movie' title='Séries em alta' data={popularSeries}/>
                    <Carousel type='movie' title='Filmes em alta' data={popularMovies}/>
                </div>
            </>
    )
}

export default Home;