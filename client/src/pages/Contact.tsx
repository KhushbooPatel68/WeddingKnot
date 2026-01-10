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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6"> 
            <div className="bg-card rounded-lg p-6 text-left">
              <h3 className="text-lg font-playfair font-semibold">Kush</h3>
              <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+917820009101" className="text-primary underline">+91-7820009101</a></p>
            </div>

            <div className="bg-card rounded-lg p-6 text-left">
              <h3 className="text-lg font-playfair font-semibold">Zeel</h3>
              <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+918888888888" className="text-primary underline">+91-8888888888</a></p>
            </div>

            <div className="bg-card rounded-lg p-6 text-left">
              <h3 className="text-lg font-playfair font-semibold">Brijesh</h3>
              <p className="font-montserrat text-muted-foreground">Phone: <a href="tel:+919426301980" className="text-primary underline">+91-9426301980</a></p>
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
