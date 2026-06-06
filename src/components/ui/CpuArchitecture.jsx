import React from "react";

export function CpuArchitecture({ width = "100%", height = "100%", text = "CPU" }) {
  return (
    <>
      <style>{`
        .cpu-architecture { offset-anchor: 10px 0px; animation: cpu-anim-path; animation-iteration-count: infinite; animation-timing-function: cubic-bezier(0.75,-0.01,0,0.99); }
        .cpu-line-1 { offset-path: path("M 10 20 h 79.5 q 5 0 5 5 v 30"); animation-duration:5s; animation-delay:1s; }
        .cpu-line-2 { offset-path: path("M 180 10 h -69.7 q -5 0 -5 5 v 40"); animation-delay:6s; animation-duration:2s; }
        .cpu-line-3 { offset-path: path("M 130 20 v 21.8 q 0 5 -5 5 h -25"); animation-delay:4s; animation-duration:6s; }
        .cpu-line-4 { offset-path: path("M 170 80 v -21.8 q 0 -5 -5 -5 h -65"); animation-delay:3s; animation-duration:3s; }
        .cpu-line-5 { offset-path: path("M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -35"); animation-delay:9s; animation-duration:4s; }
        .cpu-line-6 { offset-path: path("M 94.8 95 v -46"); animation-delay:3s; animation-duration:7s; }
        .cpu-line-7 { offset-path: path("M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 28"); animation-delay:4s; animation-duration:4s; }
        .cpu-line-8 { offset-path: path("M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 35"); animation-delay:3s; animation-duration:3s; }
        @keyframes cpu-anim-path { 0%{offset-distance:0%} 100%{offset-distance:100%} }
      `}</style>
      <svg width={width} height={height} viewBox="0 0 200 100" style={{ color: "rgba(255,255,255,0.15)" }}>
        <g stroke="currentColor" fill="none" strokeWidth="0.3" markerStart="url(#cpu-circle-marker)">
          <path strokeDasharray="100 100" pathLength="100" d="M 10 20 h 79.5 q 5 0 5 5 v 30"/>
          <path strokeDasharray="100 100" pathLength="100" d="M 180 10 h -69.7 q -5 0 -5 5 v 30"/>
          <path d="M 130 20 v 21.8 q 0 5 -5 5 h -10"/>
          <path d="M 170 80 v -21.8 q 0 -5 -5 -5 h -50"/>
          <path strokeDasharray="100 100" pathLength="100" d="M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20"/>
          <path d="M 94.8 95 v -36"/>
          <path d="M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14"/>
          <path d="M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20"/>
          <animate attributeName="stroke-dashoffset" from="100" to="0" dur="1s" fill="freeze" calcMode="spline" keySplines="0.25,0.1,0.5,1" keyTimes="0; 1"/>
        </g>
        {[
          { cls:"cpu-line-1", grad:"url(#cpu-blue-grad)",    mask:"url(#cpu-mask-1)" },
          { cls:"cpu-line-2", grad:"url(#cpu-yellow-grad)",  mask:"url(#cpu-mask-2)" },
          { cls:"cpu-line-3", grad:"url(#cpu-pinkish-grad)", mask:"url(#cpu-mask-3)" },
          { cls:"cpu-line-4", grad:"url(#cpu-white-grad)",   mask:"url(#cpu-mask-4)" },
          { cls:"cpu-line-5", grad:"url(#cpu-green-grad)",   mask:"url(#cpu-mask-5)" },
          { cls:"cpu-line-6", grad:"url(#cpu-orange-grad)",  mask:"url(#cpu-mask-6)" },
          { cls:"cpu-line-7", grad:"url(#cpu-cyan-grad)",    mask:"url(#cpu-mask-7)" },
          { cls:"cpu-line-8", grad:"url(#cpu-rose-grad)",    mask:"url(#cpu-mask-8)" },
        ].map(({ cls, grad, mask }) => (
          <g key={cls} mask={mask}>
            <circle className={`cpu-architecture ${cls}`} cx="0" cy="0" r="8" fill={grad}/>
          </g>
        ))}
        <g>
          <g fill="url(#cpu-connection-gradient)">
            <rect x="93" y="37" width="2.5" height="5" rx="0.7"/>
            <rect x="104" y="37" width="2.5" height="5" rx="0.7"/>
            <rect x="116.3" y="44" width="2.5" height="5" rx="0.7" transform="rotate(90 116.25 45.5)"/>
            <rect x="104" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)"/>
            <rect x="114.5" y="16" width="2.5" height="5" rx="0.7" transform="rotate(180 105.25 39.5)"/>
            <rect x="80" y="-13.6" width="2.5" height="5" rx="0.7" transform="rotate(270 115.25 19.5)"/>
          </g>
          <rect x="85" y="40" width="30" height="20" rx="2" fill="#181818" filter="url(#cpu-light-shadow)"/>
          <text x="92" y="52.5" fontSize="7" fill="url(#cpu-text-gradient)" fontWeight="600" letterSpacing="0.05em">{text}</text>
        </g>
        <defs>
          {[1,2,3,4,5,6,7,8].map(i => {
            const paths = [
              "M 10 20 h 79.5 q 5 0 5 5 v 24",
              "M 180 10 h -69.7 q -5 0 -5 5 v 24",
              "M 130 20 v 21.8 q 0 5 -5 5 h -10",
              "M 170 80 v -21.8 q 0 -5 -5 -5 h -50",
              "M 135 65 h 15 q 5 0 5 5 v 10 q 0 5 -5 5 h -39.8 q -5 0 -5 -5 v -20",
              "M 94.8 95 v -36",
              "M 88 88 v -15 q 0 -5 -5 -5 h -10 q -5 0 -5 -5 v -5 q 0 -5 5 -5 h 14",
              "M 30 30 h 25 q 5 0 5 5 v 6.5 q 0 5 5 5 h 20",
            ];
            return <mask key={i} id={`cpu-mask-${i}`}><path d={paths[i-1]} strokeWidth="0.5" stroke="white"/></mask>;
          })}
          {[
            ["cpu-blue-grad",    "#00E8ED","#0088FF"],
            ["cpu-yellow-grad",  "#FFD800","#FFD800"],
            ["cpu-pinkish-grad", "#830CD1","#FF008B"],
            ["cpu-white-grad",   "white","white"],
            ["cpu-green-grad",   "#22c55e","#22c55e"],
            ["cpu-orange-grad",  "#f97316","#f97316"],
            ["cpu-cyan-grad",    "#06b6d4","#06b6d4"],
            ["cpu-rose-grad",    "#f43f5e","#f43f5e"],
          ].map(([id, c1, c2]) => (
            <radialGradient key={id} id={id} fx="1">
              <stop offset="0%" stopColor={c1}/>
              <stop offset="50%" stopColor={c2}/>
              <stop offset="100%" stopColor="transparent"/>
            </radialGradient>
          ))}
          <filter id="cpu-light-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="1.5" dy="1.5" stdDeviation="1" floodColor="black" floodOpacity="0.1"/>
          </filter>
          <marker id="cpu-circle-marker" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="18" markerHeight="18">
            <circle cx="5" cy="5" r="2" fill="black" stroke="#232323" strokeWidth="0.5">
              <animate attributeName="r" values="0; 3; 2" dur="0.5s"/>
            </circle>
          </marker>
          <linearGradient id="cpu-connection-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4F4F4F"/>
            <stop offset="60%" stopColor="#121214"/>
          </linearGradient>
          <linearGradient id="cpu-text-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#666666"><animate attributeName="offset" values="-2;-1;0" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></stop>
            <stop offset="25%" stopColor="white"><animate attributeName="offset" values="-1;0;1" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></stop>
            <stop offset="50%" stopColor="#666666"><animate attributeName="offset" values="0;1;2" dur="5s" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.2 1;0.4 0 0.2 1"/></stop>
          </linearGradient>
        </defs>
      </svg>
    </>
  );
}
