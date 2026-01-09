import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

// --- HOOKS ---
const useOnScreen = (options: IntersectionObserverInit) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (ref.current) observer.unobserve(ref.current);
      }
    }, options);
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [options]);

  return [ref, isVisible] as const;
};

const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const handleScroll = () => requestAnimationFrame(() => setOffset(window.scrollY * speed));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);
  return offset;
};

// --- IMAGES (UNSPLASH) ---
// Updated IDs for reliability
const IMAGES = {
  // New Header Image: Modern Dental Office
  hero: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=2000&q=80",

  protesis: "/protesis.jpg",

  implantes: "/implantes.jpg",

  // New Limpieza Image: Dental Tools/Hygiene
  limpieza: "/limpieza.jpg",

  ortodoncia: "/ortodoncia.jpg"
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-content">
        {/* CSS Logo -> Bulletproof rendering */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px', background: scrolled ? '#004e92' : '#fff',
            maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C7.03 2 3 6.03 3 11v9h18v-9c0-4.97-4.03-9-9-9z\'/%3E%3Cpath d=\'M12 11v6\'/%3E%3C/svg%3E")',
            WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C7.03 2 3 6.03 3 11v9h18v-9c0-4.97-4.03-9-9-9z\'/%3E%3Cpath d=\'M12 11v6\'/%3E%3C/svg%3E")',
            WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: 'contain'
          }}></div>
          <span style={{
            fontFamily: 'Montserrat',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: scrolled ? '#002d55' : '#fff',
            letterSpacing: '-0.5px'
          }}>
            LANZ<span style={{ color: scrolled ? '#00c6ff' : '#00c6ff' }}>DENTAL</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
          <a href="#privacy">Aviso de Privacidad</a>
        </div>
      </div>
    </nav>
  );
};

