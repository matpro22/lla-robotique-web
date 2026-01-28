import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import LaunchScreen from './components/LaunchScreen'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import AccessibilityPanel from './components/AccessibilityPanel'
import Home from './pages/Home'
import Results from './pages/Results'
import Robot from './pages/Robot'
import Private from './pages/Private'
import Admin from './pages/Admin'
import Club from './pages/Club'
import './App.css'

function AppRoutes() {
  const location = useLocation()

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.98
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.98,
      transition: {
        duration: 0.3,
        ease: 'easeIn'
      }
    }
  }

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Home />
              </motion.div>
            }
          />
          <Route
            path="/results"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Results />
              </motion.div>
            }
          />
          <Route
            path="/robot"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Robot />
              </motion.div>
            }
          />
          <Route
            path="/private"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Private />
              </motion.div>
            }
          />
          <Route
            path="/admin"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Admin />
              </motion.div>
            }
          />
          <Route
            path="/club"
            element={
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <Club />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <AccessibilityPanel />
    </>
  )
}

function App() {
  const [showLaunch, setShowLaunch] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLaunch(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  if (showLaunch) {
    return <LaunchScreen />
  }

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App

