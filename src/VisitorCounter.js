import { useState, useEffect } from 'react';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

 // ...existing code...
useEffect(() => {
  if (typeof window === 'undefined') return;
  if (sessionStorage.getItem('visited') === '1') {
    // already incremented this session — just load stored value
    setCount(Number(localStorage.getItem('visits') || '0'));
    return;
  }
  const saved = localStorage.getItem('visits');
  const newCount = (saved ? parseInt(saved, 10) : 0) + 1;
  sessionStorage.setItem('visited', '1');
  setCount(newCount);
  localStorage.setItem('visits', String(newCount));
}, []);
// ...existing code...

  return (
    <>
      <style>{`
        .visitor-counter {
          position: fixed;
          right: 20px;
          bottom: 20px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9), rgba(240,246,255,0.95));
          color: #0f172a;
          padding: 10px 14px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(2,6,23,0.35);
          font-weight: 600;
          display: inline-flex;
          gap: 10px;
          align-items: center;
          backdrop-filter: blur(6px);
          transform-origin: center;
          animation: popIn 420ms cubic-bezier(.2,.9,.3,1) forwards, float 3.5s ease-in-out 420ms infinite;
          cursor: default;
          z-index: 9999;
          user-select: none;
        }

        .visitor-counter:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 14px 40px rgba(2,6,23,0.45);
        }

        .visitor-counter .eye {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          font-size: 16px;
          border-radius: 8px;
          background: linear-gradient(180deg, #fff, #f0f7ff);
          box-shadow: 0 4px 12px rgba(2,6,23,0.08) inset;
          animation: eyeBounce 1.8s ease-in-out infinite;
        }

        .visitor-counter .count {
          background: rgba(15,23,42,0.06);
          padding: 4px 8px;
          border-radius: 8px;
          margin-left: 4px;
          font-weight: 700;
        }

        @keyframes popIn {
          from { opacity: 0; transform: translateY(12px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes float {
          0%   { transform: translateY(0); }
          50%  { transform: translateY(-6px); }
          100% { transform: translateY(0); }
        }

        @keyframes eyeBounce {
          0% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
          100% { transform: translateY(0); }
        }

        @media (max-width: 480px) {
          .visitor-counter {
            right: 12px;
            bottom: 12px;
            padding: 8px 10px;
            gap: 8px;
          }
          .visitor-counter .eye { width: 24px; height: 24px; }
        }
      `}</style>

      <div className="visitor-counter" aria-live="polite">
        <span className="eye" role="img" aria-label="eyes">👀</span>
        <span>
          This page has been viewed <span className="count">{count}</span> times
        </span>
      </div>
    </>
  );
}