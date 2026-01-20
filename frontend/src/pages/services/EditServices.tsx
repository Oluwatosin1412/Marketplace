import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/lib/axios";

const EditService = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>({});

  useEffect(() => {
    api.get(`/services/${id}`).then(res => setData(res.data));
  }, [id]);

  const updateService = async () => {
    await api.patch(`/services/${id}`, data);
  };

  return (
    <>
      <input
        value={data.title}
        onChange={e => setData({ ...data, title: e.target.value })}
      />
      <button onClick={updateService}>Update</button>
    </>
  );
};

export default EditService;
