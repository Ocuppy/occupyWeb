import React, { createContext, useState, ReactNode, FC } from "react";

interface DashboardMenuVisibilityContextProps {
  isVisible: boolean;
  toggleVisibility: () => void;
}

export const DashboardMenuVisibilityContext = createContext<
  DashboardMenuVisibilityContextProps | undefined
>(undefined);

interface DashboardMenuVisibilityProviderProps {
  children: ReactNode;
}

export const DashboardMenuVisibilityProvider: FC<
  DashboardMenuVisibilityProviderProps
> = ({ children }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <DashboardMenuVisibilityContext.Provider
      value={{ isVisible, toggleVisibility }}
    >
      {children}
    </DashboardMenuVisibilityContext.Provider>
  );
};
