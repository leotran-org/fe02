import React from 'react';

import NavBar from '../components/NavBar'; 

import Home from "../components/portfolio/Home";
import About from "../components/portfolio/About";
import Experience from "../components/portfolio/Experience";
import Awards from "../components/portfolio/Awards";
import Consultancy from "../components/portfolio/Consultancy";
import Certificate from "../components/portfolio/Certificate";
import Projects from "../components/portfolio/Projects";
import Contact from "../components/portfolio/Contact";
import Footer from "../components/portfolio/Footer";

import Background from '../components/Background'

function Portfolio() {
  return (
    <div id="portfolio">
    
    <NavBar />
    
    <Background />
    <Home />
    <About />
    <Certificate />
    <Awards />
    <Experience />
    <Projects />
    <Consultancy />
    <Contact />
    <Footer />

    </div>
  );
}

export default Portfolio;

