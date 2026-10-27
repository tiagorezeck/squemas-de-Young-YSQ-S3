import React, { useState } from 'react';
import { SchemaScoreResult } from '../types/ysq';

interface RadarChartProps {
  schemas: SchemaScoreResult[];
  size?: number;
}

export const RadarChart: React.FC<RadarChartProps> = ({ schemas, size = 520 }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const center = size / 2;
  const radius = size * 0.38;
  const total = schemas.length;
  const angleStep = (Math.PI * 2) / total;

  // Concentric levels 1 to 6
  const levels = [1, 2, 3, 4, 5, 6];

  // Helper to calculate (x, y) for an index and value (1-6)
  const getCoordinates = (index: number, value: number) => {
    // Map value 1..6 to distance 0..radius
    const normalizedDist = Math.max(0, (value - 1) / 5) * radius;
    const angle = index * angleStep - Math.PI / 2;
    return {
      x: center + normalizedDist * Math.cos(angle),
      y: center + normalizedDist * Math.sin(angle),
    };
  };

  // Helper for polygon points
  const polygonPoints = schemas
    .map((s, idx) => {
      const { x, y } = getCoordinates(idx, s.averageScore);
      return `${x},${y}`;
    })
    .join(' ');

  // Clinical threshold boundary (score = 4.0)
  const thresholdPoints = schemas
    .map((_, idx) => {
      const { x, y } = getCoordinates(idx, 4.0);
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <div className="relative flex flex-col items-center justify-center p-2 select-none">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-[540px] overflow-visible"
      >
        <defs>
          <radialGradient id="radarGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#ec4899" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
          </radialGradient>
          <linearGradient id="polygonStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4f46e5" />
            <stop offset="50%" stopColor="#9333ea" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>

        {/* Concentric grid webs */}
        {levels.map((lvl) => {
          const webPoints = schemas
            .map((_, idx) => {
              const { x, y } = getCoordinates(idx, lvl);
              return `${x},${y}`;
            })
            .join(' ');

          const isThreshold = lvl === 4;

          return (
            <g key={lvl}>
              <polygon
                points={webPoints}
                fill={lvl % 2 === 0 ? 'rgba(241, 245, 249, 0.5)' : 'transparent'}
                stroke={isThreshold ? '#fb7185' : '#e2e8f0'}
                strokeWidth={isThreshold ? 1.5 : 1}
                strokeDasharray={isThreshold ? '4 3' : undefined}
              />
              <text
                x={center + 6}
                y={center - ((lvl - 1) / 5) * radius + 4}
                className="text-[10px] font-semibold fill-slate-400 select-none"
              >
                {lvl}
              </text>
            </g>
          );
        })}

        {/* Axes lines */}
        {schemas.map((s, idx) => {
          const { x, y } = getCoordinates(idx, 6);
          const isHovered = hoveredIndex === idx;
          return (
            <line
              key={s.schema.id}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke={isHovered ? '#6366f1' : '#cbd5e1'}
              strokeWidth={isHovered ? 2 : 1}
              className="transition-colors duration-200"
            />
          );
        })}

        {/* Clinical threshold polygon (Score = 4.0) */}
        <polygon
          points={thresholdPoints}
          fill="none"
          stroke="#f43f5e"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.6"
        />

        {/* User score polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarGlow)"
          stroke="url(#polygonStroke)"
          strokeWidth="2.5"
          className="transition-all duration-300 drop-shadow-md"
        />

        {/* Schema points and interactive labels */}
        {schemas.map((s, idx) => {
          const { x, y } = getCoordinates(idx, s.averageScore);
          const isHovered = hoveredIndex === idx;
          const isActive = s.severity === 'high' || s.severity === 'very_high';

          // Label coordinates placed slightly outside outer radius
          const labelDist = radius + 24;
          const angle = idx * angleStep - Math.PI / 2;
          const lx = center + labelDist * Math.cos(angle);
          const ly = center + labelDist * Math.sin(angle);

          return (
            <g key={s.schema.id} className="cursor-pointer">
              {/* Point circle */}
              <circle
                cx={x}
                cy={y}
                r={isHovered ? 7 : isActive ? 5 : 4}
                fill={
                  isActive
                    ? '#e11d48'
                    : s.severity === 'moderate'
                    ? '#d97706'
                    : '#059669'
                }
                stroke="#ffffff"
                strokeWidth="2"
                className="transition-transform duration-200 drop-shadow"
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />

              {/* Schema Code Label */}
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="central"
                className={`text-[11px] font-bold transition-all duration-150 ${
                  isHovered
                    ? 'fill-indigo-600 font-extrabold text-[13px]'
                    : isActive
                    ? 'fill-rose-700 font-bold'
                    : 'fill-slate-600 font-medium'
                }`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {s.schema.code}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Threshold indicator legend */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-xs text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
          <span>Ativado (Média &ge; 4.0)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
          <span>Latente (2.4 - 3.9)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          <span>Silencioso (&lt; 2.4)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 border-t-2 border-dashed border-rose-400 inline-block"></span>
          <span>Linha de Ativação Clínica</span>
        </div>
      </div>

      {/* Tooltip detail when hovered */}
      {hoveredIndex !== null && (
        <div className="mt-3 p-2.5 bg-slate-900 text-white rounded-lg shadow-xl text-center max-w-sm border border-slate-700 animate-fadeIn">
          <p className="font-bold text-sm text-indigo-300">
            [{schemas[hoveredIndex].schema.code}] {schemas[hoveredIndex].schema.name}
          </p>
          <p className="text-xs text-slate-300 mt-0.5">
            Média: <span className="font-bold text-white">{schemas[hoveredIndex].averageScore.toFixed(1)}</span> / 6.0
            {' • '}
            Status: <span className="font-semibold text-rose-300">{schemas[hoveredIndex].severityLabel}</span>
          </p>
          <p className="text-[11px] text-slate-400 mt-1 italic">
            &ldquo;{schemas[hoveredIndex].schema.shortDescription}&rdquo;
          </p>
        </div>
      )}
    </div>
  );
};
