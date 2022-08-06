import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DiseasePrediction from "./DiseasePrediction/DiseasePrediction";
import Hospital from "./Hospitals/Hospital";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import DiabetesSymptomsInput from "./DiabetesInput/DiabetesInput";
import HeartInput from "./HeartInput/HeartInput";
import DiseaseSymptomsInput from "./DiseaseSymptomsInput/DiseaseSymptomsInput";
import India from "./India/India";
import US from "./US/US";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            exact
            path="/diseasePrediction"
            element={<DiseasePrediction />}
          />
          <Route exact path="/hospital" element={<Hospital />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route
            exact
            path="/diabetesInput"
            element={<DiabetesSymptomsInput />}
          />
          <Route
            exact
            path="/diseaseInput"
            element={<DiseaseSymptomsInput />}
          />
          <Route exact path="/heartInput" element={<HeartInput />} />
          <Route exact path="/india" element={<India />} />
          <Route exact path="/us" element={<US />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
