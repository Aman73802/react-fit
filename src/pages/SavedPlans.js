import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  query,
  where,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchPlans = async () => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    const plansRef = collection(db, "dietPlans");
    const q = query(
      plansRef,
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    const fetched = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPlans(fetched);
    setLoading(false);
  };

  const deletePlan = async (planId) => {
    if (window.confirm("Are you sure you want to delete this plan?")) {
      await deleteDoc(doc(db, "dietPlans", planId));
      setPlans((prev) => prev.filter((plan) => plan.id !== planId));
      alert("✅ Plan deleted successfully.");
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📋 Your Saved Diet Plans</h2>

      {loading ? (
        <p>Loading...</p>
      ) : plans.length === 0 ? (
        <p>No plans found. Create one first!</p>
      ) : (
        plans.map((plan) => (
          <div
            key={plan.id}
            className="border p-4 rounded shadow mb-4 bg-white"
          >
            <p className="text-sm text-gray-500 mb-2">
              Saved on: {plan.createdAt.toDate().toLocaleString()}
            </p>
            <ul className="mb-2">
              {plan.foods.map((item, idx) => (
                <li key={idx}>
                  🍽️ {item.name} — {item.calories} kcal
                </li>
              ))}
            </ul>
            <p className="font-semibold mb-2">
              🔥 Total: {plan.totalCalories} kcal
            </p>
            <button
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              onClick={() => deletePlan(plan.id)}
            >
              🗑 Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default SavedPlans;
