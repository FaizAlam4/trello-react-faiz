import BoardSection from "./Components/BoardSection";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import ListDisplay from "./Components/ListDisplay";
import CardView from "./Components/CardView";

function App() {
  return (
    <>
      <Router>
        <Navigation />

        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <BoardSection />
              </>
            }
          />

          <Route path={"/:id"} element={<ListDisplay />} />
          <Route path={"/card/:id2"} element={<CardView />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
