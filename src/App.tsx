import "./App.css";
import MenuLink from "./components/MenuLink";


function App() {

  return (
    <header>
      <nav>
        <MenuLink to="/">Inicio</MenuLink>
        <MenuLink to="/tvshows">Séries</MenuLink>
        <MenuLink to="/movies">Filmes</MenuLink>
        <MenuLink to="/actors">Celebridades</MenuLink>
        <MenuLink to="/mylist">Minha Lista</MenuLink>
      </nav>
    </header>
  );
}

export default App;
