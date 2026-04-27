import { useState } from "react";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Impact } from "./components/Impact";
import { Solution } from "./components/Solution";
import { Technology } from "./components/Technology";
import { Market } from "./components/Market";
import { Traction } from "./components/Traction";
import { Roadmap } from "./components/Roadmap";
import { BusinessModel } from "./components/BusinessModel";
import { Team } from "./components/Team";
import { Vision } from "./components/Vision";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";
import { Navbar } from "./components/Navbar";
import { VoiceMode } from "./components/VoiceMode";

function App() {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <Navbar onVoiceClick={() => setVoiceOpen(true)} />
      <VoiceMode isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
      
      <main className="w-full flex flex-col overflow-x-hidden">
        <Hero />
        <Problem />
        <Impact />
        <Solution />
        <Technology />
        <Market />
        <Traction />
        <Roadmap />
        <BusinessModel />
        <Team />
        <Vision />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

export default App;
