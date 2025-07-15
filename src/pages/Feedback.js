import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Feedback() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in first");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "feedbacks"), {
        uid: user.uid,
        email: user.email,
        message,
        createdAt: new Date(),
      });
      alert("✅ Feedback submitted!");
      setMessage("");
    } catch (error) {
      alert("❌ Failed to submit: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white max-w-md w-full p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          📝 Submit Your Feedback
        </h2>
        <textarea
          className="w-full border p-2 rounded mb-3"
          rows="5"
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        ></textarea>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default Feedback;
