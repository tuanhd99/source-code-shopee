import "./App.css";
import useRounterElement from "./router/useRounter";

function App() {
  const routerElement = useRounterElement();
  return <div className='h-full w-full'>{routerElement}</div>;
}

export default App;
