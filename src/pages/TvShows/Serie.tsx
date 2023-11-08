import Loading from "../../components/UI/Loading.tsx";
import Background from "../../components/UI/Background.tsx";
import Menu from "../../components/Menu";
import Highlight from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import {SerieProps} from "./index.tsx";
import classes from "../Movies/Movies.module.css";
import Episodes from "../../components/Episodes/Episodes.tsx";
import {useParams} from "react-router-dom";
import {getDetails} from "../../api/Details.ts";
import {getSeasonDetails} from "../../api/Lists.ts";

function Serie() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [serie, setSerie] = useState({} as SerieProps);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        document.title = "Episódios da Série"
        fetchEpisodes();
    }, []);

    async function fetchEpisodes() {
        setIsLoading(true);
        const serieId = +params.id!;
        const season = +params.season!;
        const serieDetails = await getDetails('tv', serieId);
        setSerie(serieDetails);
        const episodesDetails = await getSeasonDetails(serieId, season);
        setEpisodes(episodesDetails.episodes);
        setIsLoading(false);
    }

    return (
        isLoading ? <Loading/> :
            <>
                <Background
                    image={serie.backdrop_path}
                >
                    <Menu/>

                    <div className={classes.title}>
                        <h2>{serie.name}</h2>
                    </div>

                    <Highlight
                        data={serie}
                        type={'rating'}
                        descriptionPosition={'bottom'}
                        hasWatchNow
                        hasTrailer
                    />
                </Background>

                {/*<Episodes data={episodes} />*/}
            </>
    );
}

export default Serie;