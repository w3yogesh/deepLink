import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
// import Dashboard from "./pages/Dashboard";
// import Image from "./pages/Image";
import Profile from "./pages/Profile"
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feed" element={<Feed />} />

        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        
      </Routes>
    </div>
  );
}

export default App;
