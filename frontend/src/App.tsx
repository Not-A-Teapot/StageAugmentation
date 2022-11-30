import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css';
import Login from "./modules/login";

function App(){
  return(
    <Router>
      <Routes>
        {/*<Route key="teaser" path="/teaser" element={<Teaser/>}/>*/}
        <Route key="start" path="/" element={<Login/>} />
      </Routes>
    </Router>
  )
}

export default App;