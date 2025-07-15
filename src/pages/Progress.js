import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function Progress() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChartData = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const plansRef = collection(db, "dietPlans");
      const q = query(
        plansRef,
        where("uid", "==", user.uid),
        orderBy("createdAt", "asc")
      );

      const snapshot = await getDocs(q);
      const chartData = snapshot.docs.map((doc) => {
        const d = doc.data();
        return {
          date: d.createdAt.toDate().toLocaleDateString(),
          calories: d.totalCalories,
        };
      });

      setData(chartData);
    };

    fetchChartData();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">📈 Your Calorie Progress</h2>
      {data.length === 0 ? (
        <p>No data found. Start saving diet plans first!</p>
      ) : (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="calories"
              stroke="#10B981"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Progress;

