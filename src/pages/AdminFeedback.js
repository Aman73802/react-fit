import React, { useEffect, useState } from "react";
import { auth, db, adminEmail } from "../firebase";
import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function AdminFeedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeedback = async () => {
      const user = auth.currentUser;
      if (!user || user.email !== adminEmail) {
        alert("Access Denied. Only admin can view this page.");
        navigate("/");
        return;
      }

      const q = query(collection(db, "feedbacks"), orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      const results = snapshot.docs.map((doc) => doc.data());
      setFeedbacks(results);
    };

    fetchFeedback();
  }, [navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">📬 All User Feedbacks</h2>
      {feedbacks.length === 0 ? (
        <p>No feedback found.</p>
      ) : (
        feedbacks.map((fb, idx) => (
          <div
            key={idx}
            className="bg-white p-4 border rounded mb-4 shadow"
          >
            <p className="text-sm text-gray-600">
              <strong>User:</strong> {fb.email} <br />
              <strong>Date:</strong> {fb.createdAt.toDate().toLocaleString()}
            </p>
            <p className="mt-2">{fb.message}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminFeedback;
