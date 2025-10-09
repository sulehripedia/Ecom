import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Home from './components/Home';
import ProjectsPage from './pages/Projects';
import StaggeredMenu from './components/StaggeredMenu';
import FreeAIAgent from './components/AiAgent';

function App() {

  return (
    <BrowserRouter>
    <StaggeredMenu />
        <Routes>
       <Route path='/projects' element={<ProjectsPage />}/>
       <Route path='/' element={<Home />}/>
       <Route path='/ai-agent' element={<FreeAIAgent />} />
      </Routes>
       </BrowserRouter>
  );
}

export default App;
