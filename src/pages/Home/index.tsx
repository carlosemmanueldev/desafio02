import Menu from "../../components/Menu";
import classes from "./Home.module.css";
import Highlight, {MovieProps} from "../../components/Highlight/Highlight.tsx";
import {useEffect, useState} from "react";
import Background from "../../components/UI/Background.tsx";

function Home() {
    const [movie, setMovie] = useState({} as MovieProps);

    useEffect(() => {
        requestMovie();
    }, []);

    async function requestMovie() {
        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/550?language=pt-Br', {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
                },
            });

            const resData = await response.json();
            setMovie(resData);
        } catch (e: any) {
            throw new Error(e.statusText);
        }
    }

    return (
        <>
            <Background
                image={movie.backdrop_path}
            >
                <Menu/>
                <Highlight
                    movie={movie}
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

export default Home;