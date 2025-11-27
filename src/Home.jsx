import { Link } from "react-router-dom";
import TextType from "./components/TextType";
import LiquidEther from "./components/LiquidEther";
import ScrollFloat from "./components/ScrollFloat";
import ScrollStack, { ScrollStackItem } from "./components/ScrollStack";
import "./App.css";

export default function Home() {
  return (
    <div className="app">

      {/* LIQUID BACKGROUND */}
      <div className="liquid-bg-wrapper">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={70}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={2800}
          autoRampDuration={0.6}
        />
      </div>

      {/* NAVBAR */}
      <nav>
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">ElevenSense</span>
        </div>

        <div className="menu">
          <button>Features</button>
          <button>How it works</button>
        </div>

        <Link to="/login">
          <button className="cta-button">Get Started</button>
        </Link>
      </nav>

      <div className="hero-glow"></div>

      {/* HERO */}
      <div className="hero-wrapper">
        <div className="hero-pill">Powered by Advanced AI</div>

        <h1 className="hero-title">
          <span>News </span>
          <TextType
            text={["Reimagined", "Made Smarter", "Upgraded with AI"]}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor={true}
            cursorCharacter="|"
            className="inline-text-type"
          />
        </h1>

        <p className="hero-description">
          Get AI-powered summaries of the latest news, personalized to your
          interests. Stay informed faster with ElevenSense.
        </p>
      </div>

      <div style={{ height: "25vh" }} />

      {/* FEATURES TITLE (Animated) */}
      <ScrollFloat
        animationDuration={1.4}
        ease="back.inOut(1.8)"
        scrollStart="top 90%"
        scrollEnd="bottom 65%"
        stagger={0.1}
      >
        Features
      </ScrollFloat>

      <div style={{ height: "20vh" }} />

      {/* STACKING CARDS */}
      <ScrollStack useWindowScroll={true}>
        <ScrollStackItem>
          <h2>AI-Powered Summaries</h2>
          <p>Condenses complex stories into quick insights.</p>
        </ScrollStackItem>

        <ScrollStackItem>
          <h2>Real-Time Updates</h2>
          <p>Stay informed without refreshing manually.</p>
        </ScrollStackItem>

        <ScrollStackItem>
          <h2>Smart Personalization</h2>
          <p>A news feed tailored intelligently to your habits.</p>
        </ScrollStackItem>
      </ScrollStack>

      <div style={{ height: "70vh" }} />
    </div>
  );
}
