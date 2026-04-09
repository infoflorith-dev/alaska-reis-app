import React, { useMemo, useRef, useState, useEffect } from "react";

const initialTrip = [
  {
    id: 1,
    date: "5-9-2026",
    title: "Vlucht Brussel → Seattle",
    location: "Brussel → Seattle",
    stay: "Travelodge by Wyndham",
    type: "flight",
    items: [
      {
        id: 101,
        kind: "document",
        title: "Boarding pass heen",
        note: "Hier later pdf of foto toevoegen",
        website: "",
        files: [],
      },
    ],
    excursions: [],
  },
  {
    id: 2,
    date: "6-9-2026",
    title: "Aankomst / eerste volle dag Seattle",
    location: "Seattle",
    stay: "Travelodge by Wyndham",
    type: "hotel",
    items: [
      {
        id: 201,
        kind: "ticket",
        title: "Baseball wedstrijd",
        note: "Tickets toevoegen zodra je ze hebt",
        website: "",
        files: [],
      },
    ],
    excursions: [],
  },
  {
    id: 3,
    date: "7-9-2026",
    title: "Start cruise",
    location: "Seattle",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 4,
    date: "8-9-2026",
    title: "Op zee",
    location: "Aan boord",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 5,
    date: "9-9-2026",
    title: "Wrangell",
    location: "Wrangell",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [
      {
        id: 501,
        title: "Excursie Wrangell",
        time: "Nog invullen",
        note: "Voucher en opstapinformatie hier",
        website: "",
        files: [],
      },
    ],
  },
  {
    id: 6,
    date: "10-9-2026",
    title: "Juneau",
    location: "Juneau",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [
      {
        id: 601,
        title: "Excursie Juneau",
        time: "Nog invullen",
        note: "Whale watching / glacier / tickets",
        website: "",
        files: [],
      },
    ],
  },
  {
    id: 7,
    date: "11-9-2026",
    title: "Skagway",
    location: "Skagway",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [
      {
        id: 701,
        title: "Excursie Skagway",
        time: "Nog invullen",
        note: "White Pass of wildlife tour",
        website: "",
        files: [],
      },
    ],
  },
  {
    id: 8,
    date: "12-9-2026",
    title: "Hubbard Glacier",
    location: "Hubbard Glacier",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 9,
    date: "13-9-2026",
    title: "Sitka",
    location: "Sitka",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [
      {
        id: 901,
        title: "Sea Otter & Wildlife Quest",
        time: "Nog invullen",
        note: "Via Cunard geboekt",
        website: "",
        files: [],
      },
    ],
  },
  {
    id: 10,
    date: "14-9-2026",
    title: "Ketchikan",
    location: "Ketchikan",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [
      {
        id: 1001,
        title: "Excursie Ketchikan",
        time: "Nog invullen",
        note: "Beren of Misty Fjords",
        website: "",
        files: [],
      },
    ],
  },
  {
    id: 11,
    date: "15-9-2026",
    title: "Op zee",
    location: "Aan boord",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 12,
    date: "16-9-2026",
    title: "Victoria",
    location: "Victoria",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 13,
    date: "17-9-2026",
    title: "Aankomst Seattle + auto huren + rit naar Golden",
    location: "Seattle → Golden",
    stay: "Kicking Horse Hideaway",
    type: "roadtrip",
    items: [
      {
        id: 1301,
        kind: "document",
        title: "Huurauto reservering",
        note: "Bevestiging en papieren hier toevoegen",
        website: "",
        files: [],
      },
    ],
    excursions: [],
  },
  {
    id: 14,
    date: "18-9-2026",
    title: "Golden",
    location: "Golden",
    stay: "Kicking Horse Hideaway",
    type: "stay",
    items: [],
    excursions: [],
  },
  {
    id: 15,
    date: "19-9-2026",
    title: "Golden",
    location: "Golden",
    stay: "Kicking Horse Hideaway",
    type: "stay",
    items: [],
    excursions: [],
  },
  {
    id: 16,
    date: "20-9-2026",
    title: "Golden → nog in te vullen",
    location: "Nog kiezen",
    stay: "Nog kiezen",
    type: "roadtrip",
    items: [],
    excursions: [],
  },
  {
    id: 17,
    date: "21-9-2026",
    title: "Naar Yellowstone",
    location: "Yellowstone",
    stay: "Old Faithful Lodge",
    type: "roadtrip",
    items: [],
    excursions: [],
  },
  {
    id: 18,
    date: "22-9-2026",
    title: "Yellowstone",
    location: "Yellowstone",
    stay: "Old Faithful Lodge",
    type: "stay",
    items: [],
    excursions: [],
  },
  {
    id: 19,
    date: "23-9-2026",
    title: "Yellowstone → nog in te vullen",
    location: "Nog kiezen",
    stay: "Nog kiezen",
    type: "roadtrip",
    items: [],
    excursions: [],
  },
  {
    id: 20,
    date: "24-9-2026",
    title: "Naar Seattle + hotel",
    location: "Seattle",
    stay: "Hotel Seattle",
    type: "roadtrip",
    items: [],
    excursions: [],
  },
  {
    id: 21,
    date: "25-9-2026",
    title: "Vlucht Seattle → Brussel",
    location: "Seattle",
    stay: "Aan boord",
    type: "flight",
    items: [
      {
        id: 2101,
        kind: "document",
        title: "Boarding pass terug",
        note: "Hier later pdf of foto toevoegen",
        website: "",
        files: [],
      },
    ],
    excursions: [],
  },
  {
    id: 22,
    date: "26-9-2026",
    title: "Thuis",
    location: "Nederland",
    stay: "Thuis",
    type: "stay",
    items: [],
    excursions: [],
  },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f8fb 0%, #eef2f7 100%)",
    padding: 24,
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  shell: {
    maxWidth: 1400,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "360px 1fr",
    gap: 24,
  },
  card: {
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.06)",
  },
  sidebarHeader: { padding: 24, borderBottom: "1px solid #e2e8f0" },
  title: { margin: 0, fontSize: 32, fontWeight: 700 },
  sub: { marginTop: 8, color: "#64748b", fontSize: 14, lineHeight: 1.5 },
  list: { padding: 16, display: "flex", flexDirection: "column", gap: 12 },
  dayCard: (active) => ({
    padding: 16,
    borderRadius: 18,
    border: active ? "1px solid #0f172a" : "1px solid #e2e8f0",
    background: active ? "#f8fafc" : "#fff",
    cursor: "pointer",
  }),
  dayTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  pill: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#e2e8f0",
    fontSize: 12,
    fontWeight: 700,
    color: "#334155",
  },
  count: {
    display: "inline-block",
    padding: "4px 10px",
    borderRadius: 999,
    background: "#f1f5f9",
    fontSize: 12,
    fontWeight: 700,
    color: "#334155",
    border: "1px solid #e2e8f0",
  },
  mainHeader: {
    padding: 24,
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    alignItems: "flex-start",
  },
  mainBody: { padding: 24, display: "flex", flexDirection: "column", gap: 24 },
  sectionTitle: { margin: 0, fontSize: 22, fontWeight: 700 },
  button: {
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  buttonDark: {
    padding: "14px 18px",
    borderRadius: 14,
    border: "1px solid #0f172a",
    background: "#0f172a",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
    width: "100%",
  },
  section: {
    border: "1px solid #e2e8f0",
    borderRadius: 20,
    padding: 18,
    background: "#fcfdff",
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: 90,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    boxSizing: "border-box",
    resize: "vertical",
  },
  itemCard: {
    border: "1px solid #e2e8f0",
    borderRadius: 18,
    background: "#fff",
    padding: 16,
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
  },
  fileBox: {
    border: "1px dashed #cbd5e1",
    borderRadius: 14,
    padding: 12,
    background: "#f8fafc",
    marginTop: 10,
  },
};

