import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, XCircle, AlertTriangle, CheckCircle } from "lucide-react";
import { API_BASE_URL } from "@/config/api";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function RSVPPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<null | { type: "success" | "warning" | "error"; text: string }>(null);

  useEffect(() => {
    if (!localStorage.getItem("rsvp_done")) {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // Clear inline message when inputs change
  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, mobile]);

  const submitRSVP = async () => {
    // client-side validation: name required
    if (!name.trim()) {
      setMessage({ type: "error", text: "Please enter your name" });
      return;
    }

    // client-side validation: mobile required and 10 digits
    const digits = mobile.replace(/\D/g, "");
    if (!digits) {
      setMessage({ type: "error", text: "Please enter your mobile number" });
      return;
    }
    if (digits.length !== 10) {
      setMessage({ type: "error", text: "Mobile number must be 10 digits" });
      return;
    }

    setLoading(true);

    try {
      // use API_BASE_URL imported from config
      const res = await fetch(`${API_BASE_URL}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          mobile: `+${digits}`,
        }),
      });

      // Parse body even for non-OK responses (for validation errors)
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.success) {
        // differentiate already-registered vs new success
        if (data.message && data.message.toLowerCase().includes("already")) {
          setMessage({ type: "warning", text: data.message });
          localStorage.setItem("rsvp_done", "true");
          setSubmitted(true);
        } else {
          setMessage({ type: "success", text: data.message || "RSVP submitted successfully" });
          localStorage.setItem("rsvp_done", "true");
          setSubmitted(true);
        }
      } else {
        // Server returned an error (validation or other). Show inline destructive message and keep popup open
        setMessage({ type: "error", text: data.message || "Failed to submit RSVP" });
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-center">
            RSVP
          </DialogTitle>
          <DialogDescription>
            Confirm your attendance at the wedding
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {message && (
            <Alert
              variant={message.type === "error" ? "destructive" : message.type === "warning" ? "warning" : "success"}
              className="mb-2"
            >
              {message.type === "error" && <XCircle className="h-5 w-5" />}
              {message.type === "warning" && <AlertTriangle className="h-5 w-5" />}
              {message.type === "success" && <CheckCircle className="h-5 w-5" />}
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Your Name
            </Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRSVP();
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              placeholder="+91 9XXXXXXXXX"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") submitRSVP();
              }}
            />
          </div>

          <Button
            onClick={submitRSVP}
            disabled={loading}
            className="w-full mt-6"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Submitting..." : "Submit RSVP"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
