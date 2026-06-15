import { useState } from "react";

const getEmoji = (main) => {
  const map = {
    Clear: "☀️",
    Clouds: "☁️",
    Rain: "🌧️",
    Drizzle: "🌦️",
    Thunderstorm: "⛈️",
    Snow: "❄️",
    Mist: "🌫️",
    Haze: "🌫️",
    Fog: "🌁",
  };
  return map[main] || "🌤️";
};

function WeatherCard({ weather, darkMode }) {
  const [unit, setUnit] = useState("C");

  if (!weather) return null;

  const tempC = weather.main.temp;
  const tempF = (tempC * 9) / 5 + 32;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        width: "300px",
        margin: "20px auto",
        borderRadius: "10px",
        backgroundColor: darkMode ? "#1e1e1e" : "#ffffff",
        color: darkMode ? "#ffffff" : "#000000",
        boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <h2>{weather.name}</h2>

      {/* ✅ Emoji instead of broken image */}
      <p style={{ fontSize: "60px", margin: "10px 0" }}>
        {getEmoji(weather.weather?.[0]?.main)}
      </p>

      <h3>
        {unit === "C"
          ? `${tempC.toFixed(1)} °C`
          : `${tempF.toFixed(1)} °F`}
      </h3>

      <button onClick={() => setUnit(unit === "C" ? "F" : "C")}>
        Switch °{unit === "C" ? "F" : "C"}
      </button>

      <p>{weather.weather?.[0]?.main}</p>
      <p>💧 Humidity: {weather.main?.humidity}%</p>
      <p>🌬️ Wind: {weather.wind?.speed} m/s</p>
    </div>
  );
}

export default WeatherCard;
