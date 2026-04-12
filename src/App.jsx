import React, { useEffect, useMemo, useRef, useState } from "react";
import { supabase } from "../supabase";

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
    excursions: [],
  },
  {
    id: 6,
    date: "10-9-2026",
    title: "Juneau",
    location: "Juneau",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
  },
  {
    id: 7,
    date: "11-9-2026",
    title: "Skagway",
    location: "Skagway",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
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
    excursions: [],
  },
  {
    id: 10,
    date: "14-9-2026",
    title: "Ketchikan",
    location: "Ketchikan",
    stay: "Queen Elizabeth",
    type: "cruise",
    items: [],
    excursions: [],
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
    items: [],
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
    items: [],
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
    background: "#e2e8f0",
    padding: 16,
    fontFamily: "Arial, sans-serif",
    color: "#0f172a",
  },
  shell: {
    maxWidth: 1450,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(0, 1fr)",
    gap: 20,
  },
  desktopShell: {
    maxWidth: 1450,
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "360px minmax(0, 1fr)",
    gap: 24,
    alignItems: "start",
  },
  card: {
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: 24,
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
    overflow: "hidden",
  },
  sidebarHeader: {
    padding: 24,
    borderBottom: "1px solid #e2e8f0",
    background: "#f8fafc",
  },
  title: {
    margin: 0,
    fontSize: 32,
    fontWeight: 700,
  },
  sub: {
    marginTop: 12,
    color: "#64748b",
    fontSize: 14,
    lineHeight: 1.5,
    background: "#f8fafc",
  },
  list: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    gap: 14,
  },
  dayCard: (active) => ({
    padding: 16,
    borderRadius: 18,
    border: active ? "1px solid #0f172a" : "1px solid #dbe4ee",
    background: active ? "#f8fafc" : "#f1f5f9",
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
  },
  mainBody: {
    padding: 24,
    display: "flex",
    flexDirection: "column",
    gap: 24,
    background: "#fcfdff",
    borderRadius: 20,
  },
  section: {
    border: "1px solid #e2e8f0",
    borderRadius: 22,
    padding: 18,
    background: "#f8fafc",
  },
  sectionTitle: {
    margin: 0,
    marginBottom: 16,
    fontSize: 20,
    fontWeight: 700,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    fontSize: 14,
    boxSizing: "border-box",
    background: "#fff",
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
    background: "#fff",
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
  button: {
    padding: "10px 14px",
    borderRadius: 14,
    border: "1px solid #cbd5e1",
    background: "#fff",
    cursor: "pointer",
    fontWeight: 600,
  },
  headerButtons: {
    display: "grid",
    gap: 10,
    marginTop: 14,
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
  mobileNav: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
    marginBottom: 16,
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
    type: file.type || "",
    size: file.size || 0,
    file,
    previewUrl:
      file.type && file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : "",
  }));
}

async function uploadFile(file) {
  const safeName = `${Date.now()}-${file.name}`.replace(/\s+/g, "-");

  const { data, error } = await supabase.storage
    .from("evidence")
    .upload(safeName, file);

  if (error) {
    console.error("Upload fout:", error);
    return null;
  }

  return {
    name: file.name,
    path: data.path,
  };
}

