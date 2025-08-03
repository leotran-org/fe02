import React from 'react';


import NavBar from './components/NavBar'; 

import Home from "./pages/Home";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Awards from "./pages/Awards";
import Consultancy from "./pages/Consultancy";
import Activity from "./pages/Activity";
import Certificate from "./pages/Certificate";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Footer from "./pages/Footer";


import Background from './components/Background'

function App() {
  return (
    <div className="scroll-smooth min-h-screen">
    
    <NavBar />
    
    <Background />
    <Home />
    <About />
    <Experience />
    <Awards />
    <Consultancy />
    <Activity />
    <Certificate />
    <Projects />
    <Contact />
    <Footer />

    </div>
  );
}

export default App;
