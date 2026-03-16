import React from 'react'
import { BrowserRouter ,Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage';
import AddLauncherPage from './pages/AddLauncherPage';
import PageDetailsLaunche from './pages/PageDetailsLaunche';


const App:React.FC = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/'
      element={<HomePage/>} 
      />
      <Route path='/add-launcher'
      element= {<AddLauncherPage/>}
      />
      <Route path='/launcher/:id'
      element={<PageDetailsLaunche/>}/>
    </Routes>
    </BrowserRouter>

  )
}

export default App