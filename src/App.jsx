import { useState } from 'react'
import './App.css'
import Manager from './components/Manager'
import Navbar from './components/Navbar'
import Footer from './components/footer'
function App() {

  return (
    <>
      <Navbar/>
      <Manager/>
      <div className='h-8 w-full'></div>
      <Footer/>
    </>
  )
}

export default App
