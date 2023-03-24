import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchPage from "../pages/SearchPage";
import ShowPage from "../pages/ShowPage";

const routes = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<SearchPage />} />
      <Route exact path="/show/:id" element={<ShowPage />} />
    </Routes>
  </Router>
);

export default routes;
