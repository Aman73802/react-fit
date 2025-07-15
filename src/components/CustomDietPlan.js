import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function CustomDietPlan() {
  const [food, setFood] = useState("");
  const [calories, setCalories] = useState("");
  const [foods, setFoods] = useState([]);
  const [saved, setSaved] = useState(false);

  const addFood = () => {
    if (food && calories) {
      setFoods([...foods, { name: food, calories: parseInt(calories) }]);
      setFood("");
      setCalories("");
    }
  };

  const totalCalories = foods.reduce((sum, item) => sum + item.calories, 0);

  const savePlan = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return alert("Please login to save your plan.");

      await addDoc(collection(db, "dietPlans"), {
        uid: user.uid,
        createdAt: new Date(),
        foods,
        totalCalories,
      });

      setSaved(true);
      alert("✅ Diet Plan saved to Firestore!");
    } catch (err) {
      alert("❌ Failed to save: " + err.message);
    }
  };

  return (
    <div style={{ marginTop: "2rem" }}>
      <h3>🍱 Create Your Custom Diet Plan</h3>
      <input
        type="text"
        placeholder="Food Name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />
      <input
        type="number"
        placeholder="Calories"
        value={calories}
        onChange={(e) => setCalories(e.target.value)}
      />
      <button onClick={addFood}>Add</button>

      {foods.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>📝 Your Plan:</h4>
          <ul>
            {foods.map((item, index) => (
              <li key={index}>
                {item.name} - {item.calories} kcal
              </li>
            ))}
          </ul>
          <strong>🔥 Total Calories: {totalCalories} kcal</strong>
          <br />
          <button onClick={savePlan}>💾 Save to Firebase</button>
          {saved && <p style={{ color: "green" }}>✅ Plan saved!</p>}
        </div>
      )}
    </div>
  );
}

export default CustomDietPlan;
