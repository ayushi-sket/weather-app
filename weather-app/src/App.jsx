import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Loader from "./components/Loader";
import ErrorMessage from "./components/ErrorMessage";
import "./App.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [darkMode, setDarkMode] = useState(false);
  const [history, setHistory] = useState([]);

  // 🔑 YOUR API KEY (fixed)
  const API_KEY = "7d7d8a7162e32cdbb1f90309c7307fa8";

  const fetchWeather = async (city) => {
    if (!city) return;

    try {
      setLoading(true);
      setError("");
      setWeather(null);

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      // ❌ API error handling
      if (data.cod !== 200) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);

      // Recent search
      setHistory((prev) => {
        const updated = [city, ...prev.filter((c) => c !== city)];
        return updated.slice(0, 5);
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`app ${darkMode ? "dark" : "light"}`}>
      <h1>Weather App 🌦️</h1>

      {/* Dark Mode Button */}
      <button className="btn" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* Search */}
      <SearchBar onSearch={fetchWeather} />

      {/* History */}
      {history.length > 0 && (
        <div className="history">
          <h3>Recent Searches</h3>
          {history.map((city, i) => (
            <button
              key={i}
              className="history-btn"
              onClick={() => fetchWeather(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* UI States */}
      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {weather && (
        <WeatherCard weather={weather} darkMode={darkMode} />
      )}
    </div>
  );
}

export default App;
