export default function SalaryChart({ data }) {

  const chartHeight = 260
  const paddingTop = 40
  const paddingBottom = 80

  const barWidth = 40
  const gap = 20

  if (!data || data.length === 0) {
    return <p className="text-gray-400">No data available</p>
  }

  const maxSalary = Math.max(...data.map(d => d.salary))

  const width = data.length * (barWidth + gap) + 80
  const height = chartHeight + paddingTop + paddingBottom

  const maxBarArea = chartHeight * 0.6

  return (

    <div className="w-full overflow-x-auto">

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto min-w-[300px]"
      >

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((p, i) => {

          const y = chartHeight - chartHeight * p + paddingTop

          return (
            <line
              key={i}
              x1="40"
              x2={width - 20}
              y1={y}
              y2={y}
              stroke="#e5e7eb"
              strokeDasharray="4"
            />
          )

        })}

        {data.map((d, i) => {

          const barHeight = (d.salary / maxSalary) * maxBarArea

          const x = i * (barWidth + gap) + 50
          const y = chartHeight - barHeight + paddingTop

          return (

            <g key={i}>

              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="6"
                fill="#2563eb"
                className="hover:fill-blue-500 transition"
              />

              {/* Salary label */}
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
                fontWeight="600"
              >
                ${(d.salary / 1000).toFixed(0)}k
              </text>

              {/* City label */}
              <text
                x={x + barWidth / 2}
                y={chartHeight + paddingTop + 25}
                textAnchor="middle"
                fontSize="11"
                fill="#6b7280"
                transform={`rotate(-40 ${x + barWidth / 2} ${chartHeight + paddingTop + 25})`}
              >
                {d.city.length > 10 ? d.city.slice(0, 9) + "…" : d.city}
              </text>

            </g>

          )

        })}

      </svg>

    </div>

  )
}