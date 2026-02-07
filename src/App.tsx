import { useState, useEffect } from 'react';

const asciiArt = `
    ██╗   ██╗ █████╗ ███████╗██╗   ██╗
    ██║   ██║██╔══██╗██╔════╝██║   ██║
    ██║   ██║███████║███████╗██║   ██║
    ╚██╗ ██╔╝██╔══██║╚════██║██║   ██║
     ╚████╔╝ ██║  ██║███████║╚██████╔╝
      ╚═══╝  ╚═╝  ╚═╝╚══════╝ ╚═════╝
`;

const skills = [
  'TypeScript', 'React', 'Node.js', 'Python',
  'Go', 'Rust', 'PostgreSQL', 'MongoDB',
  'Docker', 'Kubernetes', 'AWS', 'GCP'
];

const projects = [
  {
    name: 'neural-cli',
    desc: 'A terminal-based neural network visualizer',
    tech: 'Rust, WASM'
  },
  {
    name: 'void-sync',
    desc: 'Real-time distributed file synchronization',
    tech: 'Go, gRPC'
  },
  {
    name: 'pixel-forge',
    desc: 'ASCII art generator from images',
    tech: 'Python, NumPy'
  },
  {
    name: 'mono-db',
    desc: 'Minimalist key-value store',
    tech: 'Rust, LMDB'
  }
];

const experience = [
  {
    role: 'Senior Software Engineer',
    company: 'Terminal Labs',
    period: '2022 — Present',
    desc: 'Building developer tools and infrastructure'
  },
  {
    role: 'Full Stack Developer',
    company: 'Void Systems',
    period: '2020 — 2022',
    desc: 'Distributed systems and real-time applications'
  },
  {
    role: 'Software Engineer',
    company: 'Pixel Inc',
    period: '2018 — 2020',
    desc: 'Frontend architecture and design systems'
  }
];

function TypeWriter({ text, delay = 50, className = '' }: { text: string; delay?: number; className?: string }) {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setDisplayed(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [index, text, delay]);

  return <span className={className}>{displayed}<span className="animate-blink">_</span></span>;
}

function Section({ title, children, delay = 0 }: { title: string; children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <section
      className={`mb-12 md:mb-16 transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <h2 className="text-xs uppercase tracking-[0.3em] mb-6 md:mb-8 border-b border-current pb-2">
        {'// '}{title}
      </h2>
      {children}
    </section>
  );
}

function App() {
  const [loaded, setLoaded] = useState(false);
  const [asciiVisible, setAsciiVisible] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const timer = setTimeout(() => setAsciiVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-white selection:text-black">
      {/* Scanline overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03]">
        <div className="w-full h-full" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.1) 1px, rgba(255,255,255,0.1) 2px)'
        }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Header / ASCII Art */}
        <header className={`mb-16 md:mb-24 transition-all duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <pre
            className={`text-[0.35rem] xs:text-[0.45rem] sm:text-xs md:text-sm leading-tight mb-8 transition-all duration-700 overflow-x-auto ${
              asciiVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            aria-label="VASU"
          >
            {asciiArt}
          </pre>

          <div className="space-y-2">
            <p className="text-sm md:text-base">
              <TypeWriter text="Software Engineer & Open Source Enthusiast" delay={30} />
            </p>
            <p className="text-xs md:text-sm opacity-60 mt-4">
              {'>'} Building tools that respect the terminal
            </p>
          </div>
        </header>

        {/* About */}
        <Section title="ABOUT" delay={800}>
          <div className="space-y-4 text-sm md:text-base leading-relaxed opacity-80">
            <p>
              I craft minimal, efficient software with a focus on developer
              experience and performance. My work spans from low-level systems
              programming to modern web applications.
            </p>
            <p>
              Currently exploring the intersection of terminal interfaces and
              modern tooling. Believer in the UNIX philosophy: do one thing well.
            </p>
          </div>
        </Section>

        {/* Skills */}
        <Section title="SKILLS" delay={1000}>
          <div className="flex flex-wrap gap-2 md:gap-3">
            {skills.map((skill, i) => (
              <span
                key={skill}
                className="border border-white px-3 py-1.5 text-xs md:text-sm hover:bg-white hover:text-black transition-colors duration-200 cursor-default"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </Section>

        {/* Projects */}
        <Section title="PROJECTS" delay={1200}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <article
                key={project.name}
                className="group border border-white/20 p-4 md:p-6 hover:border-white transition-colors duration-300"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <h3 className="text-sm md:text-base mb-2 group-hover:before:content-['►_'] transition-all">
                  {project.name}
                </h3>
                <p className="text-xs md:text-sm opacity-60 mb-3">{project.desc}</p>
                <p className="text-[0.65rem] md:text-xs uppercase tracking-wider opacity-40">
                  {project.tech}
                </p>
              </article>
            ))}
          </div>
        </Section>

        {/* Experience */}
        <Section title="EXPERIENCE" delay={1400}>
          <div className="space-y-6 md:space-y-8">
            {experience.map((exp, i) => (
              <article
                key={i}
                className="border-l border-white/20 pl-4 md:pl-6 hover:border-white transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-2 gap-1">
                  <h3 className="text-sm md:text-base">{exp.role}</h3>
                  <span className="text-xs opacity-40 font-light">{exp.period}</span>
                </div>
                <p className="text-xs md:text-sm opacity-60 mb-1">@ {exp.company}</p>
                <p className="text-xs opacity-40">{exp.desc}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* Contact */}
        <Section title="CONTACT" delay={1600}>
          <div className="space-y-3">
            <a
              href="mailto:vasu@example.com"
              className="block text-sm md:text-base hover:pl-2 transition-all duration-200 group"
            >
              <span className="opacity-40 group-hover:opacity-100">{'>'}</span> vasu@example.com
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm md:text-base hover:pl-2 transition-all duration-200 group"
            >
              <span className="opacity-40 group-hover:opacity-100">{'>'}</span> github.com/vasu
            </a>
            <a
              href="https://twitter.com/Vasu_Devs"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm md:text-base hover:pl-2 transition-all duration-200 group"
            >
              <span className="opacity-40 group-hover:opacity-100">{'>'}</span> @Vasu_Devs
            </a>
          </div>
        </Section>

        {/* ASCII Divider */}
        <div className="text-center opacity-20 my-12 md:my-16 text-xs overflow-x-auto">
          <pre className="inline-block">
{`═══════════════════════════════════════════════════════════════`}
          </pre>
        </div>

        {/* Footer */}
        <footer className="text-center pb-8">
          <p className="text-[0.65rem] md:text-xs opacity-30 tracking-wider">
            Requested by{' '}
            <a
              href="https://twitter.com/Vasu_Devs"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              @Vasu_Devs
            </a>
            {' · '}
            Built by{' '}
            <a
              href="https://twitter.com/clonkbot"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity"
            >
              @clonkbot
            </a>
          </p>
          <p className="text-[0.5rem] md:text-[0.6rem] opacity-20 mt-3 font-light">
            © {new Date().getFullYear()} — All systems nominal
          </p>
        </footer>
      </div>

      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}

export default App;
