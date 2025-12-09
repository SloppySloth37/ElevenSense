// frontend/src/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Zap, RefreshCw, Brain } from "lucide-react";

import TextType from "./components/TextType";
import LiquidEther from "./components/LiquidEther";

import "./App.css";

export default function Home() {
  // FEATURES (from set 2)
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Summaries",
      desc: "Condenses complex stories into quick, actionable insights you can digest in seconds.",
      gradient: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(6,182,212,0.08))",
      iconBg: "linear-gradient(135deg,#14b8a6,#06b6d4)",
    },
    {
      icon: RefreshCw,
      title: "Real-Time Updates",
      desc: "Stay informed with live news feeds that update automatically without refreshing.",
      gradient: "linear-gradient(135deg, rgba(6,182,212,0.12), rgba(59,130,246,0.06))",
      iconBg: "linear-gradient(135deg,#06b6d4,#3b82f6)",
    },
    {
      icon: Zap,
      title: "Smart Personalization",
      desc: "A news feed tailored intelligently to your habits, interests, and reading patterns.",
      gradient: "linear-gradient(135deg, rgba(20,184,166,0.12), rgba(16,185,129,0.06))",
      iconBg: "linear-gradient(135deg,#06b6d4,#10b981)",
    },
  ];

  // HOW IT WORKS STEPS
  const steps = [
    { num: "1", title: "Set Your Interests", desc: "Choose topics and sources you care about." },
    { num: "2", title: "AI Processes", desc: "Our AI analyzes and summarizes the latest stories." },
    { num: "3", title: "Get Summaries", desc: "Receive concise, actionable news instantly." },
    { num: "4", title: "Personalize", desc: "Your feed learns and adapts to your preferences." }
  ];

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="app">
      {/* LIQUID BACKGROUND */}
      <div className="liquid-bg-wrapper">
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={70}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
        />
      </div>

      {/* NAVBAR */}
      <nav>
        <div className="logo">
          <div className="logo-icon"></div>
          <span className="logo-text">ElevenSense</span>
        </div>

        <div className="menu">
          <button onClick={() => scrollToSection("features")}>Features</button>
          <button onClick={() => scrollToSection("how-it-works")}>How it Works</button>
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

      <div style={{ height: "14vh" }} />

      {/* Features TITLE */}
      <div className="features-header">
        <h2 id="features" className="section-title">Features</h2>
        <p className="section-subtitle">Powerful tools that enhance your news experience</p>
      </div>

      {/* FEATURES GRID */}
      <section className="features-section section-fade section-spaced">
        <div className="features-grid">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="feature-card">
                <div className="feature-hover-bg" style={{ background: f.gradient }} />

                <div className="feature-icon-wrap" style={{ background: f.iconBg }}>
                  <Icon className="feature-icon-svg" />
                </div>

                <h3 className="feature-title">{f.title}</h3>
                <p className="feature-desc">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section section-fade section-spaced">
        <div className="how-header">
          <h2 id="how-it-works" className="section-title">How It Works</h2>
          <p className="section-subtitle">Simple. Smart. Seamless.</p>
        </div>

        <div className="steps-container">
          {steps.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-number">{step.num}</div>
              <h4 className="step-title">{step.title}</h4>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA (kept as requested) */}
      <section className="cta-section section-fade section-spaced">
        <div>
          <p className="cta-pill">Stay ahead</p>
          <h3>Join ElevenSense and upgrade your daily briefing.</h3>
          <p className="section-subtitle">
            Personalized insights, lightning delivery, beautiful experience.
          </p>
        </div>
        <Link to="/signup">
          <button className="cta-button large">Create free account</button>
        </Link>
      </section>
    </div>
  );
}
