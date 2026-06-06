import React from "react";
import { LangProvider } from "./context/LangContext";
import Portfolio from "./Portfolio";
export default function App() {
  return <LangProvider><Portfolio /></LangProvider>;
}
