import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import Dashboard from "./pages/Dashboard";
import Image from "./pages/Image";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/image" element={<Image />} />

      </Routes>
    </div>
  );
}

export default App;
