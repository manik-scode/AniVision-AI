import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from '../components/layout/Layout.jsx'
import Home from '../pages/Home.jsx'
import Predict from '../pages/Predict.jsx'
import Analytics from '../pages/Analytics.jsx'
import AboutModel from '../pages/AboutModel.jsx'
import History from '../pages/History.jsx'
import NotFound from '../pages/NotFound.jsx'

export default function AppRoutes() {
  const location = useLocation()

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/about" element={<AboutModel />} />
          <Route path="/history" element={<History />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
