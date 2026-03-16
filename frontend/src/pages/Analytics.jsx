import { useEffect, useState } from "react"
import SalaryChart from "../components/SalaryChart"
import { MapContainer, TileLayer, Marker } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
})

export default function Analytics() {

  const image = localStorage.getItem("auditImage")

  const [data, setData] = useState([])

  const cityCoords = {
    "Edinburgh": [55.9533, -3.1883],
    "Tokyo": [35.6762, 139.6503],
    "San Francisco": [37.7749, -122.4194],
    "London": [51.5074, -0.1278],
    "New York": [40.7128, -74.006],
    "Singapore": [1.3521, 103.8198],
    "Sidney": [-33.8688, 151.2093]
  }

  useEffect(() => {

    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "test",
        password: "123456"
      })
    })
      .then(res => res.json())
      .then(res => {

        const rows = res.TABLE_DATA.data

        const citySalary = {}

        rows.forEach(row => {

          const city = row[2]
          const salary = Number(row[5].replace(/[$,]/g, ""))

          if (!citySalary[city]) {
            citySalary[city] = 0
          }

          citySalary[city] += salary

        })

        const formatted = Object.entries(citySalary).map(([city, salary]) => ({
          city,
          salary,
          coords: cityCoords[city]
        }))

        setData(formatted)

      })

  }, [])

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto space-y-8">

        <h1 className="text-3xl font-bold text-gray-800">
          Employee Analytics Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-lg font-semibold mb-4">
              Audit Image
            </h2>

            {image ? (
              <img
                src={image}
                className="w-full max-w-xs rounded border shadow"
              />
            ) : (
              <p className="text-gray-400">
                No verification image found
              </p>
            )}

          </div>

          <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-lg font-semibold mb-4">
              Salary Distribution by City
            </h2>

            <SalaryChart data={data} />

          </div>

        </div>

        <div className="bg-white shadow rounded-xl p-6">

          <h2 className="text-lg font-semibold mb-4">
            Global Employee Locations
          </h2>

          <div className="w-full h-[450px] rounded overflow-hidden">

            <MapContainer
              center={[20, 0]}
              zoom={2}
              className="h-full w-full"
            >

              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {data.map((c, i) => (
                c.coords && <Marker key={i} position={c.coords} />
              ))}

            </MapContainer>

          </div>

        </div>

      </div>

    </div>

  )
}