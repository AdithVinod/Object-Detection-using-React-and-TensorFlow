import React from "react";

export default function DetectionList({ detections }) {
  if (!detections || detections.length === 0) {
    return (
      <div className="flex min-h-[180px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.03] p-6 text-center">
        <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500/10 text-2xl">
          🔍
        </div>

        <h3 className="mb-1 text-sm font-semibold text-gray-200">
          No objects detected
        </h3>

        <p className="text-xs text-gray-500">
          Objects detected by the AI will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {detections.map((item, index) => {
        const confidence = Math.round(item.score * 100);

        return (
          <div
            key={`${item.class}-${index}`}
            className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.06] hover:shadow-lg hover:shadow-blue-500/5"
          >
            {/* Object Information */}
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-lg">
                👁️
              </div>

              <div>
                <p className="font-semibold capitalize text-gray-100">
                  {item.class}
                </p>

                <p className="text-xs text-gray-500">Object #{index + 1}</p>
              </div>
            </div>

            {/* Confidence */}
            <div className="text-right">
              <span
                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  confidence >= 80
                    ? "bg-green-500/15 text-green-400"
                    : confidence >= 50
                      ? "bg-yellow-500/15 text-yellow-400"
                      : "bg-red-500/15 text-red-400"
                }`}
              >
                {confidence}%
              </span>

              <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-600">
                confidence
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
