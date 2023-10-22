import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
import Header from "./components/Header";
import HomeScreen from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" index element={<HomeScreen />} />
      </Routes>
    </Router>
  );
}

export default App;
