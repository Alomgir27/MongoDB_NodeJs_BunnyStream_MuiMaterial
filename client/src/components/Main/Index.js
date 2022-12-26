
import React, { Suspense} from "react";


import "../../App.css";

import {  BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "../../pages/Login.page";
import SignUp from "../../pages/Signup.page";

import MainPage from "./MainPage";
import Upload from "../../pages/Upload"
import MyVideos from "../About/MyVideos";
import About from "../About/About";
import VideoPage from "../VideoPage/VideoPage";
import SearchPage from "../SearchPage/SearchPage";
import PrimarySearchAppBar from "../PrimarySearchAppBar/PrimarySearchAppBar";

import Recommended from "../QueryPages/Recommended";
import RecentlyAdded from "../QueryPages/RecentlyAdded";

import Playlists from "../PlayList/PlayList";
import PlayCollectionList from "../PlayList/PlayCollectionList";


export default function App({ toggleTheme }) {

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <PrimarySearchAppBar toggleTheme={toggleTheme}/>
        <Routes>
          <Route path="/" element={<MainPage  />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/upload/:id" element={<Upload />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/search/:searchText" element={<SearchPage />} />
          <Route path="/myvideos" element={<MyVideos />} />
          <Route path="/about/:text" element={<About />} />
          <Route path="/recommended" element={<Recommended />} />
          <Route path="/recently-added" element={<RecentlyAdded />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlist/:collectionId" element={<PlayCollectionList />} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

