import React from "react";
import { Link, useLocation } from "react-router-dom";
import { PinIcon, PlusIcon, Settings } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  // Routes where the New Note button should not show
  const hideNewNoteBtnRoutes = ["/create", `/note/${location.pathname.split("/")[2]}`];

  const hideNewNoteBtn = hideNewNoteBtnRoutes.some((route) =>
    location.pathname.startsWith(route.replace(":id", ""))
  );

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg text-2xl h-16">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-2.5 hover:opacity-80 transition-all ml-4"
          >
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <PinIcon className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-lg font-bold font-serif">TidyNote</h1>
          </Link>

          {/* Buttons */}
          <div className="flex items-center gap-4 rounded-3xl">
            {!hideNewNoteBtn && (
              <Link to="/create" className="btn btn-sm gap-2 transition-colors">
                <PlusIcon className="w-4 h-4" />
                <span className="hidden sm:inline">New Note</span>
              </Link>
            )}
            <Link to="/settings" className="btn btn-sm gap-2 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
