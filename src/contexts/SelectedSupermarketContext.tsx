import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedSupermarketContextType {
  selectedSupermarketId: string | null;
  setSelectedSupermarketId: (id: string | null) => void;
  selectedSupermarketName: string | null;
  setSelectedSupermarketName: (name: string | null) => void;
}

const SelectedSupermarketContext = createContext<
  SelectedSupermarketContextType | undefined
>(undefined);

export function SelectedSupermarketProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedSupermarketId, setSelectedSupermarketId] = useState<
    string | null
  >(null);
  const [selectedSupermarketName, setSelectedSupermarketName] = useState<
    string | null
  >(null);

  return (
    <SelectedSupermarketContext.Provider
      value={{
        selectedSupermarketId,
        setSelectedSupermarketId,
        selectedSupermarketName,
        setSelectedSupermarketName,
      }}
    >
      {children}
    </SelectedSupermarketContext.Provider>
  );
}

export function useSelectedSupermarket() {
  const context = useContext(SelectedSupermarketContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedSupermarket must be used within a SelectedSupermarketProvider",
    );
  }
  return context;
}
