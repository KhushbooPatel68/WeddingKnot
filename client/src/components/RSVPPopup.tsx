import { useEffect, useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RSVPPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [attending, setAttending] = useState<"yes" | "no">("yes");
  const [guestCount, setGuestCount] = useState(1);
  const [whatsappOptIn, setWhatsappOptIn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Open automatically on first visit if not already registered/submitted
  useEffect(() => {
    if (!localStorage.getItem("rsvp_done")) {
      setOpen(true);
    }

    const handler = () => setOpen(true);
    window.addEventListener("open-rsvp", handler as EventListener);
    return () => window.removeEventListener("open-rsvp", handler as EventListener);
  }, []);

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

      const data = await response.json();

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "RSVP submission failed");
      }

      // Mark as done so we don't show the popup again
      localStorage.setItem("rsvp_done", "true");
      localStorage.setItem("rsvp_mobile", mobile);

      alert(data.message || "RSVP submitted successfully! 🎉");
      setOpen(false);
    } catch (error) {
      console.error(error);
      alert((error as Error).message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => setOpen(isOpen)}>
      <DialogContent className="sm:max-w-md" data-testid="dialog-rsvp">
        <h2 className="text-xl font-semibold text-center mb-4">RSVP Confirmation</h2>

        {/* Name */}
        <div className="space-y-1">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            required
            data-testid="input-rsvp-name"
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
            data-testid="input-rsvp-mobile"
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
                data-testid="rsvp-attending-yes"
              />
              Yes
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                checked={attending === "no"}
                onChange={() => setAttending("no")}
                data-testid="rsvp-attending-no"
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
              data-testid="input-rsvp-guest-count"
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
            data-testid="input-rsvp-whatsapp-optin"
          />
          <Label htmlFor="whatsappOptIn" className="text-gray-700 font-normal">
            I agree to receive WhatsApp messages related to <strong>Rohan ❤️ Hany’s wedding</strong> (RSVP confirmation and event updates).
          </Label>
        </div>

        {/* Submit */}
        <Button
          className="w-full mt-5"
          onClick={handleSubmit}
          disabled={loading}
          data-testid="button-rsvp-submit"
        >
          {loading ? "Submitting..." : "Confirm RSVP"}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
