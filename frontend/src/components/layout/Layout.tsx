import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((s) => !s);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile overlay — only when sidebar open on mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 lg:hidden"
          style={{ zIndex: 9998 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar — smooth slide on all screens */}
      <div
        className={`fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ zIndex: 9999 }}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Main content — shifts with sidebar on desktop */}
      <div
        className={`flex-1 flex flex-col overflow-hidden min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:ml-64" : "lg:ml-0"
        }`}
        style={{ position: "relative", zIndex: 1 }}
      >
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 bg-[#0a0f1e]">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
