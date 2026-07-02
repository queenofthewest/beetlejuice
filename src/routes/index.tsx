import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "@/components/ui/sonner";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Profile } from "@/components/Profile";
import { Gallery } from "@/components/Gallery";
import { Booking } from "@/components/Booking";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FeatureImage } from "@/components/FeatureImage";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="overflow-x-hidden bg-sand">
      <Navbar />
      <main>
        <Hero />
        <div className="bg-sand-deep">
          <About />
        </div>
        <Gallery />
        <div className="bg-sand-deep">
          <Profile />
        </div>
        <Booking />
        <FeatureImage
          variant="one"
          label="Editorial"
          caption="Golden hour in the Sonoran desert"
        />
        <Contact />
        <FeatureImage variant="two" label="Lifestyle" caption="Where warmth meets intention" heightClass="h-[70vh] md:h-screen" />
      </main>
      <Footer />
      <Toaster position="top-center" />
    </div>
  );
}
