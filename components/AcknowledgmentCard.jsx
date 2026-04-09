"use client";

import { useState } from "react";

export default function AcknowledgmentCard({ user, document }) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const handleAcknowledge = async () => {
    setLoading(true);
    setError(null);

    const metadata = {
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    try {
      const res = await fetch("/api/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          orgId: user.orgId,
          documentId: document.id,
          metadata,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to submit acknowledgment");
      }

      setDone(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="p-6 border border-green-200 bg-green-50 rounded-xl shadow-sm flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <div>
          <p className="font-semibold text-green-800">Acknowledgment Recorded</p>
          <p className="text-sm text-green-600">
            {document.title} — v{document.version}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 border border-slate-200 bg-white rounded-xl shadow-sm">
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-xl font-bold text-slate-800">{document.title}</h2>
        {document.version && (
          <span className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded-full">
            v{document.version}
          </span>
        )}
      </div>

      <p className="text-sm text-slate-600 mt-2 leading-relaxed">
        {document.content}
      </p>

      {error && (
        <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          ⚠ {error}
        </p>
      )}

      <button
        onClick={handleAcknowledge}
        disabled={loading}
        className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
      >
        {loading ? "Submitting…" : "Acknowledge & Proceed"}
      </button>
    </div>
  );
}
