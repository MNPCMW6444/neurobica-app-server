import StatusBar from "./components/StatusBar/StatusBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import MyAccount from "./components/MyAccount/MyAccount";
import MyBrain from "./components/MyBrain/MyBrain";
import TrainMyBrain from "./components/TrainMyBrain/TrainMyBrain";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import { useEffect, useState } from "react";
import Axios from "axios";
import TermsAndConditions from "./components/TermsAndConditions/TermsAndConditions";
import domain from "./util/domain";

Axios.defaults.withCredentials = true;

function App() {
  const [value, setValue] = useState<string>();
  const [status, setStatus] = useState<string>(
    "Checking server availability..."
  );
  useEffect(() => {
    const checkIfServerIsThere = async () => {
      try {
        setStatus(
          (await Axios.get(domain + "areyoualive")).data.answer === "yes"
            ? "good"
            : "bad" + Math.random()
        );
      } catch (err) {
        setStatus("bad" + Math.random());
      }
    };
    status !== "good" && setTimeout(() => checkIfServerIsThere(), 500);
  }, [status]);

  return status === "Checking server availability..." ? (
    <p>Checking server availability...</p>
  ) : status === "good" || process.env.REACT_APP_UI_FLAG === "yes" ? (
    <div style={{ backgroundColor: "#FFF6F2" }}>
      <div
        style={{
          height: "5%",
          width: "100%",
          position: "fixed",
          top: "0px",
        }}
      >
        <StatusBar />
      </div>
      <div
        style={{
          height: "100vh",
          width: "100%",
          overflow: "scroll",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-account" element={<MyAccount />} />
            <Route path="/my-brain" element={<MyBrain />} />
            <Route path="/train-my-brain" element={<TrainMyBrain />} />
            <Route path="/termsvf" element={<TermsAndConditions />} />
          </Routes>
        </Router>
      </div>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(value, newValue) => {
          setValue(newValue);
        }}
        sx={{
          backgroundColor: "#F5F5F5",
          height: "10%",
          position: "fixed",
          bottom: "0",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <BottomNavigationAction
          href="/train-my-brain"
          label="Train"
          icon={<FitnessCenterIcon />}
        />
        <BottomNavigationAction href="/" label="Home" icon={<HomeIcon />} />
        <BottomNavigationAction
          href="/my-brain"
          label="Brain"
          icon={<PsychologyOutlinedIcon />}
        />
      </BottomNavigation>
    </div>
  ) : (
    <p>Sorry, yoad make this message</p>
  );
}

export default App;
