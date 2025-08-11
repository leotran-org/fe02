import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Portfolio from './pages/Portfolio';
import Blog from './pages/Blog';
import Post from './pages/Post';
import PostEdit from './pages/PostEdit';
import NotFound from './pages/notfound';
import Login from './pages/Login';
import Gallery from './pages/Gallery';
import Media from './pages/Media';
import MediaEdit from './pages/MediaEdit';


function App() {
  return (
    <div className="scroll-smooth min-h-screen">
      <Router basename="/">
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Portfolio />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/media/:id" element={<Media />} />
            <Route path="/media/:id/edit" element={<MediaEdit />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/post/:id/edit" element={<PostEdit />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
