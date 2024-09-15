import React, { createContext, useState } from "react";
import { User } from "src/auth/models";
import { ExtendedPurchase } from "src/pages/Cart/Cart";
import { getFromLocalStorage } from "src/utils/function";

interface IAppContext {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  profile: User | null;
  setProfile: React.Dispatch<React.SetStateAction<User | null>>;
  extendedPurchase: ExtendedPurchase[];
  setExtendedPurchase: React.Dispatch<React.SetStateAction<ExtendedPurchase[]>>;
  reset: () => void;
}
const InittialValue: IAppContext = {
  isAuthenticated: Boolean(getFromLocalStorage("access_token")),
  setIsAuthenticated: () => null,
  extendedPurchase: [],
  setExtendedPurchase: () => null,
  reset: () => null,
  profile: getFromLocalStorage("user"),
  setProfile: () => null
};
export const AppContext = createContext<IAppContext>(InittialValue);

function AppProvide({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(InittialValue.isAuthenticated);
  const [extendedPurchase, setExtendedPurchase] = useState<ExtendedPurchase[]>(InittialValue.extendedPurchase);
  const [profile, setProfile] = useState<User | null>(InittialValue.profile);

  const reset = () => {
    setIsAuthenticated(false);
    setExtendedPurchase([]);
    setProfile(null);
  };

  return (
    <AppContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, extendedPurchase, setExtendedPurchase, reset, profile, setProfile }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppProvide;
