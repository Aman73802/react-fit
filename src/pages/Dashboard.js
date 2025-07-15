import React, { useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";
import CustomDietPlan from "../components/CustomDietPlan";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("male");
  const [goal, setGoal] = useState("maintain");
  const [bmr, setBmr] = useState(null);
  const [dietInfo, setDietInfo] = useState("");

  const calculateBMR = () => {
    let calculatedBmr;
    if (gender === "male") {
      calculatedBmr = 66 + 13.75 * weight + 5.003 * height - 6.75 * age;
    } else {
      calculatedBmr = 655 + 9.563 * weight + 1.85 * height - 4.676 * age;
    }

    let calorieIntake = calculatedBmr;
    if (goal === "lose") calorieIntake -= 500;
    else if (goal === "gain") calorieIntake += 500;

    setBmr(calorieIntake);

    let protein = weight * 2;
    let carbs = weight * 4;
    let fats = Math.round((calorieIntake - (protein * 4 + carbs * 5)) / 9);

    setDietInfo(
      `Recommended Intake:
🍽️ Calories: ${Math.round(calorieIntake)} kcal
🥩 Proteins: ${protein}g
🍚 Carbohydrates: ${carbs}g
🥑 Fats: ${fats}g`
    );
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🏋️ Dashboard</h2>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          🔓 Logout
        </button>
      </div>

      <Link
        to="/plans"
        className="text-blue-600 underline hover:text-blue-800 block mb-6"
      >
        📋 View Saved Plans
      </Link>

      <p>
        <Link
          to="/progress"
          className="text-purple-600 underline hover:text-purple-800"
        >
          📈 View Progress Chart
        </Link>
      </p>
      <Link
        to="/feedback"
        className="text-pink-600 underline hover:text-pink-800 block mb-6"
      >
        📝 Give Feedback
      </Link>
      <Link
        to="/admin-feedback"
        className="text-red-600 underline hover:text-red-800 block mb-6"
      >
        🔐 Admin: View All Feedbacks
      </Link>

      <h3 className="text-xl font-bold mb-4">🔍 Calculate Your BMR</h3>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          calculateBMR();
        }}
        className="space-y-4"
      >
        <input
          type="number"
          placeholder="Age (years)"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <select
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full p-2 border rounded"
        >
          <option value="maintain">Maintain Weight</option>
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
        </select>
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Calculate
        </button>
      </form>

      {bmr && (
        <div className="bg-gray-100 p-4 mt-6 rounded whitespace-pre-line">
          <h3 className="font-bold mb-2">💡 Diet Suggestion:</h3>
          <p>{dietInfo}</p>
        </div>
      )}

      <CustomDietPlan />
    </div>
  );
}

export default Dashboard;
