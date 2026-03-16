import { useRef, useEffect } from "react"

export default function SignatureCanvas({ photo, onFinish }) {

  const canvasRef = useRef()
  const drawing = useRef(false)

  useEffect(() => {

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const img = new Image()
    img.src = photo

    img.onload = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }

  }, [photo])

  const startDraw = (e) => {
    const ctx = canvasRef.current.getContext("2d")
    drawing.current = true
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  const draw = (e) => {

    if (!drawing.current) return

    const ctx = canvasRef.current.getContext("2d")

    ctx.lineWidth = 2
    ctx.lineCap = "round"
    ctx.strokeStyle = "black"

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.stroke()

  }

  const stopDraw = () => {
    drawing.current = false
  }

  const finish = () => {

    const finalImage = canvasRef.current.toDataURL("image/png")

    onFinish(finalImage)

  }

  return (

    <div className="flex flex-col items-center">

      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="border rounded shadow"
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
        onMouseLeave={stopDraw}
      />

      <button
        onClick={finish}
        className="bg-purple-600 hover:bg-purple-700 cursor-pointer text-white px-5 py-2 mt-4 rounded-lg"
      >
        Submit Signature
      </button>

    </div>

  )
}