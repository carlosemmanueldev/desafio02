import classes from "./Episodes.module.css";
import {getMinutes} from "../../utils/Details.tsx";

const IMG_BASE_URL = import.meta.env.VITE_IMG;

function Episodes({data}) {
    return (
        <div>
            <h1>Episódios</h1>

            <div className={classes.card}>
                {data.map((episode) => (
                    <div key={episode.id}>
                        <img src={IMG_BASE_URL + episode.still_path} alt={episode.name}/>
                        <div className={classes.info}>
                            <div className={classes.title}>
                                <p className='body-bold'>{`${episode.episode_number}. ${episode.name}`}</p>
                                <p className='body-bold'>{getMinutes(episode.runtime)}</p>
                            </div>
                            <p>{episode.overview}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Episodes;