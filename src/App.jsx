import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./Header/Header";
import { Home } from "./Home/Home";
import { Form } from "./Components/Form/Form";
import Memory from "./Memory/Memory";
import { Footer } from "./Footer/Footer";


function App() {
 
  return(
    <BrowserRouter>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Form />} />
          <Route path="/memory" element={<Memory />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
