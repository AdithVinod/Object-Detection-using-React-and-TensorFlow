import { useEffect, useRef, useState } from "react";
import WebCam from "./components/WebCam";
import useObjectDetectionModel from "./hooks/useObjectDetectionModel";
import DetectionList from "./components/DetectionList";

export default function App() {
  const [detections, setDetections] = useState([]);
  const { model } = useObjectDetectionModel();
  const videoRef = useRef(null);
  const animationFrameId = useRef(null);

  useEffect(() => {
    if (!model) return;

    let isActive = true;

    async function detectFrame() {
      if (!isActive) return;

      const video = videoRef.current;

      if (video && video.readyState >= 2) {
        try {
          const predictions = await model.detect(video);

          if (isActive) {
            setDetections(predictions);
          }
        } catch (error) {
          console.error("Detection error: ", error);
        }
      }

      animationFrameId.current = requestAnimationFrame(detectFrame);
    }

    detectFrame();

    return () => {
      isActive = false;

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [model]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-slate-950 to-blue-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <header className="mb-8 text-center">
          {/* AI Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400"></span>
            AI Powered Object Detection
          </div>

          {/* Title */}
          <h1 className="bg-gradient-to-r from-white via-blue-100 to-blue-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Object Detector
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-gray-400 sm:text-base">
            Detect objects in real-time using your webcam with TensorFlow.js and
            COCO-SSD.
          </p>
        </header>

        {/* ================= STATUS ================= */}
        <div className="mb-6 flex justify-center">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3 shadow-xl backdrop-blur-xl">
            <div
              className={`h-3 w-3 rounded-full ${
                model
                  ? "animate-pulse bg-green-400 shadow-lg shadow-green-400/50"
                  : "animate-pulse bg-yellow-400 shadow-lg shadow-yellow-400/50"
              }`}
            ></div>

            <span className="text-sm font-medium text-gray-300">
              {model ? "AI Model Ready" : "Loading AI Model..."}
            </span>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}
        <main className="grid gap-6 lg:grid-cols-3">
          {/* ================= CAMERA SECTION ================= */}
          <section className="lg:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-2 shadow-2xl shadow-black/30 backdrop-blur-xl">
              <WebCam ref={videoRef} />
            </div>
          </section>

          {/* ================= DETECTION PANEL ================= */}
          <section className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-5 shadow-2xl shadow-black/30 backdrop-blur-xl">
            {/* Panel Header */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">
                  Detected Objects
                </h2>

                <p className="mt-1 text-xs text-gray-500">
                  Real-time AI analysis
                </p>
              </div>

              {/* Detection Count */}
              <div className="flex h-11 min-w-11 items-center justify-center rounded-xl bg-blue-500/10 px-3 text-sm font-bold text-blue-400">
                {detections.length}
              </div>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

            {/* Detection List */}
            <div className="flex-1 overflow-y-auto">
              <DetectionList detections={detections} />
            </div>
          </section>
        </main>

        {/* ================= FOOTER INFO ================= */}
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Technology
            </p>

            <p className="mt-1 font-semibold text-gray-200">TensorFlow.js</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Model
            </p>

            <p className="mt-1 font-semibold text-gray-200">COCO-SSD</p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center backdrop-blur-xl">
            <p className="text-xs uppercase tracking-wider text-gray-500">
              Detection
            </p>

            <p className="mt-1 font-semibold text-green-400">Real-Time</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-600">
          AI Object Detection • Built with React & TensorFlow.js
        </footer>
      </div>
    </div>
  );
}
