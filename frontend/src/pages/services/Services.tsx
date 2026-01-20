import { useEffect, useState } from "react";
import api from "@/lib/axios";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    api.get("/services").then(res => setServices(res.data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {services.map((s: any) => (
        <div key={s._id} className="border p-3 rounded">
          <img src={s.images[0]} className="h-40 w-full object-cover" />
          <h3>{s.title}</h3>
          <p>{s.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Services;
