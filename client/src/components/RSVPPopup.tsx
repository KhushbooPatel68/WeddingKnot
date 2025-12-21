import { useEffect, useState } from "react";

const API_URL =
  "https://8riq0wuyre.execute-api.ap-south-1.amazonaws.com/prod/rsvp";

export default function RSVPPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("rsvp_done")) {
      setShow(true);
    }
  }, []);

  const submitRSVP = async () => {
    if (!name || !mobile) {
      alert("Please enter name and mobile number");
      return;
    }

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, mobile }),
    });

    const data = await res.json();
    alert(data.message);

    localStorage.setItem("rsvp_done", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div style={overlayStyle}>
      <div style={popupStyle}>
        <h2>RSVP</h2>

        <input
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Mobile (+91...)"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <button onClick={submitRSVP}>Submit</button>
      </div>
    </div>
  );
}

const overlayStyle: React.CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const popupStyle: React.CSSProperties = {
  background: "#fff",
  padding: "24px",
  borderRadius: "8px",
  width: "300px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
};
