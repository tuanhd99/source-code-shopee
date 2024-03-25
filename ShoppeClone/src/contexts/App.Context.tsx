import React, { createContext, useState } from "react";
import { getFromLocalStorage } from "src/utils/function";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: any;
}
const InittialValue: IAppContext = {
  isAuthenticated: Boolean(getFromLocalStorage("access_token")),
  setIsAuthenticated: () => null
};
export const AppContext = createContext<IAppContext>(InittialValue);

function AppProvide({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(InittialValue.isAuthenticated);
  console.log("isAuthenticated,", isAuthenticated);

  return <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>{children}</AppContext.Provider>;
}

export default AppProvide;
