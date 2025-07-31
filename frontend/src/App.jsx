import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import NoteDetailPage from "./pages/NoteDetailPage";
import { useThemeStore } from "./store/useThemeStore";
import SettingsPage from "./pages/SettingsPage";
import Navbar from "./components/Navbar";

const App = () => {
  const theme  = useThemeStore((state) => state.theme);
  
  return (
    <div data-theme={theme} className="relative h-full w-full">
      <Navbar />
      <div className="pt-16">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