const Header = () => {
  const yOffset = useParallax(0.5);

  return (
    <header id="home">
      <img
        src={IMAGES.hero}
        alt="Consultorio Moderno"
        className="hero-bg"
        style={{ transform: `translateY(${yOffset}px)` }}
      />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div className="anim-wrapper active">
          <span style={{
            display: 'inline-block',
            padding: '8px 16px',
            background: 'rgba(0, 198, 255, 0.2)',
            backdropFilter: 'blur(5px)',
            borderRadius: '50px',
            color: '#fff', // Better contrast on new blue
            fontWeight: 700,
            fontSize: '0.85rem',
            marginBottom: '24px',
            letterSpacing: '1px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            ESPECIALISTAS EN SONRISAS
          </span>
          <h1 className="anim-up" style={{
            fontSize: 'clamp(3rem, 6vw, 5.5rem)',
            fontWeight: 900,
            lineHeight: 1.1,
            marginBottom: '24px',
            maxWidth: '800px'
          }}>
            Tu sonrisa merece <br />
            <span style={{
              background: 'linear-gradient(90deg, #6dd5ed, #ffffff)', // Light gradient for contrast against blue bg
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>perfección.</span>
          </h1>
          <p className="anim-up delay-100" style={{
            fontSize: '1.25rem',
            maxWidth: '500px',
            opacity: 0.9,
            marginBottom: '40px',
            fontWeight: 300
          }}>
            Combinamos tecnología de vanguardia con un trato humano excepcional para transformar tu salud dental.
          </p>
          <div className="anim-up delay-200">
            <a href="#contact" className="btn">Agendar Cita</a>
          </div>
        </div>
      </div>
    </header>
  );
};

const Information = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.4 });
  return (
    <section style={{ padding: '120px 0', background: 'white' }}>
      <div className="container">
        <div ref={ref} className={`anim-wrapper ${isVisible ? 'active' : ''}`} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
          <h2 className="anim-up" style={{ fontSize: '0.9rem', color: '#00c6ff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>Sobre Nosotros</h2>
          <p className="anim-up delay-100" style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: '#002d55', fontWeight: 600, leading: 1.4 }}>
            "Somos una clínica dental especializada en implantes y prótesis, con una larga trayectoria en el sector y avalado por múltiples clientes e instituciones."
          </p>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const list = [
    { title: "Prótesis", desc: "Diseño y fabricación de prótesis dentales que se adaptan perfectamente a tu anatomía.", img: IMAGES.protesis },
    { title: "Implantes", desc: "Recupera la funcionalidad completa de tu boca con implantes de titanio de grado médico.", img: IMAGES.implantes },
    { title: "Limpieza", desc: "Higiene profunda con ultrasonido para prevenir enfermedades periodontales.", img: IMAGES.limpieza },
    { title: "Ortodoncia", desc: "Corrige la alineación de tus dientes con opciones estéticas e invisibles.", img: IMAGES.ortodoncia },
  ];

  return (
    <section id="services" style={{ padding: '100px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '80px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '3rem', color: '#002d55', fontWeight: 800 }}>Nuestros Servicios</h2>
          <div style={{ width: '50px', height: '4px', background: '#00c6ff', margin: '15px auto', borderRadius: '2px' }}></div>
        </div>

        {list.map((item, i) => {
          const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
          return (
            <div key={i} ref={ref} className={`service-row anim-wrapper ${isVisible ? 'active' : ''}`}>
              <div className="service-img-container anim-fade">
                <img src={item.img} alt={item.title} className="service-img" />
              </div>
              <div className="service-info anim-up delay-100">
                <div className="service-number">0{i + 1}</div>
                <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#002d55' }}>{item.title}</h3>
                <p style={{ fontSize: '1.1rem', color: '#4a5568', marginBottom: '24px' }}>{item.desc}</p>
                <span style={{ color: '#00c6ff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  CONOCE MÁS <span style={{ fontSize: '1.2rem' }}>→</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const Contact = () => {
  const [ref, isVisible] = useOnScreen({ threshold: 0.2 });
  return (
    <section id="contact" style={{
      background: 'linear-gradient(135deg, #00c6ff 0%, #0072ff 100%)',
      color: 'white',
      padding: '100px 0'
    }}>
      <div className="container">
        <div ref={ref} className={`anim-wrapper ${isVisible ? 'active' : ''}`} style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 className="anim-up" style={{ fontSize: '3rem', marginBottom: '16px' }}>Contáctanos</h2>
          <p className="anim-up delay-100" style={{ opacity: 0.9, fontSize: '1.2rem' }}>Agenda tu valoración hoy mismo.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Ubicación</h3>
            <p style={{ opacity: 0.9 }}>Av. Insurgentes Sur 1337-301,<br />Insurgentes Mixcoac, Benito Juárez,<br />03920, Ciudad de México.</p>
          </div>
          <div className="contact-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Teléfono</h3>
            <p style={{ fontSize: '1.2rem', fontWeight: 600 }}>+52 55 2775 1104</p>
            <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Lunes a Viernes: 9am - 7pm</p>
          </div>
          <div className="contact-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: '#fff' }}>Email</h3>
            <p style={{ fontSize: '1.1rem' }}>contacto@lanzdental.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [history, setHistory] = useState([{ role: 'bot', text: '¡Hola! ¿Te gustaría agendar una cita?' }]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), [history, isOpen]);

  const send = () => {
    if (!msg.trim()) return;
    setHistory([...history, { role: 'user', text: msg }]);
    setMsg("");
    setTimeout(() => {
      setHistory(h => [...h, { role: 'bot', text: 'Gracias. Un asesor se pondrá en contacto contigo pronto.' }]);
    }, 1000);
  };

  return (
    <>
      <button className="chatbot-btn" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '✕' : '💬'}
      </button>
      <div className={`chat-window ${isOpen ? 'open' : ''}`}>
        <div style={{ background: '#004e92', color: 'white', padding: '16px', fontWeight: 700 }}>Asistente Lanz</div>
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', background: '#f8faff', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map((h, i) => (
            <div key={i} style={{
              alignSelf: h.role === 'user' ? 'flex-end' : 'flex-start',
              background: h.role === 'user' ? '#004e92' : 'white',
              color: h.role === 'user' ? 'white' : '#333',
              padding: '10px 14px', borderRadius: '12px', fontSize: '0.9rem',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              maxWidth: '80%'
            }}>
              {h.text}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
        <div style={{ padding: '12px', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
          <input
            value={msg}
            onChange={e => setMsg(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Escribe aquí..."
            style={{ flex: 1, padding: '8px 12px', borderRadius: '20px', border: '1px solid #ddd', outline: 'none' }}
          />
          <button onClick={send} style={{ background: 'none', border: 'none', color: '#004e92', fontWeight: 700, cursor: 'pointer' }}>Enviar</button>
        </div>
      </div>
    </>
  );
};

const Footer = () => (
  <footer style={{ background: '#001a33', color: '#5c6b7f', padding: '30px', textAlign: 'center', fontSize: '0.85rem' }}>
    © {new Date().getFullYear()} Lanz Dental. Todos los derechos reservados.
  </footer>
);

const App = () => (
  <>
    <Navbar />
    <Header />
    <Information />
    <Services />
    <Contact />
    <Footer />
    <Chatbot />
  </>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);