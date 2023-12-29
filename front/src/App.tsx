import Browse from "./views/browse/Browse"
import Home from "./views/home/Home"
import SignIn from "./views/auth/SignIn"
import SignUp from "./views/auth/SignUp"
import ArtWorks from "./views/account/ArtWorks"
import Tour from "./views/tour/Tour"

import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

export default function App () {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/browse" element={<Browse/>}></Route>
          <Route path="/sign-in" element={<SignIn/>}></Route>
          <Route path="/sign-up" element={<SignUp/>}></Route>
          <Route path="/:username/artworks" element={<ArtWorks/>}></Route>
          <Route path="/tour" element={<Tour/>}></Route>
        </Routes>
      </div>
    </Router>
  )
}