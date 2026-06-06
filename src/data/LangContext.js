import React, { createContext, useContext, useState } from "react";
import { translations } from "./translations";

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = translations[lang];
  const toggle = () => setLang(l => l === "en" ? "fr" : "en");
  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);
