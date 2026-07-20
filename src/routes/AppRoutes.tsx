import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home"
import CityBusPage from "../pages/CityBusPage"
import PetCare from "../pages/PetCare"
import ContactPage from "../pages/ContactPage"
import CareersPage from "../pages/Careers"
import ScrollToTop from "../components/ScrollToTop"
import TeamPage from "../pages/TeamPage"
import AboutPage from "../pages/About"
import BlogPage from "../pages/blog"
import Emergency from "../pages/Emergency"

const AppRoutes = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/citybus" element={<CityBusPage />} />
      <Route path="/petcare" element={<PetCare />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/careers" element={<CareersPage />} />
      <Route path="/team" element={<TeamPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/emergency" element={<Emergency />} />
    </Routes>
  </BrowserRouter>
)

export default AppRoutes