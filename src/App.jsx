import BoardSection from "./Components/BoardSection";
import "./App.css";
import Header from "./Components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Components/Navigation";
import ListDisplay from "./Components/ListDisplay";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Navigation />

        <Routes>
          <Route
            path={"/"}
            element={
              <>
                <Header />
                <BoardSection />
              </>
            }
          />

          <Route path={"/:id"} element={<ListDisplay />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
