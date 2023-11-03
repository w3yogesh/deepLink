import './App.css';
import { Route, Routes } from "react-router-dom";
import { Signup, Login } from "./pages";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
