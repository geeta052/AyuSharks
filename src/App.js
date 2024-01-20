import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import "./global.css"; 
import "./style.scss";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Selection from "./pages/selection/Selection";
import StartupDashboard from "./pages/dashboard/startup";

import InvestorDashboard from "./pages/dashboard/investor";
// import IncubatorDashboard from "./pages/dashboard/incubator";
// import AcceleratorDashboard from "./pages/dashboard/accelerator";

import StartupDetails from "./pages/details/startup";
import StartupBDetails from "./pages/details/startupb";
import InvestorDetails from "./pages/details/investor";
import InvestorBDetails from "./pages/details/investorB";
import InvestorCDetails from "./pages/details/investorc";
import IncubatorDetails from "./pages/details/incubator";
import IncubatorBDetails from "./pages/details/incubatorb";
import IncubatorCDetails from "./pages/details/incubatorc";
import AcceleratorDetails from "./pages/details/accelerator";
import AcceleratorBDetails from "./pages/details/acceleratorb";
import AcceleratorCDetails from "./pages/details/acceleratorc";
import GovernmentAgenciesA from "./pages/details/governmentAgenciesA";
import GovernmentAgenciesB from "./pages/details/governmentAgenciesB";

import Signup from "./pages/signup/Signup";
import Chat from "./pages/chat/chat";
import UserDetails from "./pages/home/Userdetails";
import Connections from "./pages/home/Connections";
import Requests from "./pages/home/Requests";
import Community from "./pages/chat/Community";
import GroupChat from "./pages/chat/Groupchat";
import Posts from "./pages/posts/Posts";
import Explore from "./pages/explore/explore";
import Resources from "./pages/resource/resource";
import Profile from "./pages/profile/profile";
import JitsiMeetComponent from "./pages/chat/JitsiMeetComponent";

import MentorA from "./pages/details/MentorA";
import MentorB from "./pages/details/MentorB";

import UserList from "./components/admin/UserList";
function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { currentUser } = useContext(AuthContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/chat/:userId" element={<RequireAuth><ChatContainer /></RequireAuth>} />
            <Route path="community/:groupId" element={<RequireAuth><Groupchatcontainer /></RequireAuth>} />
            <Route path="posts" element={<Posts />} />
            <Route path="user-details/:userId" element={<RequireAuth><UserDetails /></RequireAuth>} />
            <Route path="/connections" element={<RequireAuth><Connections /></RequireAuth>} />
            <Route path="/explore" element={<RequireAuth><Explore /></RequireAuth>} />
            <Route path="/resource" element={<RequireAuth><Resources /></RequireAuth>} />
            <Route path="/community" element={<RequireAuth><Community /></RequireAuth>} />
            <Route path="/requests" element={<RequireAuth><Requests /></RequireAuth>} />
            <Route index element={<RequireAuth><Home selectedUser={selectedUser} onSelectUser={setSelectedUser} /></RequireAuth>} />
            <Route path="dashboard/:dashboardType/:userId" element={<RequireAuth><DashboardRouter /></RequireAuth>} />
            <Route path="selection" element={<RequireAuth><Selection /></RequireAuth>} />
            <Route path="details/startup" element={<RequireAuth><StartupDetails /></RequireAuth>} />
            <Route path="details/startupb" element={<RequireAuth><StartupBDetails /></RequireAuth>} />
            <Route path="details/incubatora" element={<RequireAuth><IncubatorDetails /></RequireAuth>} />
            <Route path="details/incubatorb" element={<RequireAuth><IncubatorBDetails /></RequireAuth>} />
            <Route path="details/incubatorc" element={<RequireAuth><IncubatorCDetails /></RequireAuth>} />
            <Route path="details/acceleratora" element={<RequireAuth><AcceleratorDetails /></RequireAuth>} />
            <Route path="details/acceleratorb" element={<RequireAuth><AcceleratorBDetails /></RequireAuth>} />
            <Route path="details/acceleratorc" element={<RequireAuth><AcceleratorCDetails /></RequireAuth>} />
            <Route path="details/investor" element={<RequireAuth><InvestorDetails /></RequireAuth>} />
            <Route path="details/investorb" element={<RequireAuth><InvestorBDetails /></RequireAuth>} />
            <Route path="details/investorc" element={<RequireAuth><InvestorCDetails /></RequireAuth>} />
            <Route path="details/governmentAgenciesA" element={<RequireAuth><GovernmentAgenciesA /></RequireAuth>} />
            <Route path="details/governmentAgenciesB" element={<RequireAuth><GovernmentAgenciesB /></RequireAuth>} />
            <Route path="details/mentor" element={<RequireAuth><MentorA /></RequireAuth>} />
            <Route path="details/mentorB" element={<RequireAuth><MentorB /></RequireAuth>} />
            <Route path="meet" element={<RequireAuth><JitsiMeetComponent /></RequireAuth>} />
            <Route path="profile" element={<RequireAuth><Profile /></RequireAuth>} />
            <Route path="userlist" element={<RequireAuth><UserList /></RequireAuth>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const DashboardRouter = () => {
  const { dashboardType } = useParams();

  switch (dashboardType) {
    case 'startup':
      return <StartupDashboard />;
    case 'investor':
      return <InvestorDashboard />;
    // case 'incubator':
    //   return <IncubatorDashboard />;
    // case 'accelerator':
    //   return <AcceleratorDashboard />;
    default:
      return <Navigate to="/" />;
  }
};

const DetailsRouter = () => {
  const { detailType } = useParams();

  switch (detailType) {
    case 'startup':
      return <StartupDetails />;
    case 'investor':
      return <InvestorDetails />;
    case 'incubator':
      return <IncubatorDetails />;
    case 'accelerator':
      return <AcceleratorDetails />;
    default:
      return <Navigate to="/" />;
  }
};

const ChatContainer = () => {
  const { userId } = useParams();

  // Render the Chat component with the userId
  return <Chat otherUserId={userId} />;
};

const Groupchatcontainer = () => {
  const { selectedGroup } = useParams();

  // Render the Chat component with the userId
  return <GroupChat groupId={selectedGroup} />;
};

export default App;
