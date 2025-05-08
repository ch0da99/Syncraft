import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import PlanningBoard from "./PlanningBoard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PlanningBoard />
  </StrictMode>
);
