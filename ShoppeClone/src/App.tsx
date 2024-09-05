import { useContext, useEffect } from "react";
import "./App.css";
import useRounterElement from "./router/useRounter";
import { localStorageEventarget } from "./utils/function";
import { AppContext } from "./contexts/App.Context";

function App() {
  const routerElement = useRounterElement();
  const { reset } = useContext(AppContext);

  useEffect(() => {
    localStorageEventarget.addEventListener("clear", reset);

    return () => {
      localStorageEventarget.removeEventListener("clear", reset);
    };
  }, [reset]);

  return <div className='h-full w-full'>{routerElement}</div>;
}

export default App;
