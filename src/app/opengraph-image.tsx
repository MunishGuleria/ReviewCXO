import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Reviews CXO — AI Enterprise Sales Research Lab";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          backgroundColor: "#090d16",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          color: "#f8fafc",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background glow */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            right: "-150px",
            width: "600px",
            height: "600px",
            display: "flex",
            background: "radial-gradient(circle, rgba(56,189,248,0.25) 0%, rgba(9,13,22,0) 70%)",
          }}
        />

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "48px",
              height: "48px",
              borderRadius: "12px",
              backgroundColor: "#111827",
              color: "#ffffff",
              fontSize: "20px",
              fontWeight: 900,
              fontFamily: "monospace",
            }}
          >
            CXO
          </div>
          <div style={{ display: "flex", alignItems: "center", fontSize: "28px", fontWeight: 900, letterSpacing: "-0.5px" }}>
            <span>Reviews</span>
            <span style={{ color: "#38bdf8" }}> CXO</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "12px",
              padding: "4px 12px",
              borderRadius: "999px",
              backgroundColor: "rgba(56,189,248,0.1)",
              border: "1px solid rgba(56,189,248,0.3)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#38bdf8",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Research Lab
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", maxWidth: "950px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "54px",
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: "-1.5px",
            }}
          >
            Architecture Analysis & Benchmarks on Enterprise AI Sales
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              color: "#94a3b8",
              lineHeight: 1.4,
            }}
          >
            Evaluating CRM, ERP-grounded autonomous agents, and revenue intelligence via the 12-dimension ASCS framework.
          </div>
        </div>

        {/* Bottom telemetry stats */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "48px",
            paddingTop: "32px",
            borderTop: "1px solid #1e293b",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", fontFamily: "monospace" }}>5</span>
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Platforms Evaluated</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", fontFamily: "monospace" }}>12 Dimensions</span>
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>ASCS Framework</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", fontFamily: "monospace" }}>Reproducible</span>
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Lab Benchmarks</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", fontFamily: "monospace" }}>100%</span>
            <span style={{ fontSize: "14px", color: "#64748b", fontWeight: 600 }}>Editorial Transparency</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
