"use client";

import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";
import Footer from "../common/Footer";
import ChipBackground from "../common/ChipBackground";
import "./Layouts.css";

export default function DefaultLayout({ children }) {
  return (
    <div className="default-layout">
      <ChipBackground />
      <Navbar />
      <main className="main">
        <div className="container">
          <div className="default-layout-grid">
            <div className="main-content">{children}</div>
            <Sidebar />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
