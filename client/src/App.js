import { Route, Routes } from "react-router-dom";
import { Login, Signup, Home } from "./pages";
import Profile from "./pages/Profile"

import MyProfile from "./pages/MyProfile";
import PostComponent from "./components/PostComponent";
import Feed from "./pages/Feed";

import MyNetwork from "./pages/MyNetwork";
import Chat from "./pages/Chat";
import UserProfileView from './pages/UserProfileView';
import CompanyForm from './pages/CompanyForm';

import CompanyList from './pages/CompanyList';
import CompanyDetail from './pages/CompanyDetail';
import CompanyDetail2 from './pages/CompanyDetail2';
import AllJobs from "./pages/AllJobs";
import MyCompanies from "./pages/MyCompanies";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={< Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myprofile" element={<MyProfile/>}/>

        <Route path="/mynetwork" element={<MyNetwork/>}/>

        <Route path="/feed" element={<Feed />} />
        <Route path="/chat" element={<Chat />} />


        <Route path="/userprofileview/:userId" element={<UserProfileView/>}/>

        <Route path="/company" element={<CompanyForm/>}/>
        <Route path="/companylist" element={<CompanyList/>}/>
        <Route path="/company/:companyId" element={<CompanyDetail/>}/>
        <Route path="/company2/:companyId" element={<CompanyDetail2/>}/>
        <Route path="/jobs" element={<AllJobs/>}/>

        <Route path="/mycompanies" element={<MyCompanies/>}/>
  
      </Routes>
    </div>
  );
}

export default App;
