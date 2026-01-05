import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RSVPPopupProps {
  open: boolean;
  onClose: () => void;
}

export default function RSVPPopup({ open, onClose }: RSVPPopupProps) {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name || !mobile) {
      alert("Please fill all required fields.");
      return;
    }

    if (!whatsappOptIn) {
      alert(
        "Please consent to receive WhatsApp updates to complete your RSVP."
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          mobile,
          attending: attending === "yes",
          guestCount,
          whatsapp_opt_in: whatsappOptIn,
        }),
      });

      if (!response.ok) {
        throw new Error("RSVP submission failed");
      }

      alert("RSVP submitted successfully! 🎉");
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
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

        {/* Mobile */}
        <div className="space-y-1 mt-3">
          <Label htmlFor="mobile">WhatsApp Number</Label>
          <Input
            id="mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="+91XXXXXXXXXX"
            required
          />
        </div>

        {/* Attendance */}
        <div className="space-y-1 mt-3">
          <Label>Will you attend?</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={attending === "yes"}
                onChange={() => setAttending("yes")}
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
              />
              No
            </label>
          </div>
        </div>

        {/* Guest Count */}
        {attending === "yes" && (
          <div className="space-y-1 mt-3">
            <Label htmlFor="guestCount">Number of Guests</Label>
            <Input
              id="guestCount"
              type="number"
              min={1}
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
            />
          </div>
        )}

        {/* WhatsApp Opt-in */}
        <div className="mt-4 flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            id="whatsappOptIn"
            checked={whatsappOptIn}
            onChange={(e) => setWhatsappOptIn(e.target.checked)}
            className="mt-1"
            required
          />
          <Label htmlFor="whatsappOptIn" className="text-gray-700 font-normal">
            I agree to receive WhatsApp messages related to{" "}
            <strong>Rohan ❤️ Hany’s wedding</strong> (RSVP confirmation and event
            updates).
          </Label>
        </div>

        {/* Submit */}
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
