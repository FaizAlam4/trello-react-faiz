import BoardSection from "./Components/BoardSection";
import "./App.css";
import Header from "./Components/Header";
import Navigation from "./Components/Navigation";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <Navigation />
      <Header />
      <BoardSection />
    </>
  );
}

export default App;
