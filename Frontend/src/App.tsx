import React from 'react'
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AddLauncherPage from './pages/AddLauncherPage';
import PageDetailsLaunche from './pages/PageDetailsLaunche';
import Navbar from './components/Navbar';
import UpdatePage from './pages/UpdatePage';


const App:React.FC = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/'
      element={<HomePage/>} 
      />
      <Route path='/add-launcher'
      element= {<AddLauncherPage/>}
      />
  <Route path='/launcher/:id'
  element={<PageDetailsLaunche/>}
  />
  <Route path='/update/:id'
  element={<UpdatePage/>}
  />
    </Routes>
    </BrowserRouter>

  )
}

export default App