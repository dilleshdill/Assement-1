export const mergeImages = (photo,signature)=>{

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = 300
  canvas.height = 300

  const img1 = new Image()
  const img2 = new Image()

  img1.src = photo
  img2.src = signature

  ctx.drawImage(img1,0,0)
  ctx.drawImage(img2,0,0)

  return canvas.toDataURL()
}