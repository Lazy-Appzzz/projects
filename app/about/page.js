"use client";

import DefaultLayout from "@/components/layouts/DefaultLayout";

export default function About() {
  return (
    <DefaultLayout>
      <div
        className="page-container"
        style={{ maxWidth: "800px", margin: "0 auto", padding: "40px 20px" }}
      >
        <h1
          style={{
            marginBottom: "20px",
            borderLeft: "4px solid #667eea",
            paddingLeft: "15px",
          }}
        >
          About Next.js Stack Cards
        </h1>
        <p style={{ marginBottom: "20px" }}>
          This is a Next.js implementation of stack cards with responsive
          layouts and smooth animations.
        </p>
        <h2 style={{ marginBottom: "15px", marginTop: "30px" }}>Features:</h2>
        <ul style={{ marginLeft: "30px" }}>
          <li>✅ Responsive design for mobile and desktop</li>
          <li>✅ Smooth animations with Framer Motion</li>
          <li>✅ Sticky scroll effects</li>
          <li>✅ Intersection observer for lazy loading</li>
          <li>✅ CSS Grid layout system</li>
          <li>✅ Next.js App Router</li>
          <li>✅ Server-side rendering compatible</li>
        </ul>
      </div>
    </DefaultLayout>
  );
}
