import React from "react";
import brushConfig from "@/features/dipak-hero/brush/enso-brush.config.json";

export default function BrushLabPage() {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
        backgroundColor: "#11110f",
        color: "#f4f1ea",
        minHeight: "100vh",
      }}
    >
      <header style={{ marginBottom: "2rem", borderBottom: "1px solid #333", paddingBottom: "1rem" }}>
        <h1 style={{ margin: "0 0 0.5rem 0", fontSize: "1.8rem" }}>Dipak Vishwakarma — Natural Media Brush Lab</h1>
        <p style={{ margin: 0, color: "#888", fontSize: "0.9rem" }}>
          Development-only authoring engine and visual verification suite for pressure-aware Ensō calligraphy.
        </p>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }}>
        {/* Left: Interactive Preview */}
        <section style={{ background: "#1a1a18", padding: "1.5rem", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>Asset Preview (Ivory Canvas)</h2>
          <div
            style={{
              width: "100%",
              aspectRatio: "1",
              backgroundColor: "#f4f1ea",
              borderRadius: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero/enso-brush-master.webp"
              alt="Ensō Master Brush Asset"
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </section>

        {/* Right: Authoring Parameters */}
        <section style={{ background: "#1a1a18", padding: "1.5rem", borderRadius: "8px" }}>
          <h2 style={{ fontSize: "1.2rem", marginTop: 0 }}>Deterministic Authoring Parameters</h2>
          <pre
            style={{
              background: "#0d0d0c",
              padding: "1rem",
              borderRadius: "4px",
              overflowX: "auto",
              fontSize: "0.85rem",
              lineHeight: 1.45,
              color: "#d8aa5a",
            }}
          >
            {JSON.stringify(brushConfig, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}
