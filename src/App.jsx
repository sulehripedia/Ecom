import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import ProjectsPage from './pages/Projects';
import StaggeredMenu from './components/StaggeredMenu';
import FreeAIAgent from './components/AiAgent';
import Portfolio from './components/ProjectPage';
import TestHome from './pages/TestHome';
import PillNav from './components/PillNav';
import Footer from './components/Footer';
import About from './pages/About';

function App() {

  return (
    <BrowserRouter>
    {/* <StaggeredMenu /> */}
        <PillNav/>
        <Routes>
       <Route path='/projects' element={<ProjectsPage />}/>
       <Route path='/' element={<TestHome/>}/>
       <Route path='/ai-agent' element={<FreeAIAgent />} />
       <Route path='/about' element={<About />} />
      </Routes>
       <Footer />
       </BrowserRouter>
  );
}

export default App;
