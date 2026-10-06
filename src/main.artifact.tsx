import { createRoot } from "react-dom/client";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import "./index.css";
import { dismissSplash } from "./lib/splash";

document.documentElement.lang ||= "en";

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <Routes>
      <Route path="*" element={<Index />} />
    </Routes>
  </MemoryRouter>,
);

dismissSplash();