function typeLabel(type) {
  if (type === "flight") return "Vlucht";
  if (type === "cruise") return "Cruise";
  if (type === "roadtrip") return "Roadtrip";
  if (type === "hotel") return "Hotel";
  if (type === "stay") return "Verblijf";
  return "Dag";
}

function prepareFiles(fileList) {
  return Array.from(fileList || []).map((file) => ({
    id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
    name: file.name,
    type: file.type,
    previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
  }));
}

function FilePreview({ file, onRemove }) {
  return (
    <div style={styles.fileBox}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14 }}>{file.name}</div>
          <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
            {file.type || "Bestand"}
          </div>
          {file.previewUrl ? (
            <img
  src={file.previewUrl}
onClick={() => setFullscreenImage(file.previewUrl)}
  style={{ cursor: "pointer", marginTop: 10, maxHeight: 220, borderRadius: 12, border: "1px solid #e2e8f0" }}
              alt={file.name}
              style={{
                marginTop: 10,
                maxHeight: 220,
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                maxWidth: "100%",
              }}
            />
          ) : null}
        </div>
        <button type="button" onClick={onRemove} style={styles.button}>
          Verwijder
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [days, setDays] = useState(initialTrip);

useEffect(() => {
  const saved = localStorage.getItem("alaska-trip");
  if (saved) setDays(JSON.parse(saved));
}, []);

