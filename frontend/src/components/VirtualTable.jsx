import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function VirtualTable({ data }) {

  const navigate = useNavigate()

  const rowHeight = 70
  const containerHeight = 520

  const [scrollTop, setScrollTop] = useState(0)

  const visibleCount = Math.ceil(containerHeight / rowHeight)

  const startIndex = Math.floor(scrollTop / rowHeight)
  const endIndex = startIndex + visibleCount + 5

  const visibleRows = data.slice(startIndex, endIndex)

  return (

    <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-xl border ">
      
      <div className="grid grid-cols-3 rounded-tr-xl rounded-tl-xl bg-gray-100 text-gray-700 font-semibold text-sm px-6 py-4 border-b sticky top-0 z-10">
        <div>Name</div>
        <div>Position</div>
        <div className="text-right">City</div>
      </div>

      <div
        className="overflow-y-auto"
        style={{ height: containerHeight }}
        onScroll={(e) => setScrollTop(e.target.scrollTop)}
      >

        <div
          style={{
            height: data.length * rowHeight,
            position: "relative"
          }}
        >

          {visibleRows.map((row, i) => {

            const index = startIndex + i

            return (

              <div
                key={index}
                onClick={() => navigate(`/details/${index}`)}
                className="absolute w-full grid grid-cols-3 px-6 items-center border-b cursor-pointer hover:bg-blue-50 transition"
                style={{
                  top: index * rowHeight,
                  height: rowHeight
                }}
              >


                <div className="font-semibold text-gray-800">
                  {row[0]}
                </div>

                <div className="text-gray-500 text-sm">
                  {row[1]}
                </div>

                <div className="text-right">
                  <span className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">
                    {row[2]}
                  </span>
                </div>

              </div>

            )

          })}

        </div>

      </div>

    </div>

  )
}