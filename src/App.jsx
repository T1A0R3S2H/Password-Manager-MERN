import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Manager from './components/Manager'
import { ToastContainer } from 'react-toastify';
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar />
    <Manager />
    <ToastContainer />
    <Footer />
    </>
  )
}

export default App