useEffect(() => {
  localStorage.setItem("alaska-trip", JSON.stringify(days));
}, [days]);

  const [selectedDayId, setSelectedDayId] = useState(initialTrip[0].id);
  const [editingDay, setEditingDay] = useState(false);

  const [itemForm, setItemForm] = useState({
    kind: "ticket",
    title: "",
    note: "",
    website: "",
    files: [],
  });

  const [excursionForm, setExcursionForm] = useState({
    title: "",
    time: "",
    note: "",
    website: "",
    files: [],
  });

  const itemFileRef = useRef(null);
  const excursionFileRef = useRef(null);

  const selectedDay = useMemo(
    () => days.find((d) => d.id === selectedDayId),
    [days, selectedDayId]
  );

  const selectedDayNumber = days.findIndex((d) => d.id === selectedDayId) + 1;

  function updateSelectedDayField(field, value) {
    setDays((current) =>
      current.map((day) =>
        day.id === selectedDayId ? { ...day, [field]: value } : day
      )
    );
  }

  function addItem() {
    if (!itemForm.title.trim()) {
      window.alert("Vul eerst een titel voor het item in.");
      return;
    }

    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : {
              ...day,
              items: [
                ...day.items,
                {
                  id: Date.now(),
                  kind: itemForm.kind,
                  title: itemForm.title.trim(),
                  note: itemForm.note.trim(),
                  website: itemForm.website.trim(),
                  files: itemForm.files || [],
                },
              ],
            }
      )
    );

    setItemForm({
      kind: "ticket",
      title: "",
      note: "",
      website: "",
      files: [],
    });

    if (itemFileRef.current) itemFileRef.current.value = "";
  }

  function addExcursion() {
  if (!excursionForm.title.trim() && excursionForm.files.length === 0) {
      window.alert("Vul eerst een naam voor de excursie in.");
      return;
    }

    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : {
              ...day,
              excursions: [
                ...(day.excursions || []),
                {
                  id: Date.now(),
                 title: excursionForm.title.trim() || "Excursie zonder titel",
                  time: excursionForm.time.trim(),
                  note: excursionForm.note.trim(),
                  website: excursionForm.website.trim(),
       files: excursionForm.files || [],
                },
              ],
            }
      )
    );

    setExcursionForm({
      title: "",
      time: "",
      note: "",
      website: "",
      files: [],
    });

    if (excursionFileRef.current) excursionFileRef.current.value = "";
  }

  function removeItem(itemId) {
    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : { ...day, items: day.items.filter((i) => i.id !== itemId) }
      )
    );
  }

  function removeExcursion(excursionId) {
    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : {
              ...day,
              excursions: day.excursions.filter((e) => e.id !== excursionId),
            }
      )
    );
  }
function saveTrip() {
  localStorage.setItem("alaska-trip", JSON.stringify(days));
  alert("Opgeslagen 👍");
}
  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.card}>
          <div style={styles.sidebarHeader}>
            <h1 style={styles.title}>Alaska Reis App</h1>
            <button onClick={saveTrip} style={styles.buttonDark}>
  Opslaan
