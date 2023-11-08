import Background from "../../components/UI/Background.tsx";
import Highlight from "../../components/Highlight/Highlight.tsx";
import Menu from "../../components/Menu";
import {useEffect, useState} from "react";
import {getAiringToday, getOnAir, getPopular, getTopRated} from "../../api/Lists.ts";
import {chooseItem} from "../../utils/Lists.ts";
import {getDetails} from "../../api/Details.ts";
import Loading from "../../components/UI/Loading.tsx";
import classes from "../Movies/Movies.module.css";
import ButtonRounded from "../../components/UI/ButtonRounded.tsx";
import {Genres} from "../Movies";
import Carousel from "../../components/Carousel/Carousel.tsx";
import {SeasonProps} from "./Seasons.tsx";

export interface SerieProps {
    id: number;
    name: string;
    overview: string;
    backdrop_path: string;
    number_of_seasons: number;
    number_of_movies: number;
    vote_average: number;
    first_air_date: string;
    runtime: number;
    genres: Genres[];
    poster_path: string;
    media_type: string;
    seasons: SeasonProps[];
}

function TvShows() {
    const [serie, setSerie] = useState({} as SerieProps);
    const [isLoading, setIsLoading] = useState(false);
    const [popularSeries, setPopularSeries] = useState([] as SerieProps[]);
    const [topRatedSeries, setTopRatedSeries] = useState([] as SerieProps[]);
    const [airingTodaySeries, setAiringTodaySeries] = useState([] as SerieProps[]);
    const [onAirSeries, setOnAirSeries] = useState([] as SerieProps[]);

    useEffect(() => {
        document.title = "Séries"
        requestHighlitedSeries();
    }, []);

    async function requestHighlitedSeries() {
        setIsLoading(true);
        const popularSeries = await getPopular('tv');
        setPopularSeries(popularSeries.results);
        const choosenSerie = chooseItem(popularSeries.results);
        const serieDetails = await getDetails('tv', choosenSerie.id);
        setSerie(serieDetails);
        const topRatedSeries = await getTopRated('tv');
        setTopRatedSeries(topRatedSeries.results);
        const airingTodaySeries = await getAiringToday();
        setAiringTodaySeries(airingTodaySeries.results);
        const onAirSeries = await getOnAir();
        setOnAirSeries(onAirSeries.results);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background image={serie.backdrop_path}>
                    <Menu/>

                    <div className={classes.title}>
                        <h2>Séries</h2>
                        <ButtonRounded>Gêneros</ButtonRounded>
                    </div>

                    <Highlight
                        data={serie!}
                        type={'numberOfSeasons'}
                        descriptionPosition={'bottom'}
                        hasGenre
                        hasWatchNow
                        hasTrailer
                        hasAdd
                        hasFav
                    />
                </Background>

                <div className={classes.carousel}>
                    <Carousel type='tvshow/seasons' title='Lançamentos' data={airingTodaySeries}/>
                    <Carousel type='tvshow/seasons' title='Populares' data={popularSeries}/>
                    <Carousel type='tvshow/seasons' title='Estão no ar' data={onAirSeries}/>
                    <Carousel type='tvshow/seasons' title='Mais bem avaliadas' data={topRatedSeries}/>
                </div>
            </>
    )
}

export default TvShows;