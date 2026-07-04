import { useState, useEffect, useRef } from "react";
import { Github, Twitter, Linkedin, Mail, ExternalLink, ArrowUpRight, Music, Camera, BookOpen, Coffee, Gamepad2, Plane, Menu, X } from "lucide-react";

const NAV_LINKS = ["Work", "About", "Hobbies", "Contact"];

const PROJECTS = [
  {
    title: "Neural Retrieval Engine",
    category: "Machine Learning · Backend",
    year: "2024",
    description: "A dense retrieval system combining bi-encoder embeddings with BM25 sparse signals for hybrid semantic search at scale. Serves 10M+ queries/day with sub-50ms p99 latency.",
    tags: ["Python", "PyTorch", "FAISS", "FastAPI", "Redis"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "Distributed Training Framework",
    category: "ML Infrastructure",
    year: "2024",
    description: "A lightweight wrapper around PyTorch DDP and FSDP that abstracts multi-node GPU training, checkpoint management, and experiment tracking with minimal boilerplate.",
    tags: ["Python", "PyTorch", "CUDA", "Kubernetes", "W&B"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "Real-Time Anomaly Detector",
    category: "ML · Data Engineering",
    year: "2023",
    description: "A streaming anomaly detection pipeline for infrastructure metrics using an LSTM autoencoder fine-tuned per service. Reduced MTTD by 60% versus threshold-based alerting.",
    tags: ["Python", "Kafka", "TensorFlow", "ClickHouse", "Grafana"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
  {
    title: "Voxel Survival Engine",
    category: "Game Development · Graphics",
    year: "2023",
    description: "A custom voxel game engine with chunk-based world generation, greedy meshing, dynamic lighting, and a component-entity system. Built from scratch in C++ with OpenGL — no game engine used.",
    tags: ["C++", "OpenGL", "GLSL", "CMake"],
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop&auto=format",
    link: "#",
  },
];

const HOBBIES = [
  {
    icon: Music,
    title: "Music Production",
    description: "Producing ambient and lo-fi tracks in Ableton. Currently experimenting with granular synthesis and generative composition.",
  },
  {
    icon: Camera,
    title: "Film Photography",
    description: "Shooting 35mm on a Canon AE-1. Mostly street and architecture — capturing the geometry hidden in everyday spaces.",
  },
  {
    icon: BookOpen,
    title: "Reading",
    description: "Mostly non-fiction: design history, cognitive science, and the occasional sprawling novel. Currently: \"The Design of Everyday Things.\"",
  },
  {
    icon: Plane,
    title: "Slow Travel",
    description: "Prioritizing depth over breadth — spending weeks in a place rather than days. Last trip: three weeks in Lisbon and Porto.",
  },
  {
    icon: Coffee,
    title: "Specialty Coffee",
    description: "Home barista with a V60 obsession. Tracking roasters, origins, and brew recipes with maybe too much spreadsheet precision.",
  },
  {
    icon: Gamepad2,
    title: "Competitive Gaming",
    description: "High-ranked in multiple competitive titles. Gaming is what got me into programming — dissecting game mechanics, studying pro play, and optimising performance translates surprisingly well to engineering instincts.",
  },
];

const SOCIALS = [
  { icon: Github, label: "GitHub", handle: "@yourhandle", href: "#" },
  { icon: Twitter, label: "X / Twitter", handle: "@yourhandle", href: "#" },
  { icon: Linkedin, label: "LinkedIn", handle: "Your Name", href: "#" },
  { icon: Mail, label: "Email", handle: "hello@yoursite.com", href: "mailto:hello@yoursite.com" },
];

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState("");
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(["work", "about", "hobbies", "contact"]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md border-b border-border" : ""
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="text-foreground font-medium tracking-tight hover:text-primary transition-colors"
            style={{ fontFamily: "'Instrument Serif', serif", fontSize: "1.1rem" }}
          >
            Your Name
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const id = link.toLowerCase();
              return (
                <button
                  key={link}
                  onClick={() => scrollTo(id)}
                  className={`text-sm tracking-wide transition-colors ${
                    activeSection === id
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link}
                </button>
              );
            })}
            <a
              href="mailto:hello@yoursite.com"
              className="text-sm px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all rounded-sm"
            >
              Hire me
            </a>
          </nav>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden bg-background border-b border-border px-6 pb-6 pt-2 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-left text-foreground text-base hover:text-primary transition-colors"
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Hero */}
      <section
        id="hero"
        className="min-h-screen flex flex-col justify-end px-6 pb-20 pt-32 max-w-6xl mx-auto"
      >
        <div className="grid md:grid-cols-[1fr_auto] gap-12 items-end">
          <div>
            <p
              className="text-primary text-sm tracking-[0.2em] uppercase mb-6 font-medium"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Graduate Student · SWE · ML · Game Dev
            </p>
            <h1
              className="text-foreground leading-[1.05] mb-8"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(3.5rem, 10vw, 8rem)",
                fontWeight: 400,
              }}
            >
              Building systems
              <br />
              that <em>learn,</em> scale,
              <br />
              and ship.
            </h1>
            <p className="text-muted-foreground text-lg max-w-lg leading-relaxed">
              I&apos;m a graduate student in Computer Science with a focus on machine learning. I love turning research ideas into working systems — and I&apos;m actively seeking summer 2025 internships in SWE and ML engineering.
            </p>
          </div>
          <div className="flex md:flex-col gap-4 items-start md:items-end pb-1">
            {SOCIALS.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border flex items-center justify-between">
          <div className="flex gap-12">
            {[
              { label: "GPA", value: "3.9" },
              { label: "Projects built", value: "20+" },
              { label: "Open source stars", value: "800+" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div
                  className="text-foreground text-2xl font-medium mb-0.5"
                  style={{ fontFamily: "'Instrument Serif', serif" }}
                >
                  {value}
                </div>
                <div
                  className="text-muted-foreground text-xs tracking-wide"
                  style={{ fontFamily: "'DM Mono', monospace" }}
                >
                  {label}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scrollTo("work")}
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            View work <ArrowUpRight size={14} />
          </button>
        </div>
      </section>

      {/* Work */}
      <section id="work" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <h2
            className="text-foreground"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
            }}
          >
            Selected Work
          </h2>
          <p
            className="text-muted-foreground text-xs tracking-widest uppercase hidden md:block"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            2023–2024
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-px bg-border">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">
          <div className="sticky top-24">
            <p
              className="text-primary text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              About
            </p>
            <h2
              className="text-foreground mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
              }}
            >
              A little about me.
            </h2>
            <div className="aspect-[4/5] overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop&auto=format"
                alt="Portrait"
                className="w-full h-full object-cover grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="space-y-8 pt-12 md:pt-16">
            <p className="text-foreground text-lg leading-relaxed">
              I&apos;m a CS graduate student with a research focus on machine learning — specifically efficient training, representation learning, and applying ML to real-world systems. I also build games for fun, which is honestly what got me into programming in the first place.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Outside of coursework, I spend most of my time on personal projects and open source — building things from scratch is how I actually learn. I&apos;ve interned as a software engineer and done undergraduate research in NLP, which gave me a solid foundation on both the systems and the theory side.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I&apos;m actively looking for summer 2025 internships in software engineering or ML engineering where I can contribute meaningfully and keep growing fast.
            </p>

            <div className="pt-4 border-t border-border">
              <p
                className="text-xs text-muted-foreground tracking-widest uppercase mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Education
              </p>
              <div className="space-y-4">
                {[
                  {
                    degree: "M.S. Computer Science",
                    school: "Your University",
                    years: "2024 – Present",
                    note: "Focus: Machine Learning & Systems",
                  },
                  {
                    degree: "B.S. Computer Science",
                    school: "Your Undergrad University",
                    years: "2020 – 2024",
                    note: "Graduated with Honors · Dean's List",
                  },
                ].map((edu) => (
                  <div key={edu.degree} className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-foreground text-sm font-medium">{edu.degree}</div>
                      <div className="text-muted-foreground text-sm">{edu.school}</div>
                      <div
                        className="text-muted-foreground text-xs mt-0.5"
                        style={{ fontFamily: "'DM Mono', monospace" }}
                      >
                        {edu.note}
                      </div>
                    </div>
                    <span
                      className="text-muted-foreground text-xs shrink-0"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {edu.years}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <p
                className="text-xs text-muted-foreground tracking-widest uppercase mb-4"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                Tools & Craft
              </p>
              <div className="flex flex-wrap gap-2">
                {["Python", "PyTorch", "JAX", "C++", "Rust", "Go", "CUDA", "OpenGL", "Kubernetes", "Kafka", "PostgreSQL", "FAISS"].map((tool) => (
                  <span
                    key={tool}
                    className="text-xs px-3 py-1 border border-border text-muted-foreground"
                    style={{ fontFamily: "'DM Mono', monospace" }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hobbies */}
      <section id="hobbies" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="mb-16">
          <p
            className="text-primary text-xs tracking-[0.2em] uppercase mb-4"
            style={{ fontFamily: "'DM Mono', monospace" }}
          >
            Outside of work
          </p>
          <h2
            className="text-foreground"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 400,
            }}
          >
            Things that keep me curious.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
          {HOBBIES.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="bg-background p-8 group hover:bg-card transition-colors duration-200"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-border rounded-sm mb-6 text-muted-foreground group-hover:text-primary group-hover:border-primary transition-colors">
                <Icon size={18} />
              </div>
              <h3
                className="text-foreground text-base font-medium mb-3"
                style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400, fontSize: "1.125rem" }}
              >
                {title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-28 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-20 items-start">
          <div>
            <p
              className="text-primary text-xs tracking-[0.2em] uppercase mb-4"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Get in touch
            </p>
            <h2
              className="text-foreground mb-6"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              Let&apos;s solve
              <br />
              something
              <br />
              <em>hard together.</em>
            </h2>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              I&apos;m actively looking for summer 2025 internships in software engineering and ML engineering. If you&apos;re hiring or just want to talk about something technically interesting, reach out.
            </p>
            <a
              href="mailto:hello@yoursite.com"
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Say hello <ArrowUpRight size={14} />
            </a>
          </div>

          <div className="space-y-1 pt-4">
            <p
              className="text-xs text-muted-foreground tracking-widest uppercase mb-6"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              Find me on
            </p>
            {SOCIALS.map(({ icon: Icon, label, handle, href }) => (
              <a
                key={label}
                href={href}
                className="flex items-center justify-between p-4 border border-border hover:border-primary/40 hover:bg-card group transition-all"
              >
                <div className="flex items-center gap-4">
                  <Icon size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  <div>
                    <div className="text-foreground text-sm font-medium">{label}</div>
                    <div
                      className="text-muted-foreground text-xs"
                      style={{ fontFamily: "'DM Mono', monospace" }}
                    >
                      {handle}
                    </div>
                  </div>
                </div>
                <ExternalLink size={13} className="text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8 max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p
          className="text-muted-foreground text-xs"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          © 2024 Your Name. Built with React, deployed with care.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          style={{ fontFamily: "'DM Mono', monospace" }}
        >
          Back to top ↑
        </button>
      </footer>
    </div>
  );
}

function ProjectCard({ project }: { project: typeof PROJECTS[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={project.link}
      className="block bg-background p-8 group relative overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="mb-6 overflow-hidden aspect-video bg-muted">
        <img
          src={project.image}
          alt={project.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-105" : "scale-100"
          } opacity-70 group-hover:opacity-90`}
        />
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className="text-primary text-xs tracking-widest uppercase"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {project.category}
            </span>
            <span
              className="text-muted-foreground text-xs"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {project.year}
            </span>
          </div>
          <h3
            className="text-foreground text-xl mb-3"
            style={{ fontFamily: "'Instrument Serif', serif", fontWeight: 400 }}
          >
            {project.title}
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 border border-border text-muted-foreground"
                style={{ fontFamily: "'DM Mono', monospace" }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <ArrowUpRight
          size={18}
          className={`text-muted-foreground flex-shrink-0 mt-1 transition-all duration-200 ${
            hovered ? "text-primary -translate-y-0.5 translate-x-0.5" : ""
          }`}
        />
      </div>
    </a>
  );
}
