import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
  const token = localStorage.getItem("token");

  const [data, setData] = useState({
    users: [],
    charities: [],
    results: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const [usersRes, charitiesRes, resultsRes] = await Promise.all([
        axios.get("https://fairway-fortune.onrender.com/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get("https://fairway-fortune.onrender.com/api/charities"),
        axios.get("https://fairway-fortune.onrender.com/api/admin/results", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setData({
        users: usersRes.data.users || [],
        charities: charitiesRes.data.charities || [],
        results: resultsRes.data.results || [],
      });

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ ...data, loading, refresh: fetchAll }}>
      {children}
    </AdminContext.Provider>
  );
};