import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import Background from '../common/Background.jsx'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Background />
      <Navbar />
      <main className="flex-1 pt-28">{children}</main>
      <Footer />
    </div>
  )
}
