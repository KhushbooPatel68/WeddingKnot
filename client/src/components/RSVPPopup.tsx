import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RSVPPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [loading, setLoading] = useState(false);

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
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          mobile: combinedMobile,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "RSVP submission failed");
      }

      localStorage.setItem("rsvp_done", "true");
      localStorage.setItem("rsvp_mobile", combinedMobile);

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
        <h2 className="text-xl font-semibold text-center mb-4">
          RSVP Confirmation
        </h2>

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
