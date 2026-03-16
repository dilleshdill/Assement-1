import { useEffect, useState } from "react";
import VirtualTable from "../components/VirtualTable";

export default function List() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://backend.jotish.in/backend_dev/gettabledata.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "test",
        password: "123456",
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("API Response:", res);
        console.log("Table Data:", res.TABLE_DATA.data);

        setData(res.TABLE_DATA.data || []);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="">
      <h2 className="pl-10 pb-1 text-2xl font-medium">Employee List</h2>

      <VirtualTable data={data} />
    </div>
  );
}
