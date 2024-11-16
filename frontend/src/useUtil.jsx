import axios from "axios";
import { useEffect, useState } from "react";

export function useFetchContacts() {
  const [data, setData] = useState();
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    async function getContacts() {
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:8000/api/v1/contacts`);
        console.log(res.data.contacts);
        setData(res.data.contacts);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setError("Failed to load contacts.");
      } finally {
        setLoading(false);
      }
    }
    getContacts();
  }, [reload]);

  return { loading, data, setReload, error };
}