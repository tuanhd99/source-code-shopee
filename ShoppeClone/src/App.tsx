import './App.css';
import useRounterElement from './router/useRounter';

function App() {
  const routerElement = useRounterElement();
  return <div>{routerElement}</div>;
}

export default App;