</button>
            <div style={styles.sub}>
              Mooie reisplanner met alle dagen, excursies, wijzigen-knop en ruimte voor meerdere foto’s of pdf’s per dag.
            </div>
          </div>

          <div style={styles.list}>
            {days.map((day, index) => {
              const active = day.id === selectedDayId;
              const count = day.items.length + day.excursions.length;

              return (
                <div
                  key={day.id}
                  style={styles.dayCard(active)}
                  onClick={() => {
                    setSelectedDayId(day.id);
                    setEditingDay(false);
                  }}
                >
                  <div style={styles.dayTop}>
                    <span style={styles.pill}>Dag {index + 1}</span>
                    <span style={styles.count}>{count}</span>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 18 }}>{day.date}</div>
                  <div style={{ marginTop: 6, fontWeight: 600 }}>{day.title}</div>
                  <div style={{ marginTop: 6, color: "#64748b", fontSize: 14 }}>
                    {day.location}
                  </div>
                  <div style={{ marginTop: 8, color: "#475569", fontSize: 13 }}>
                    {typeLabel(day.type)} · {day.stay}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={styles.card}>
          <div style={styles.mainHeader}>
            <div>
              <div style={{ fontSize: 30, fontWeight: 700 }}>
                Dag {selectedDayNumber} – {selectedDay.title}
              </div>
              <div style={{ marginTop: 8, color: "#64748b" }}>
                {selectedDay.date} · {selectedDay.location} · Verblijf: {selectedDay.stay}
              </div>
            </div>

          </div>

          <div style={styles.mainBody}>
         {true ? (
              <div style={styles.section}>
                <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>
                  Dag aanpassen
                </h2>
                <div style={{ display: "grid", gap: 12 }}>
                  <input
                    style={styles.input}
                    value={selectedDay.date}
                    onChange={(e) => updateSelectedDayField("date", e.target.value)}
                  />
                  <input
                    style={styles.input}
                    value={selectedDay.title}
                    onChange={(e) => updateSelectedDayField("title", e.target.value)}
                  />
                  <input
                    style={styles.input}
                    value={selectedDay.location}
                    onChange={(e) => updateSelectedDayField("location", e.target.value)}
                  />
                  <input
                    style={styles.input}
                    value={selectedDay.stay}
                    onChange={(e) => updateSelectedDayField("stay", e.target.value)}
                  />
                </div>
              </div>
            ) : null}

            <div style={styles.section}>
              <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>
                Excursies van deze dag
              </h2>

              <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
                <input
                  style={styles.input}
                  placeholder="Naam excursie"
                  value={excursionForm.title}
                  onChange={(e) =>
                    setExcursionForm((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Tijd"
                  value={excursionForm.time}
                  onChange={(e) =>
                    setExcursionForm((s) => ({ ...s, time: e.target.value }))
                  }
                />
                <textarea
                  style={styles.textarea}
                  placeholder="Notitie"
                  value={excursionForm.note}
                  onChange={(e) =>
                    setExcursionForm((s) => ({ ...s, note: e.target.value }))
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Website of boekingslink"
                  value={excursionForm.website}
                  onChange={(e) =>
                    setExcursionForm((s) => ({ ...s, website: e.target.value }))
                  }
                />
                <input
                  ref={excursionFileRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setExcursionForm((s) => ({
                      ...s,
                     files: prepareFiles(e.target.files),
                    }))
                  }
                />
                {excursionForm.files.map((file) => (
                  <FilePreview
                    key={file.id}
                    file={file}
                    onRemove={() =>
                      setExcursionForm((s) => ({
                        ...s,
                        files: s.files.filter((f) => f.id !== file.id),
                      }))
                    }
                  />
                ))}
                <button type="button" style={styles.buttonDark} onClick={addExcursion}>
                  Excursie toevoegen
                </button>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {selectedDay.excursions.length === 0 ? (
                  <div style={{ color: "#64748b" }}>Nog geen excursies toegevoegd.</div>
                ) : (
                  selectedDay.excursions.map((excursion) => (
                    <div key={excursion.id} style={styles.itemCard}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 17 }}>
                          {excursion.title}
                        </div>
                        <div style={{ color: "#64748b", marginTop: 4 }}>
                          {excursion.time}
                        </div>
                        <div style={{ marginTop: 8 }}>{excursion.note}</div>

                        {excursion.website ? (
                          <div style={{ marginTop: 8 }}>
                            <a href={excursion.website} target="_blank" rel="noreferrer">
                              Open website / boekingslink
                            </a>
                          </div>
                        ) : null}

                        {(excursion.files || []).map((file) => (
                          <FilePreview
                            key={file.id}
                            file={file}
                            onRemove={() =>
                              setDays((current) =>
                                current.map((day) =>
                                  day.id !== selectedDayId
                                    ? day
                                    : {
                                        ...day,
                                        excursions: day.excursions.map((ex) =>
                                          ex.id !== excursion.id
                                            ? ex
                                            : {
                                                ...ex,
                                                files: ex.files.filter((f) => f.id !== file.id),
                                              }
                                        ),
                                      }
                                )
                              )
                            }
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => removeExcursion(excursion.id)}
                      >
                        Verwijder
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={{ ...styles.sectionTitle, marginBottom: 16 }}>
                Items van deze dag
              </h2>

              <div style={{ display: "grid", gap: 10, marginBottom: 16 }}>
                <select
                  style={styles.input}
                  value={itemForm.kind}
                  onChange={(e) =>
                    setItemForm((s) => ({ ...s, kind: e.target.value }))
                  }
                >
                  <option value="ticket">Ticket</option>
                  <option value="document">Document</option>
                  <option value="photo">Foto</option>
                  <option value="note">Notitie</option>
                </select>

                <input
                  style={styles.input}
                  placeholder="Titel"
                  value={itemForm.title}
                  onChange={(e) =>
                    setItemForm((s) => ({ ...s, title: e.target.value }))
                  }
                />
                <textarea
                  style={styles.textarea}
                  placeholder="Notitie"
                  value={itemForm.note}
                  onChange={(e) =>
                    setItemForm((s) => ({ ...s, note: e.target.value }))
                  }
                />
                <input
                  style={styles.input}
                  placeholder="Website of boekingslink"
                  value={itemForm.website}
                  onChange={(e) =>
                    setItemForm((s) => ({ ...s, website: e.target.value }))
                  }
                />
                <input
                  ref={itemFileRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={(e) =>
                    setItemForm((s) => ({
                      ...s,
                      files: [...s.files, ...prepareFiles(e.target.files)],
                    }))
                  }
                />
                {itemForm.files.map((file) => (
                  <FilePreview
                    key={file.id}
                    file={file}
                    onRemove={() =>
                      setItemForm((s) => ({
                        ...s,
                        files: s.files.filter((f) => f.id !== file.id),
                      }))
                    }
                  />
                ))}
                <button type="button" style={styles.buttonDark} onClick={addItem}>
                  Item toevoegen
                </button>
              </div>

              <div style={{ display: "grid", gap: 12 }}>
                {selectedDay.items.length === 0 ? (
                  <div style={{ color: "#64748b" }}>Nog geen items toegevoegd.</div>
                ) : (
                  selectedDay.items.map((item) => (
                    <div key={item.id} style={styles.itemCard}>
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                          }}
                        >
                          {item.kind}
                        </div>
                        <div
                          style={{
                            fontWeight: 700,
                            fontSize: 17,
                            marginTop: 4,
                          }}
                        >
                          {item.title}
                        </div>
                        <div style={{ marginTop: 8 }}>{item.note}</div>

                        {item.website ? (
                          <div style={{ marginTop: 8 }}>
                            <a href={item.website} target="_blank" rel="noreferrer">
                              Open website / boekingslink
                            </a>
                          </div>
                        ) : null}

                        {(item.files || []).map((file) => (
                          <FilePreview
                            key={file.id}
                            file={file}
                            onRemove={() =>
                              setDays((current) =>
                                current.map((day) =>
                                  day.id !== selectedDayId
                                    ? day
                                    : {
                                        ...day,
                                        items: day.items.map((it) =>
                                          it.id !== item.id
                                            ? it
                                            : {
                                                ...it,
                                                files: it.files.filter((f) => f.id !== file.id),
                                              }
                                        ),
                                      }
                                )
                              )
                            }
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        style={styles.button}
                        onClick={() => removeItem(item.id)}
                      >
                        Verwijder
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
