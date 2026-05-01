import { useState } from "react";
import { MasterScene } from "./components/MasterScene";
import { Navbar } from "./components/Navbar";
import { VoiceMode } from "./components/VoiceMode";
import { CustomCursor } from "./components/CustomCursor";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { Technology } from "./components/Technology";
import { Impact } from "./components/Impact";
import { Market } from "./components/Market";
import { Traction } from "./components/Traction";
import { Pledge } from "./components/Pledge";
import { Roadmap } from "./components/Roadmap";
import { Team } from "./components/Team";
import { Vision } from "./components/Vision";
import { BackedBy } from "./components/BackedBy";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <div className="relative bg-[#070710] selection:bg-[#5B4EE8] selection:text-white">
      <CustomCursor />
      
      {/* Fixed 3D Orchestrator */}
      <MasterScene />

      {/* Global Navigation */}
      <Navbar onVoiceClick={() => setVoiceOpen(true)} />
      
      {/* Cinematic Voice Mode Overlay */}
      <VoiceMode isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
      
      {/* Scrollable Content Overlay */}
      <main className="relative z-10 w-full overflow-hidden">
        <Hero />
        <Problem />
        <Solution />
        <Technology />
        <Impact />
        <Market />
        <Traction />
        <Pledge />
        <Roadmap />
        <Team />
        <Vision />
        <BackedBy />
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
