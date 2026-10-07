import { forwardRef, useEffect, useState } from "react";

const Webcam = forwardRef(function WebCam(props, videoRef) {
  const [permissionError, setPermissionError] = useState(null);

  useEffect(() => {
    let stream;

    async function startCamera() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Webcam access error: ", error);

        setPermissionError(
          "Camera access was blocked. Please allow camera permissions and refresh.",
        );
      }
    }

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [videoRef]);

  if (permissionError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-red-500/20 bg-red-500/10 p-8 text-center">
        <div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 text-3xl">
            📷
          </div>

          <h3 className="mb-2 text-lg font-semibold text-red-400">
            Camera Access Required
          </h3>

          <p className="max-w-md text-sm leading-6 text-gray-400">
            {permissionError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gray-900 shadow-2xl shadow-black/30">
      {/* Camera Header */}
      <div className="absolute left-0 right-0 top-0 z-10 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-500/20">
            <span className="text-lg">📷</span>
          </div>

          <div>
            <p className="text-sm font-semibold text-white">Live Camera</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-400"></span>
              <span className="text-xs text-gray-300">Active</span>
            </div>
          </div>
        </div>

        <div className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs font-medium text-gray-300 backdrop-blur-md">
          AI Detection
        </div>
      </div>

      {/* Webcam */}
      <video
        ref={videoRef}
        className="aspect-video w-full object-cover"
        autoPlay
        playsInline
        muted
      />

      {/* Bottom Gradient */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
    </div>
  );
});

export default Webcam;
