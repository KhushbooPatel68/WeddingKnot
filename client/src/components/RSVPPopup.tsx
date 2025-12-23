import { useEffect, useState, useRef } from "react";
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
  const [countryCode, setCountryCode] = useState("+91");
  const closeTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!localStorage.getItem("rsvp_done")) {
      setShow(true);
    }

    // listen for external open requests (e.g., top nav button)
    const onOpen = () => setShow(true);
    window.addEventListener("open-rsvp", onOpen as EventListener);
    return () => {
      window.removeEventListener("open-rsvp", onOpen as EventListener);
    };
  }, []);

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  // clear any pending close timer when component unmounts
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, []);

  // Clear inline message when inputs change
  useEffect(() => {
    if (message) {
      setMessage(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, mobile, countryCode]);

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
      // build mobile with selected country code and cleaned digits
      const cc = countryCode.startsWith("+") ? countryCode : `+${countryCode}`;
      const mobileToSend = `${cc}${digits}`;

      // use API_BASE_URL imported from config
      const res = await fetch(`${API_BASE_URL}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          mobile: mobileToSend,
        }),
      });

      // Parse body even for non-OK responses (for validation errors)
      const data = await res.json().catch(() => ({}));

      // Treat 200 responses from Lambda (even without `success` flag) as success
      if (res.status === 200) {
        const msg = (data.message || "").toString();
        if (msg.toLowerCase().includes("already")) {
          // Already registered -> yellow warning
          setMessage({ type: "warning", text: "RSVP already registered" });
          localStorage.setItem("rsvp_done", "true");
          setSubmitted(true);
        } else {
          // Success -> green message (use the requested friendly text)
          setMessage({ type: "success", text: "RSVP submitted successfully! We look forward to celebrating with you." });
          localStorage.setItem("rsvp_done", "true");
          setSubmitted(true);
        }

        // ensure popup closes after 2s even if `submitted` state was already true
        if (closeTimerRef.current) {
          clearTimeout(closeTimerRef.current);
        }
        closeTimerRef.current = window.setTimeout(() => {
          setShow(false);
          closeTimerRef.current = null;
        }, 2000);

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

            <div className="flex gap-2">
              <select
                aria-label="Country code"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={loading}
                className="rounded-md border px-3 py-2 text-sm bg-white"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+81">+81</option>
              </select>

              <Input
                id="mobile"
                placeholder="9876543210"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                disabled={loading}
                className="flex-1"
                onKeyDown={(e) => {
                  if (e.key === "Enter") submitRSVP();
                }}
              />
            </div>

            <p className="text-xs text-muted-foreground">Include only the local number, country code will be prefixed automatically.</p>
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
