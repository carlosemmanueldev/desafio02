import styles from "./Menu.module.css";
import MenuLink from "../MenuLink";
import logo from '../../assets/images/compass-logo.png';
import {AiFillHome} from 'react-icons/ai';
import {PiTelevisionFill} from 'react-icons/pi';
import {PiFilmReelBold} from 'react-icons/pi';
import {AiFillStar} from 'react-icons/ai';
import {FaPlus} from 'react-icons/fa';

export default function Menu() {
  return (
    <header>
      <nav className={styles.navbar}>
        <MenuLink to="/"><img src={logo} alt="logo" /></MenuLink>
        <MenuLink to="/"><AiFillHome/>Inicio</MenuLink>
        <MenuLink to="/tvshows"><PiTelevisionFill />  Séries</MenuLink>
        <MenuLink to="/movies"><PiFilmReelBold/>  Filmes</MenuLink>
        <MenuLink to="/actors"><AiFillStar />  Celebridades</MenuLink>
        
      </nav>
      <nav className={styles.navbar}>
        <MenuLink to="/mylist"><FaPlus/> Minha Lista</MenuLink>
      </nav>
    </header>
  );
}
