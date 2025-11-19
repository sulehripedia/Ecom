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

function App() {

  return (
    <BrowserRouter>
    {/* <StaggeredMenu /> */}
   <PillNav
  items={[
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' }
  ]}
  activeHref="/"
  className="custom-nav"
  ease="power2.easeOut"
  baseColor="#000000"
  pillColor="#ffffff"
  hoveredPillTextColor="#ffffff"
  pillTextColor="#000000"
/>
        <Routes>
       <Route path='/projects' element={<ProjectsPage />}/>
       <Route path='/' element={<TestHome/>}/>
       <Route path='/ai-agent' element={<FreeAIAgent />} />
      </Routes>
       </BrowserRouter>
  );
}

export default App;
