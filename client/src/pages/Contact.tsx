import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-20 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-playfair font-semibold text-foreground mb-6">Contact</h1>
          <p className="text-base md:text-lg font-montserrat text-muted-foreground mb-8">
            For questions about travel, accommodations, or invitations, please contact any of the following:
          </p>

          <div className="space-y-8">
            <div data-testid="section-relatives">
              <h2 className="text-2xl font-playfair font-semibold mb-4">Relatives</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg p-6 text-left" data-testid="contact-atul">
                  <h3 className="text-lg font-playfair font-semibold">Atul (Groom's Dad)</h3>
                  <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+919925152010" className="text-primary underline">+91-9925152010</a></p>
                </div>

                <div className="bg-card rounded-lg p-6 text-left" data-testid="contact-kush">
                  <h3 className="text-lg font-playfair font-semibold">Kush (Groom's Brother)</h3>
                  <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+917820009101" className="text-primary underline">+91-7820009101</a></p>
                </div>
              </div>
            </div>

            <div data-testid="section-friends">
              <h2 className="text-2xl font-playfair font-semibold mb-4">Friends</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-card rounded-lg p-6 text-left" data-testid="contact-zeel">
                  <h3 className="text-lg font-playfair font-semibold">Zeel</h3>
                  <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+919512979548" className="text-primary underline">+91-9512979548</a></p>
                </div>

                <div className="bg-card rounded-lg p-6 text-left" data-testid="contact-brijesh">
                  <h3 className="text-lg font-playfair font-semibold">Brijesh</h3>
                  <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+919426301980" className="text-primary underline">+91-9426301980</a></p>
                </div>
              </div>
            </div>
          </div>

          {/* <div className="mt-10">
            <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="px-6">Back to top</Button>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
