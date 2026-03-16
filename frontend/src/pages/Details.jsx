import { useRef, useState } from "react"
import SignatureCanvas from "../components/SignatureCanvas"
import { mergeImages } from "../utils/mergeImage"
import { useNavigate } from "react-router-dom"

export default function Details() {

  const videoRef = useRef()
  const canvasRef = useRef()

  const [photo, setPhoto] = useState(null)

  const navigate = useNavigate()

  const startCamera = async () => {
    try {

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      })

      videoRef.current.srcObject = stream

    } catch {
      alert("Camera permission denied")
    }
  }

  const capture = () => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    ctx.drawImage(videoRef.current, 0, 0, 400, 400)

    const img = canvas.toDataURL()

    setPhoto(img)

    const stream = videoRef.current.srcObject
    stream.getTracks().forEach(track => track.stop())
  }

  const finish = (signature) => {

    localStorage.setItem("auditImage", signature)

    navigate("/analytics")

  }

  return (

    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">

      <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-6">

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Employee Identity Verification
        </h2>

        <div className="w-full flex flex-col lg:flex-row gap-8 lg:items-center lg:justify-center">
          <div className="flex flex-col items-center gap-4 w-full lg:w-1/2">
            <video
              ref={videoRef}
              autoPlay
              className="rounded-lg border shadow w-full max-w-sm"
            />

            <div className="flex w-full gap-4 mt-4">

              <button
                onClick={startCamera}
                className="flex-1 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-medium py-3 rounded-lg transition shadow-sm"
              >
                Start Camera
              </button>

              <button
                onClick={capture}
                className="flex-1 bg-green-600 hover:bg-green-700 cursor-pointer text-white font-medium py-3 rounded-lg transition shadow-sm"
              >
                Capture Photo
              </button>

            </div>

          </div>

          {photo && (
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center">

              <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                Sign to Confirm Identity
              </h3>

              <SignatureCanvas
                photo={photo}
                onFinish={finish}
              />

            </div>
          )}

        </div>

        <canvas
          ref={canvasRef}
          width="400"
          height="400"
          className="hidden"
        />

      </div>

    </div>

  )
}