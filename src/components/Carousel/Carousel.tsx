import {MovieProps} from "../../pages/Movies";
//@ts-ignore
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/splide/dist/css/splide.min.css';
import classes from './Carousel.module.css';
import {Link} from "react-router-dom";
import {SerieProps} from "../../pages/TvShows";
import {SeasonProps} from "../../pages/TvShows/Seasons.tsx";

const IMG_BASE_URL = import.meta.env.VITE_IMG;

function Carousel<T extends MovieProps | SerieProps | SeasonProps>({type, title, data}: {type: string, title: string, data: T[] }) {
    let carouselType = 'loop';
    if (data.length <= 5) {
        carouselType = 'slide';
    }
    let link = '';

    const splideOptions = {
        type: carouselType,
        perPage: 6,
        perMove: 1,
        gap: '10rem',
        autoplay: false,
        pauseOnHover: true,
        arrows: false,
        pagination: false,
        breakpoints: {
            1850: {
                perPage: 5,
            },
            1540: {
                perPage: 4,
            },
            1210: {
                perPage: 3,
            },
            880: {
                perPage: 2,
            },
        },
    };

    return (
        <div className="carousel">
            <h4 className={classes['carousel-title']}>{title}</h4>
            <Splide options={splideOptions}>
                {data.map((item) => (
                    <SplideSlide key={item.id}>
                        <Link to={`/${type}/${item.id}`}>
                            <div className={classes['carousel-item']}>
                                <img className={classes['carousel-item-img']} src={IMG_BASE_URL + item.poster_path}
                                     alt={item.media_type === 'movie' ? (item as MovieProps).title : (item as SerieProps | SeasonProps).name}/>
                            </div>
                        </Link>
                    </SplideSlide>
                ))}
            </Splide>
        </div>
    );
}

export default Carousel;