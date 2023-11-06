import {FaPlay} from "react-icons/fa";
import ButtonSecondary from "../UI/ButtonSecondary.tsx";
import {RiInformationFill} from "react-icons/ri";
import ButtonOutlined from "../UI/ButtonOutlined.tsx";
import ButtonCircle from "../UI/ButtonCircle.tsx";
import {IoMdStar} from "react-icons/io";
import {IoAddOutline} from "react-icons/io5";
import classes from "./Highlight.module.css";
import {useState} from "react";
import {BsCheck2} from "react-icons/bs";
import {
    getDuration,
    getGenres,
    getNumberOfMovies,
    getNumberOfSeasons, getRating,
    getReleaseYear
} from "../../utils/getDetails.tsx";
import HighlightDescription from "./HighlightDescription.tsx";

export interface MovieGenres {
    id: number;
    name: string;
}

export interface MovieProps {
    title: string;
    release_date: string;
    runtime: number;
    genres: MovieGenres[];
    overview: string;
    backdrop_path: string;
    number_of_seasons: number;
    number_of_movies: number;
    vote_average: number;
}

export interface HighlightProps {
    movie: MovieProps,
    type: string,
    descriptionPosition: string,
    hasGenre?: boolean,
    hasWatchNow?: boolean,
    hasTrailer?: boolean,
    hasMoreInfo?: boolean,
    hasAdd?: boolean,
    hasFav?: boolean,
}

function Highlight(props: HighlightProps) {
    const releaseYear = getReleaseYear(props.movie.release_date);
    const duration = getDuration(props.movie.runtime);
    const genres = getGenres(props.movie.genres);
    const numberOfSeasons = getNumberOfSeasons(props.movie.number_of_seasons);
    const numberOfMovies = getNumberOfMovies(props.movie.number_of_movies);
    const rating = getRating(props.movie.vote_average);
    const [favorite, setFavorite] = useState(false);
    const [added, setAdded] = useState(false);

    function secondParameter() {
        switch (props.type) {
            case 'numberOfSeasons':
                return numberOfSeasons;
            case 'duration':
                return duration;
            case 'numberOfMovies':
                return numberOfMovies;
            case 'rating':
                return rating;
            default:
                return '';
        }
    }

    function toggleFavorite() {
        setFavorite((prevState) => !prevState);
    }

    function toggleAdded() {
        setAdded((prevState) => !prevState);
    }

    return (
        <section>
            <div className={classes.info}>
                <h1>{props.movie.title}</h1>
                <p className="body-regular">{releaseYear} • {secondParameter()}</p>
                {props.hasGenre && <p className="caption">{genres}</p>}
            </div>

            {props.descriptionPosition === 'top' ?
                <HighlightDescription description={props.movie.overview}/>
                : null}

            <div className={classes.actions}>
                {props.hasWatchNow && <ButtonSecondary><FaPlay/> ver agora</ButtonSecondary>}
                {props.hasTrailer && <ButtonOutlined>trailer</ButtonOutlined>}
                {props.hasMoreInfo && <ButtonOutlined><RiInformationFill/>mais informações</ButtonOutlined>}

                {props.hasFav &&
                    <ButtonCircle
                        type="button"
                        favoriteOrAdded={added}
                        onClick={toggleAdded}
                    >
                        {added ? <BsCheck2/> : <IoAddOutline/>}
                    </ButtonCircle>
                }

                {props.hasAdd &&
                    <ButtonCircle
                        type="button"
                        favoriteOrAdded={favorite}
                        onClick={toggleFavorite}
                    >
                        {favorite ? <BsCheck2/> : <IoMdStar/>}
                    </ButtonCircle>
                }
            </div>

            {props.descriptionPosition === 'bottom' ?
                <HighlightDescription description={props.movie.overview}/>
                : null}
        </section>
    )
}

export default Highlight;