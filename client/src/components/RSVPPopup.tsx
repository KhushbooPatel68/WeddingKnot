import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function RSVPPopup() {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

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

  const submitRSVP = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter your name",
        variant: "destructive",
      });
      return;
    }

    if (!mobile.trim()) {
      toast({
        title: "Error",
        description: "Please enter your mobile number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), mobile: mobile.trim() }),
      });

      const data = await res.json();

      if (data.success) {
        toast({
          title: "Success",
          description: data.message,
        });
        localStorage.setItem("rsvp_done", "true");
        setSubmitted(true);
      } else {
        toast({
          title: "Error",
          description: data.message || "Failed to submit RSVP",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("RSVP submission error:", error);
      toast({
        title: "Error",
        description: "Network error. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent className="sm:max-w-md" aria-describedby="rsvp-description">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair text-center">
            RSVP
          </DialogTitle>
        </DialogHeader>
        <div id="rsvp-description" className="sr-only">
          RSVP form to confirm your attendance at the wedding
        </div>
        <div className="space-y-4 py-4">
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
                if (e.key === "Enter") {
                  submitRSVP();
                }
              }}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobile" className="text-sm font-medium">
              Mobile Number
            </Label>
            <Input
              id="mobile"
              placeholder="+1 (555) 000-0000"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              disabled={loading}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  submitRSVP();
                }
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
