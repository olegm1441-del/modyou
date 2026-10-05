import React from "react";
import { createRoot } from "react-dom/client";
import Site from "./components/site";
import "./app/globals.css";
createRoot(document.getElementById("root")!).render(<React.StrictMode><Site initialPath={window.location.pathname}/></React.StrictMode>);
