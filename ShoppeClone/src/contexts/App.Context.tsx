import React, { createContext, useState } from "react";
import { ExtendedPurchase } from "src/pages/Cart/Cart";
import { getFromLocalStorage } from "src/utils/function";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  // profile: User | null;
  // setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchase: ExtendedPurchase[];
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>;
  reset: () => void;
}
const InittialValue: IAppContext = {
  isAuthenticated: Boolean(getFromLocalStorage("access_token")),
  setIsAuthenticated: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null
};
export const AppContext = createContext<IAppContext>(InittialValue);

function AppProvide({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(InittialValue.isAuthenticated);
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(InittialValue.extendedPurchase);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchase([]);
  };

  return (
    <AppContext.Provider value={{ isAuthenticated, setIsAuthenticated, extendedPurchase, setExtendedPurchase, reset }}>
      {children}
    </AppContext.Provider>
  );
}

export default AppProvide;
