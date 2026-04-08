import React, { useState } from "react";

const initialDays = [
  { id: 1, date: "5-9-2026", title: "Vlucht Brussel → Seattle", location: "Brussel → Seattle", items: [], excursions: [] },
  { id: 2, date: "6-9-2026", title: "Seattle", location: "Seattle", items: [], excursions: [] },
  { id: 3, date: "7-9-2026", title: "Start Cruise", location: "Seattle", items: [], excursions: [] },
  { id: 4, date: "8-9-2026", title: "Op zee", location: "Cruise", items: [], excursions: [] },
  { id: 5, date: "9-9-2026", title: "Wrangell", location: "Wrangell", items: [], excursions: [] },
  { id: 6, date: "10-9-2026", title: "Juneau", location: "Juneau", items: [], excursions: [] },
  { id: 7, date: "11-9-2026", title: "Skagway", location: "Skagway", items: [], excursions: [] },
  { id: 8, date: "12-9-2026", title: "Hubbard Glacier", location: "Cruise", items: [], excursions: [] },
  { id: 9, date: "13-9-2026", title: "Sitka", location: "Sitka", items: [], excursions: [] },
  { id: 10, date: "14-9-2026", title: "Ketchikan", location: "Ketchikan", items: [], excursions: [] },
  { id: 11, date: "15-9-2026", title: "Op zee", location: "Cruise", items: [], excursions: [] },
  { id: 12, date: "16-9-2026", title: "Victoria", location: "Victoria", items: [], excursions: [] },
  { id: 13, date: "17-9-2026", title: "Seattle → Golden", location: "Roadtrip", items: [], excursions: [] },
  { id: 14, date: "18-9-2026", title: "Golden", location: "Golden", items: [], excursions: [] },
  { id: 15, date: "19-9-2026", title: "Golden", location: "Golden", items: [], excursions: [] },
  { id: 16, date: "20-9-2026", title: "Nog in te vullen", location: "?", items: [], excursions: [] },
  { id: 17, date: "21-9-2026", title: "Naar Yellowstone", location: "Yellowstone", items: [], excursions: [] },
  { id: 18, date: "22-9-2026", title: "Yellowstone", location: "Yellowstone", items: [], excursions: [] },
  { id: 19, date: "23-9-2026", title: "Nog in te vullen", location: "?", items: [], excursions: [] },
  { id: 20, date: "24-9-2026", title: "Seattle", location: "Seattle", items: [], excursions: [] },
  { id: 21, date: "25-9-2026", title: "Vlucht naar huis", location: "Seattle", items: [], excursions: [] },
  { id: 22, date: "26-9-2026", title: "Thuis", location: "NL", items: [], excursions: [] },
];

export default function App() {
  const [days, setDays] = useState(initialDays);
  const [selectedDay, setSelectedDay] = useState(null);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (!input || !selectedDay) return;

    setDays(days.map(d => {
      if (d.id === selectedDay.id) {
        return { ...d, items: [...d.items, input] };
      }
      return d;
    }));

    setInput("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Alaska Reis App</h1>

      <div style={{ display: "flex", gap: 20 }}>
        
        {/* LINKS */}
        <div style={{ width: 300 }}>
          {days.map((day, index) => (
            <div
              key={day.id}
              onClick={() => setSelectedDay(day)}
              style={{
                padding: 10,
                marginBottom: 10,
                border: "1px solid #ccc",
                cursor: "pointer",
                background: selectedDay?.id === day.id ? "#eee" : "white"
              }}
            >
              <strong>Dag {index + 1}</strong><br />
              {day.date}<br />
              {day.title}
            </div>
          ))}
        </div>

        {/* RECHTS */}
        <div style={{ flex: 1 }}>
          {selectedDay ? (
            <>
              <h2>Dag {days.findIndex(d => d.id === selectedDay.id) + 1}</h2>
              <p>{selectedDay.date} - {selectedDay.location}</p>

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Voeg item toe"
              />
              <button onClick={addItem}>Toevoegen</button>

              <ul>
                {selectedDay.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </>
          ) : (
            <p>Selecteer een dag</p>
          )}
        </div>

      </div>
    </div>
  );
}