function FilePreview({ file, onRemove, onOpen }) {
  return (
    <div style={styles.fileBox}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>📄 {file.name}</div>

          {file.previewUrl ? (
            <img
              src={file.previewUrl}
              alt={file.name}
              onClick={() => onOpen(file.previewUrl)}
              style={{
                cursor: "pointer",
                marginTop: 10,
                maxHeight: 220,
                maxWidth: "100%",
                borderRadius: 12,
                border: "1px solid #e2e8f0",
                display: "block",
              }}
            />
          ) : (
            <div
              onClick={async () => {
                const { data, error } = await supabase.storage
                  .from("evidence")
                  .createSignedUrl(file.path, 3600);

                if (error) {
                  console.error("Open fout:", error);
                  return;
                }

                window.open(data.signedUrl, "_blank");
              }}
              style={{
                marginTop: 10,
                padding: 10,
                borderRadius: 10,
                background: "#f1f5f9",
                border: "1px solid #e2e8f0",
                fontSize: 13,
                color: "#334155",
                cursor: "pointer",
              }}
            >
              Klik om te openen
            </div>
          )}
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
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [selectedDayId, setSelectedDayId] = useState(initialTrip[0].id);
  const [mobileTab, setMobileTab] = useState("days");
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 900 : false
  );
  const [saveStatus, setSaveStatus] = useState("Opgeslagen");
  const [itemForm, setItemForm] = useState({
    kind: "ticket",
    title: "",
    note: "",
    website: "",
    files: [],
  });
  const [documents, setDocuments] = useState([]);
  const [docForm, setDocForm] = useState({
    type: "document",
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
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingExcursionId, setEditingExcursionId] = useState(null);
  const [isEditingDay, setIsEditingDay] = useState(false);

  const itemFileRef = useRef(null);
  const excursionFileRef = useRef(null);
  const hasLoadedRef = useRef(false);
  const saveTimeoutRef = useRef(null);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 900);
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    async function loadTrip() {
      try {
        const saved = localStorage.getItem("alaska-trip");

        if (saved) {
          try {
            const parsed = JSON.parse(saved);

            if (parsed.days) {
              setDays(parsed.days);

              if (!parsed.documents || parsed.documents.length === 0) {
                // laat Supabase hieronder ook nog checken
              } else {
                setDocuments(parsed.documents);
                return;
              }
            } else {
              setDays(parsed);
            }
          } catch (e) {
            console.error(e);
          }
        }

        const { data, error } = await supabase
          .from("travel_app_state")
          .select("data")
          .eq("id", "main")
          .single();

        if (data?.data) {
          if (data.data.days) {
            setDays(data.data.days);
            setDocuments(data.data.documents || []);
          } else {
            setDays(data.data);
          }
          return;
        }

        if (error && error.code !== "PGRST116") {
          console.error(error);
        }
      } catch (e) {
        console.error(e);
      }
    }

    loadTrip();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "alaska-trip",
      JSON.stringify({
        days,
        documents,
      })
    );

    if (!hasLoadedRef.current) {
      hasLoadedRef.current = true;
      return;
    }

    saveTrip(days);
  }, [days, documents]);

  const selectedDay = useMemo(
    () => days.find((d) => d.id === selectedDayId) || days[0],
    [days, selectedDayId]
  );

  const selectedDayNumber = days.findIndex((d) => d.id === selectedDayId) + 1;

  async function saveTrip(data) {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    setSaveStatus("Opslaan...");

    saveTimeoutRef.current = setTimeout(async () => {
      const { error } = await supabase.from("travel_app_state").upsert([
        {
          id: "main",
          data: {
            days: data,
            documents,
          },
        },
      ]);

      if (error) {
        console.error("Autosave fout:", error);
        setSaveStatus("Opslaan mislukt");
      } else {
        setSaveStatus("Opgeslagen ✅");
      }
    }, 1000);
  }

  function updateSelectedDayField(field, value) {
    setDays((current) =>
      current.map((day) =>
        day.id === selectedDayId ? { ...day, [field]: value } : day
      )
    );
  }

  function addItem() {
    if (!itemForm.title.trim() && itemForm.files.length === 0) {
      window.alert("Vul een titel in of voeg een bestand toe.");
      return;
    }

    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : {
              ...day,
              items: editingItemId
                ? day.items.map((it) =>
                    it.id === editingItemId ? { ...it, ...itemForm } : it
                  )
                : [
                    ...day.items,
                    {
                      id: Date.now(),
                      ...itemForm,
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

    setEditingItemId(null);

    if (itemFileRef.current) itemFileRef.current.value = "";
  }

  function addExcursion() {
    if (!excursionForm.title.trim() && excursionForm.files.length === 0) {
      window.alert("Vul een naam in of voeg een bestand toe.");
      return;
    }

    setDays((current) =>
      current.map((day) =>
        day.id !== selectedDayId
          ? day
          : {
              ...day,
              excursions: editingExcursionId
                ? day.excursions.map((ex) =>
                    ex.id === editingExcursionId
                      ? { ...ex, ...excursionForm }
                      : ex
                  )
                : [
                    ...(day.excursions || []),
                    {
                      id: Date.now(),
                      ...excursionForm,
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

    setEditingExcursionId(null);

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

  const sidebar = (
    <div style={styles.card}>
      <div style={styles.sidebarHeader}>
        <h1 style={styles.title}>Alaska Reis App</h1>

        <div style={styles.headerButtons}>
          <button
            type="button"
            onClick={() => saveTrip(days)}
            style={styles.buttonDark}
          >
            Opslaan
          </button>
          <div style={{ fontSize: 13, color: "#64748b" }}>{saveStatus}</div>
        </div>

        <div style={styles.sub}>
          Mooie reisplanner met alle dagen, excursies en ruimte voor meerdere
          foto’s of pdf’s per dag.
        </div>
      </div>

      <div style={styles.list}>
        {days.map((day, index) => {
          const active = day.id === selectedDayId;
          const count = day.items.length + day.excursions.length;

          const cardImage =
            day.type === "flight"
              ? "https://cdn.assets.prezly.com/ebf46491-b4db-46dc-b168-1e216f74f8e1/SN_Airbus-A330_Visual_01_5K.jpg"
              : day.title?.toLowerCase().includes("op zee") ||
                day.location?.toLowerCase().includes("aan boord")
              ? "https://www.cunard.com/content/dam/cunard/brand-assets/ships/queen-elizabeth/in-port/18399-qe-glacier-bay-alaska-2880x1047-desktop.jpg"
              : day.location?.toLowerCase().includes("seattle")
              ? "https://images.unsplash.com/photo-1514565131-fce0801e5785"
              : day.location?.toLowerCase().includes("juneau")
              ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
              : day.location?.toLowerCase().includes("skagway")
              ? "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
              : day.location?.toLowerCase().includes("ketchikan")
              ? "https://images.unsplash.com/photo-1470770903676-69b98201ea1c"
              : day.location?.toLowerCase().includes("wrangell")
              ? "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              : day.location?.toLowerCase().includes("sitka")
              ? "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
              : day.location?.toLowerCase().includes("victoria")
              ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              : day.location?.toLowerCase().includes("hubbard")
              ? "https://www.hollandamerica.com/content/dam/hal/inventory-assets/destinations/ports/hub/port-hub-hubbard-glacier-canada-c037.jpg"
              : day.location?.toLowerCase().includes("yellowstone")
              ? "https://images.unsplash.com/photo-1476610182048-b716b8518aae"
              : day.location?.toLowerCase().includes("golden") ||
                day.location?.toLowerCase().includes("banff")
              ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";

          return (
            <div
              key={day.id}
              style={{
                ...styles.dayCard(active),
                position: "relative",
                overflow: "hidden",
                background: "transparent",
                backgroundImage: `url(${cardImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transform: active ? "scale(1.02)" : "scale(1)",
                transition: "transform 0.25s ease",
                color: "#fff",
              }}
              onClick={() => {
                setSelectedDayId(day.id);
                if (isMobile) setMobileTab("details");
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75))",
                }}
              />

              <div style={{ position: "relative" }}>
                <div style={styles.dayTop}>
                  <span style={styles.pill}>Dag {index + 1}</span>
                  <span style={styles.count}>{count}</span>
                </div>

                <div style={{ fontWeight: 700, fontSize: 18 }}>{day.date}</div>
                <div style={{ marginTop: 6, fontWeight: 600 }}>{day.title}</div>
                <div
                  style={{
                    marginTop: 6,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 14,
                  }}
                >
                  {day.location}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: 13,
                  }}
                >
                  {typeLabel(day.type)} · {day.stay}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const details = (
    <div style={styles.card}>
      <div
        style={{
          position: "relative",
          height: 280,
          borderBottom: "1px solid #e2e8f0",
          backgroundImage: `url(${
            selectedDay.type === "flight"
              ? "https://www.luchtvaartnieuws.nl/sites/default/files/website_633x300/slider-airlines/sas_a330_c_sas_1280.jpg"
              : selectedDay.location?.toLowerCase().includes("seattle")
              ? "https://images.unsplash.com/photo-1502175353174-a7a70e73b362"
              : selectedDay.location?.toLowerCase().includes("juneau")
              ? "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
              : selectedDay.title?.toLowerCase().includes("op zee") ||
                selectedDay.location?.toLowerCase().includes("aan boord")
              ? "https://www.cunard.com/content/dam/cunard/brand-assets/ships/queen-elizabeth/in-port/18399-qe-glacier-bay-alaska-2880x1047-desktop.jpg"
              : selectedDay.location?.toLowerCase().includes("skagway")
              ? "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
              : selectedDay.location?.toLowerCase().includes("ketchikan")
              ? "https://images.unsplash.com/photo-1470770903676-69b98201ea1c"
              : selectedDay.location?.toLowerCase().includes("wrangell")
              ? "https://images.unsplash.com/photo-1469474968028-56623f02e42e"
              : selectedDay.location?.toLowerCase().includes("sitka")
              ? "https://images.unsplash.com/photo-1482192596544-9eb780fc7f66"
              : selectedDay.location?.toLowerCase().includes("victoria")
              ? "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
              : selectedDay.location?.toLowerCase().includes("hubbard")
              ? "https://www.hollandamerica.com/content/dam/hal/inventory-assets/destinations/ports/hub/port-hub-hubbard-glacier-canada-c037.jpg"
              : selectedDay.location?.toLowerCase().includes("yellowstone")
              ? "https://images.unsplash.com/photo-1476610182048-b716b8518aae"
              : selectedDay.location?.toLowerCase().includes("golden") ||
                selectedDay.location?.toLowerCase().includes("banff")
              ? "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
              : "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
          }}
        />

        <div
          style={{
            position: "relative",
            padding: 24,
            color: "#fff",
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 700 }}>
            Dag {selectedDayNumber} – {selectedDay.title}
          </div>

          <div style={{ marginTop: 8, opacity: 0.9 }}>
            {selectedDay.date} · {selectedDay.location}
          </div>

          <div style={{ marginTop: 12 }}>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                selectedDay.location === "Golden"
                  ? "Golden, British Columbia, Canada"
                  : selectedDay.location === "Seattle"
                  ? "Seattle, Washington, USA"
                  : selectedDay.location === "Juneau"
                  ? "Juneau, Alaska, USA"
                  : selectedDay.location === "Skagway"
                  ? "Skagway, Alaska, USA"
                  : selectedDay.location === "Ketchikan"
                  ? "Ketchikan, Alaska, USA"
                  : selectedDay.location === "Wrangell"
                  ? "Wrangell, Alaska, USA"
                  : selectedDay.location === "Sitka"
                  ? "Sitka, Alaska, USA"
                  : selectedDay.location === "Victoria"
                  ? "Victoria, British Columbia, Canada"
                  : selectedDay.location === "Yellowstone"
                  ? "Yellowstone National Park, USA"
                  : selectedDay.location
              )}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 12,
                background: "#0f172a",
                color: "#fff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              📍 Bekijk op kaart
            </a>
          </div>
        </div>
      </div>

      <div style={styles.mainBody}>
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            Dag {isEditingDay ? "bewerken" : "overzicht"}
          </h2>

          {isEditingDay ? (
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
                onChange={(e) =>
                  updateSelectedDayField("location", e.target.value)
                }
              />
              <input
                style={styles.input}
                value={selectedDay.stay}
                onChange={(e) => updateSelectedDayField("stay", e.target.value)}
              />

              <button
                type="button"
                style={styles.buttonDark}
                onClick={() => setIsEditingDay(false)}
              >
                Klaar
              </button>
            </div>
          ) : (
            <button
              type="button"
              style={styles.button}
              onClick={() => setIsEditingDay(true)}
            >
              Dag bewerken
            </button>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>📂 Reisdocumenten</h2>

          <input
            style={styles.input}
            placeholder="Titel (bijv. ESTA VS)"
            value={docForm.title}
            onChange={(e) => setDocForm({ ...docForm, title: e.target.value })}
          />

          <textarea
            style={styles.textarea}
            placeholder="Notitie"
            value={docForm.note}
            onChange={(e) => setDocForm({ ...docForm, note: e.target.value })}
          />

          <input
            style={styles.input}
            placeholder="Website of link"
            value={docForm.website}
            onChange={(e) =>
              setDocForm({ ...docForm, website: e.target.value })
            }
          />

          <input
            type="file"
            multiple
            onChange={(e) =>
              setDocForm({
                ...docForm,
                files: prepareFiles(e.target.files),
              })
            }
          />

          <button
            type="button"
            style={styles.buttonDark}
            onClick={async () => {
              if (!docForm.title.trim() && docForm.files.length === 0) {
                window.alert("Vul een titel in of voeg een bestand toe.");
                return;
              }

              let uploadedFiles = [];

              for (const file of docForm.files) {
                const uploaded = await uploadFile(file.file || file);
                if (uploaded) {
                  uploadedFiles.push(uploaded);
                }
              }

              setDocuments((current) => [
                ...current,
                {
                  id: Date.now(),
                  title: docForm.title,
                  note: docForm.note,
                  website: docForm.website,
                  files: uploadedFiles,
                },
              ]);

              setDocForm({
                type: "document",
                title: "",
                note: "",
                website: "",
                files: [],
              });
            }}
          >
            Document toevoegen
          </button>

          <div style={{ display: "grid", gap: 12, marginTop: 16 }}>
            {documents.length === 0 ? (
              <div style={{ color: "#64748b" }}>
                Nog geen reisdocumenten toegevoegd.
              </div>
            ) : (
            documents.map((doc) => (
  <div
    key={doc.id}
    style={{
      ...styles.itemCard,
      flexDirection: "column",
      gap: 14,
      padding: 20,
      borderRadius: 20,
      background: "#ffffff",
      boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
    }}
  >
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontWeight: 700, fontSize: 18 }}>
        📄 {doc.title}
      </div>

      {doc.note ? (
        <div style={{ marginTop: 6, color: "#334155" }}>
          {doc.note}
        </div>
      ) : null}

      {doc.website ? (
        <a
          href={
            doc.website.startsWith("http")
              ? doc.website
              : "https://" + doc.website
          }
          target="_blank"
          rel="noreferrer"
          style={{
            display: "block",
            marginTop: 10,
            padding: 14,
            borderRadius: 12,
            background: "#f8fafc",
            textDecoration: "none",
            color: "#0f172a",
            border: "1px solid #e2e8f0",
            transition: "all 0.2s ease",
          }}
        >
          <div style={{ fontWeight: 600 }}>
            {doc.website.replace("https://", "").slice(0, 40)}
          </div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 4 }}>
            Website openen ↗
          </div>
        </a>
      ) : null}

                 {doc.files && doc.files.length > 0 ? (
  <div
    style={{
      marginTop: 12,
      padding: 12,
      borderRadius: 14,
      background: "#f8fafc",
      border: "1px solid #e2e8f0",
    }}
  >
    <div style={{ display: "grid", gap: 10 }}>
      {doc.files.map((file) => (
        <FilePreview
          key={file.id || file.path || file.name}
          file={file}
          onOpen={setFullscreenImage}
          onRemove={() =>
            setDocuments((current) =>
              current.map((d) =>
                d.id !== doc.id
                  ? d
                  : {
                      ...d,
                      files: d.files.filter(
                        (f) =>
                          (f.id || f.path || f.name) !==
                          (file.id || file.path || file.name)
                      ),
                    }
              )
            )
          }
        />
      ))}
    </div>
  </div>
) : null}

</div>

<button
  type="button"
  style={{
    ...styles.button,
    alignSelf: "flex-end",
    minWidth: 120,
  }}
  onClick={() =>
    setDocuments((current) => current.filter((d) => d.id !== doc.id))
  }
>
  Verwijder
</button>
              ))
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Excursies van deze dag</h2>

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
                setExcursionForm((s) => ({
                  ...s,
                  website: e.target.value,
                }))
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
                onOpen={setFullscreenImage}
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
                    {excursion.time ? (
                      <div style={{ color: "#64748b", marginTop: 4 }}>
                        {excursion.time}
                      </div>
                    ) : null}
                    {excursion.note ? (
                      <div style={{ marginTop: 8 }}>{excursion.note}</div>
                    ) : null}

                    {excursion.website ? (
                      <div style={{ marginTop: 8 }}>
                        <a
                          href={excursion.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open website / boekingslink
                        </a>
                      </div>
                    ) : null}

                    {(excursion.files || []).map((file) => (
                      <FilePreview
                        key={file.id}
                        file={file}
                        onOpen={setFullscreenImage}
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
                                            files: ex.files.filter(
                                              (f) => f.id !== file.id
                                            ),
                                          }
                                    ),
                                  }
                            )
                          )
                        }
                      />
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => {
                        setExcursionForm(excursion);
                        setEditingExcursionId(excursion.id);
                      }}
                    >
                      Bewerken
                    </button>

                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => removeExcursion(excursion.id)}
                    >
                      Verwijder
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Items van deze dag</h2>

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
                  files: prepareFiles(e.target.files),
                }))
              }
            />
            {itemForm.files.map((file) => (
              <FilePreview
                key={file.id}
                file={file}
                onOpen={setFullscreenImage}
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

                    {item.note ? (
                      <div style={{ marginTop: 8 }}>{item.note}</div>
                    ) : null}

                    {item.website ? (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "block",
                          marginTop: 10,
                          padding: 12,
                          borderRadius: 10,
                          background: "#f4f6f8",
                          textDecoration: "none",
                          color: "#111",
                          border: "1px solid #e2e8f0",
                        }}
                      >
                        <div style={{ fontWeight: 600 }}>
                          {item.website.replace("https://", "").slice(0, 40)}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: "#64748b",
                            marginTop: 4,
                          }}
                        >
                          Website openen ↗
                        </div>
                      </a>
                    ) : null}

                    {(item.files || []).map((file) => (
                      <FilePreview
                        key={file.id}
                        file={file}
                        onOpen={setFullscreenImage}
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
                                            files: it.files.filter(
                                              (f) => f.id !== file.id
                                            ),
                                          }
                                    ),
                                  }
                            )
                          )
                        }
                      />
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => {
                        setItemForm(item);
                        setEditingItemId(item.id);
                      }}
                    >
                      Bewerken
                    </button>

                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => removeItem(item.id)}
                    >
                      Verwijder
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div style={styles.page}>
        {isMobile ? (
          <div style={styles.shell}>
            <div style={styles.mobileNav}>
              <button
                type="button"
                style={mobileTab === "days" ? styles.buttonDark : styles.button}
                onClick={() => setMobileTab("days")}
              >
                Dagen
              </button>
              <button
                type="button"
                style={
                  mobileTab === "details" ? styles.buttonDark : styles.button
                }
                onClick={() => setMobileTab("details")}
              >
                Details
              </button>
            </div>

            {mobileTab === "days" ? sidebar : details}
          </div>
        ) : (
          <div style={styles.desktopShell}>
            {sidebar}
            {details}
          </div>
        )}
      </div>

      {fullscreenImage && (
        <div
          onClick={() => setFullscreenImage(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            cursor: "pointer",
          }}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen preview"
            style={{
              maxWidth: "95%",
              maxHeight: "95%",
            }}
          />
        </div>
      )}
    </>
  );
}
