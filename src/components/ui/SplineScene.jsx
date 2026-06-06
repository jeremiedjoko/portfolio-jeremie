import React, { Suspense, lazy } from "react";
const Spline = lazy(() => import("@splinetool/react-spline"));

export function SplineScene({ scene, className = "", style = {} }) {
  return (
    <Suspense
      fallback={
        <div style={{
          width: "100%", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: "50%",
            border: "2px solid rgba(255,255,255,0.1)",
            borderTopColor: "rgba(255,255,255,0.5)",
            animation: "spin 0.8s linear infinite",
          }} />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      }
    >
      <Spline scene={scene} className={className} style={{ width: "100%", height: "100%", ...style }} />
    </Suspense>
  );
}
