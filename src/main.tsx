import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/index.tsx";
import Login from "./pages/Login/index.tsx";
import Actors from "./pages/Actors/index.tsx";
import TvShows from "./pages/TvShows/index.tsx";
import Movies from "./pages/Movies/MoviesPage.tsx";
import Collections from "./pages/Collections/index.tsx";
import Search from "./pages/Search/index.tsx";
import MyList from "./pages/MyList/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/actors" element={<Actors />} />
          <Route path="/tvshows" element={<TvShows />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/search" element={<Search />} />
          <Route path="/mylist" element={<MyList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
