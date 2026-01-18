import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const WEDDING_EVENTS = [
  {
    name: "Haldi Ceremony",
    date: "2026-02-12",
    startTime: "11:00",
    endTime: "15:00",
    description: "A joyous pre-wedding ceremony where turmeric paste is applied to the bride and groom for good luck and radiant skin.",
  },
  {
    name: "Grah Shanti",
    date: "2026-02-13",
    startTime: "16:00",
    endTime: "19:00",
    description: "A sacred ceremony performed to invoke blessings from the divine and seek harmony for the upcoming union.",
  },
  {
    name: "Sangeet",
    date: "2026-02-13",
    startTime: "19:30",
    endTime: "00:00",
    description: "Get ready for a night of music, dance, and endless entertainment!",
  },
  {
    name: "Baarat",
    date: "2026-02-14",
    startTime: "18:00",
    endTime: "21:00",
    description: "The groom's grand procession arrives with music, dancing, and celebration.",
  },
  {
    name: "Wedding Ceremony",
    date: "2026-02-14",
    startTime: "21:00",
    endTime: "00:00",
    description: "The sacred moment when two souls unite under the beautiful mandap.",
  },
];

// No external library needed - we'll use standard calendar links

export default function RSVPPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);
  const [addToCalendar, setAddToCalendar] = useState(false);

  // Skip popup if already RSVP'd with stored number
  useEffect(() => {
    const done = localStorage.getItem("rsvp_done");
    const savedMobile = localStorage.getItem("rsvp_mobile");

    if (!done || !savedMobile) {
      setOpen(true);
    }

    const handler = () => setOpen(true);
    window.addEventListener("open-rsvp", handler as EventListener);
    return () => window.removeEventListener("open-rsvp", handler as EventListener);
  }, []);

  const validatePhone = () => {
    const len = mobile.length;

    switch (countryCode) {
      case "+91": // India
      case "+1": // USA
        return len === 10;

      case "+44": // UK
        return len >= 10 && len <= 11;

      case "+971": // UAE
      case "+61": // AUS
        return len === 9;

      case "+65": // Singapore
        return len === 8;

      default:
        return len > 5; // fallback
    }
  };

  const addEventsToCalendar = async () => {
    // Use different calendar links based on the first event as example
    // User will get prompted to add all events to their calendar
    
    const event = WEDDING_EVENTS[0]; // Start with Haldi
    const startDate = event.date.replace(/-/g, "");
    const startTime = event.startTime.replace(":", "");
    const endTime = event.endTime.replace(":", "");
    
    // Create Google Calendar link
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent("Rohan & Hany Wedding - " + event.name)}&dates=${startDate}T${startTime}00/${startDate}T${endTime}00&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent("Wedding Venue")}`;
    
    // Open Google Calendar (or user's default calendar app on mobile)
    window.open(googleCalendarUrl, "_blank");
    
    // Also try to create an ICS file as fallback for other calendar apps
    setTimeout(() => {
      createAndDownloadICS();
    }, 1000);
  };

  const createAndDownloadICS = () => {
    const icsContent: string[] = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Wedding Knot//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "X-WR-CALNAME:Rohan & Hany Wedding",
      "X-WR-TIMEZONE:Asia/Kolkata",
    ];

    WEDDING_EVENTS.forEach((event, index) => {
      const [year, month, day] = event.date.split("-");
      const startHour = event.startTime.split(":")[0].padStart(2, "0");
      const startMin = event.startTime.split(":")[1].padStart(2, "0");
      const dtStart = `${year}${month}${day}T${startHour}${startMin}00`;
      
      // Handle end time - if it's 00:00, it's the next day
      let endDate = event.date;
      let endHour = event.endTime.split(":")[0].padStart(2, "0");
      let endMin = event.endTime.split(":")[1].padStart(2, "0");
      
      if (event.endTime === "00:00") {
        // For midnight end times, set to 23:59:59 same day (Android compatible)
        // Or move to next day with time 00:00:00
        const nextDay = new Date(event.date);
        nextDay.setDate(nextDay.getDate() + 1);
        endDate = nextDay.toISOString().split("T")[0];
        endHour = "00";
        endMin = "00";
      }
      
      const [endYear, endMonth, endDay] = endDate.split("-");
      const dtEnd = `${endYear}${endMonth}${endDay}T${endHour}${endMin}00`;

      icsContent.push(
        "BEGIN:VEVENT",
        `DTSTART:${dtStart}`,
        `DTEND:${dtEnd}`,
        `SUMMARY:${event.name}`,
        `DESCRIPTION:${event.description}`,
        `LOCATION:Wedding Venue`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
        `UID:rohan-hany-wedding-${index}-${event.date}@wedding-knot.com`,
        "STATUS:CONFIRMED",
        "TRANSP:OPAQUE",
        "SEQUENCE:0",
        "END:VEVENT"
      );
    });

    icsContent.push("END:VCALENDAR");
    
    const ics = icsContent.join("\r\n");
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "wedding-events.ics";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSubmit = async () => {
    if (!name || !mobile) {
      alert("Please enter your name and phone number.");
      return;
    }

    if (!validatePhone()) {
      alert(`Invalid phone number format for ${countryCode}.`);
      return;
    }

    const combinedMobile = `${countryCode}${mobile}`;

    setLoading(true);

    try {
      const response = await fetch("https://8riq0wuyre.execute-api.ap-south-1.amazonaws.com/prod/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, mobile: combinedMobile }),
      });


      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "RSVP submission failed");
      }

      localStorage.setItem("rsvp_done", "true");
      localStorage.setItem("rsvp_mobile", combinedMobile);

      // Add events to calendar if checkbox is selected
      if (addToCalendar) {
        await addEventsToCalendar();
      }

      alert(data.message || "RSVP submitted successfully! 🎉");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert((err as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-rsvp">
        <DialogTitle className="text-xl font-semibold text-center mb-4">
          RSVP Confirmation
        </DialogTitle>

        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="space-y-1 mt-3">
          <Label>Phone Number</Label>
          <div className="flex gap-2">
            <select
              className="border rounded px-2 py-1"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+91">+91 🇮🇳</option>
              <option value="+1">+1 🇺🇸</option>
              <option value="+44">+44 🇬🇧</option>
              <option value="+971">+971 🇦🇪</option>
              <option value="+61">+61 🇦🇺</option>
              <option value="+65">+65 🇸🇬</option>
            </select>

            <Input
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              placeholder="Phone number"
              required
            />
          </div>
        </div>

        {/* Add to Calendar Checkbox */}
        <div className="flex items-center space-x-2 mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
          <Checkbox
            id="add-calendar"
            checked={addToCalendar}
            onCheckedChange={(checked) => setAddToCalendar(checked as boolean)}
          />
          <label
            htmlFor="add-calendar"
            className="text-sm font-medium cursor-pointer text-purple-900"
          >
            📅 Add all events to my calendar
          </label>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-4">
          <p className="text-sm font-semibold text-blue-900 mb-1">
            Stay Connected
          </p>
          <p className="text-sm text-blue-800">
            From ceremonies to celebrations, receive timely updates and reminders for our special days.
          </p>
        </div>

        <Button
          className="w-full mt-5"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Confirm RSVP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
