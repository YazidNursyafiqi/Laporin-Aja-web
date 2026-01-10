import { useState } from 'react';
import Navbar from './container/navbar/main_navbar';
import { Routes , Route } from 'react-router-dom';

//import semua halaman
import Landing_page from './pages/landing_page/landing_page';
import Reports from './pages/report/reports';
import ViewProblems_page from './pages/view-problems/view-problems';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Landing_page/>}/>
        <Route path='/Reports' element={<Reports/>}/>
        <Route path='/ViewProblems' element={<ViewProblems_page/>}/>
      </Routes>
    </>
  )
}

export default App
