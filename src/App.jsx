import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Post from './pages/Post';
import NotFound from './pages/notfound';


function App() {
  return (
    <div className="scroll-smooth min-h-screen">
      <Router basename="/">
        <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
