import React, { createContext, useContext, useState } from "react";
export const LangContext = createContext();
export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const toggleLang = () => setLang(l => l === "en" ? "fr" : "en");
  return (
    <LangContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}
export const useLang = () => useContext(LangContext);
