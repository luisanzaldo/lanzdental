import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';

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

  protesis: "protesis.jpg",

  implantes: "implantes.jpg",

  // New Limpieza Image: Dental Tools/Hygiene
  limpieza: "limpieza.jpg",

  ortodoncia: "ortodoncia.jpg"
};

// --- COMPONENTS ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [mobileMenuOpen]);

  // Hamburger line color logic
  const lineColor = mobileMenuOpen ? '#fff' : (scrolled ? '#002d55' : '#fff');

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="container nav-content">
        {/* CSS Logo -> Bulletproof rendering */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', zIndex: 1003, position: 'relative' }}>
          <div style={{
            width: '32px', height: '32px', background: mobileMenuOpen ? '#fff' : (scrolled ? '#004e92' : '#fff'),
            maskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C7.03 2 3 6.03 3 11v9h18v-9c0-4.97-4.03-9-9-9z\'/%3E%3Cpath d=\'M12 11v6\'/%3E%3C/svg%3E")',
            WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'M12 2C7.03 2 3 6.03 3 11v9h18v-9c0-4.97-4.03-9-9-9z\'/%3E%3Cpath d=\'M12 11v6\'/%3E%3C/svg%3E")',
            WebkitMaskRepeat: 'no-repeat', WebkitMaskSize: 'contain',
            transition: 'background 0.3s ease'
          }}></div>
          <span style={{
            fontFamily: 'Montserrat',
            fontWeight: 800,
            fontSize: '1.25rem',
            color: mobileMenuOpen ? '#fff' : (scrolled ? '#002d55' : '#fff'),
            letterSpacing: '-0.5px',
            transition: 'color 0.3s ease'
          }}>
            LANZ<span style={{ color: mobileMenuOpen ? '#fff' : '#00c6ff' }}>DENTAL</span>
          </span>
        </div>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Servicios</a>
          <a href="#contact">Contacto</a>
          <a href="#privacy">Aviso de Privacidad</a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <div style={{
            width: '24px',
            height: '2px',
            background: lineColor,
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: lineColor,
            margin: '6px 0',
            opacity: mobileMenuOpen ? 0 : 1,
            transition: 'all 0.3s'
          }}></div>
          <div style={{
            width: '24px',
            height: '2px',
            background: lineColor,
            transition: 'all 0.3s',
            transform: mobileMenuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none'
          }}></div>
        </button>
      </div>

      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a>
        <a href="#services" onClick={() => setMobileMenuOpen(false)}>Servicios</a>
        <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contacto</a>
        <a href="#privacy" onClick={() => setMobileMenuOpen(false)}>Aviso de Privacidad</a>
      </div>
    </nav>
  );
};

const Header = () => {
  const yOffset = useParallax(0.5);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retraso entre cada elemento
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 50, damping: 20 } // Rebote suave
    }
  };

  return (
    <header id="home">
      <motion.img
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.35 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        src={IMAGES.hero}
        alt="Consultorio Moderno"
        className="hero-bg"
        style={{ transform: `translateY(${yOffset}px)` }} // Mantenemos parallax
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: '850px' }}
        >
          <motion.span
            variants={itemVariants}
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: '50px',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              marginBottom: '28px',
              letterSpacing: '1.5px',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            ✦ ESPECIALISTAS EN SONRISAS
          </motion.span>

          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: '24px',
              textShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}
          >
            Tu sonrisa merece <br />
            <span style={{
              background: 'linear-gradient(90deg, #6dd5ed, #ffffff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 10px rgba(109, 213, 237, 0.3))'
            }}>perfección</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: '1.35rem',
              maxWidth: '550px',
              opacity: 0.95,
              marginBottom: '48px',
              fontWeight: 400,
              lineHeight: 1.7,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            Combinamos tecnología de vanguardia con un trato humano excepcional para transformar tu salud dental.
          </motion.p>

          <motion.div variants={itemVariants}>
            <motion.a
              href="#contact"
              className="btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                fontSize: '1rem',
                padding: '18px 40px',
                boxShadow: '0 10px 30px rgba(0, 198, 255, 0.4)'
              }}
            >
              Agendar Cita
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

const Information = () => {
  return (
    <section style={{ padding: '80px 0', background: 'white', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, x: -250 }} // Empieza mucho más a la izquierda
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }} // Inicia un poco antes
          transition={{ duration: 1.2, type: "spring", bounce: 0.2 }} // Duración más larga para apreciar el recorrido
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: '0.9rem', color: '#00c6ff', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginBottom: '20px' }}>
            Sobre Nosotros
          </h2>
          <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#002d55', fontWeight: 600, lineHeight: 1.4 }}>
            "Somos una clínica dental especializada en implantes y prótesis, con una larga trayectoria en el sector y avalado por múltiples clientes e instituciones."
          </p>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard3D = ({ item, index }: { item: any, index: number }) => {
  return (
    <div className="service-row" style={{ perspective: '1000px', marginBottom: '100px', display: 'flex', gap: '50px', alignItems: 'center', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse' }}>

      {/* 3D Card Container */}
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, type: "spring", bounce: 0.15 }} // Giro suave y elegante
        style={{
          flex: 1,
          height: '400px',
          position: 'relative',
          transformStyle: 'preserve-3d', // Clave para 3D
          cursor: 'pointer'
        }}
      >
        {/* Front Side (Color/Main Image) */}
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          backfaceVisibility: 'hidden', // Oculta la cara trasera
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
        }}>
          <img
            src={item.img}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Badge Overlay */}
          <div style={{
            position: 'absolute',
            bottom: 20,
            left: 20,
            background: 'rgba(255,255,255,0.9)',
            padding: '8px 16px',
            borderRadius: '20px',
            fontWeight: 'bold',
            color: '#002d55',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}>
            Ver Detalles ↻
          </div>
        </div>

        {/* Back Side (Grayscale/Info - or flipped logic per request) */}
        {/* User asked for: BW -> Flip -> Color. Let's interpret: 
            Initial state (before scroll fully hits): Maybe BW.
            But "give a turn" usually implies seeing both sides.
            
            Let's make a twist: The card flips as it enters. 
            Side A (Back, initially visible if we rotated 180): Grayscale.
            Side B (Front, ends up visible): Color.
            
            Actually, let's keep it simple and elegant:
            The card enters rotating 90deg -> 0deg. It feels like opening a door.
            
            To strictly follow "Flip from BW to Color":
            We need 2 faces.
        */}
      </motion.div>

      {/* Info Text */}
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="service-info"
        style={{ flex: 1 }}
      >
        <div className="service-number" style={{
          fontSize: '5rem', fontWeight: 900, color: '#e2e8f0', lineHeight: 1, marginBottom: '-20px', position: 'relative', zIndex: -1
        }}>0{index + 1}</div>
        <h3 style={{ fontSize: '2.5rem', marginBottom: '16px', color: '#002d55', fontFamily: "'Marble Bold', sans-serif" }}>{item.title}</h3>
        <p style={{ fontSize: '1.2rem', color: '#4a5568', marginBottom: '24px', lineHeight: 1.6 }}>{item.desc}</p>
        <span style={{ color: '#00c6ff', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.1rem' }}>
          CONOCE MÁS <span style={{ fontSize: '1.2rem' }}>→</span>
        </span>
      </motion.div>
    </div>
  );
};

// Type definition for service items
interface ServiceItem {
  title: string;
  desc: string;
  img: string;
}

interface ServiceCardFlipProps {
  item: ServiceItem;
  index: number;
}

// Updated ServiceCard with TRUE 3D FLIP (BW to Color)
const ServiceCardFlip: React.FC<ServiceCardFlipProps> = ({ item, index }) => {
  return (
    <div className="service-row" style={{
      marginBottom: '150px',
      perspective: '1500px' // Perspectiva profunda
    }}>

      {/* 3D Container */}
      <motion.div
        className="service-img-container"
        style={{
          flex: 1,
          height: '400px', // Altura base para escritorio, móvil la controlará vía CSS
          position: 'relative',
          cursor: 'pointer',
          overflow: 'visible', // CRÍTICO: visible para que el 3D no se corte
          perspective: '1500px' // Movido aquí para asegurar contexto 3D directo
        }}
        onMouseMove={(e) => {
          // Optional: Add subtle mouse tilt for extra 3D feel
        }}
      >
        <motion.div
          initial={{ rotateY: 180 }} // Empieza volteado (Viendo la parte de atrás/BW)
          whileInView={{ rotateY: 0 }} // Gira a frente (Color)
          viewport={{ once: true, amount: 0.6 }} // Se voltea cuando está bien visible
          transition={{ duration: 1.5, type: "spring", stiffness: 40, damping: 12 }}
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            position: 'relative'
          }}
        >
          {/* FRONT FACE (Color) - Ends up visible */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%',
            backfaceVisibility: 'hidden', // Importante
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 25px 50px rgba(0,78,146,0.25)'
          }}>
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          {/* BACK FACE (Grayscale) - Starts visible */}
          <div style={{
            position: 'absolute', width: '100%', height: '100%',
            backfaceVisibility: 'hidden',
            borderRadius: '24px',
            overflow: 'hidden',
            transform: 'rotateY(180deg)', // Ya está rotado para el "atrás"
            filter: 'grayscale(100%) brightness(1.1)', // Efecto BW
            boxShadow: '0 25px 50px rgba(0,0,0,0.1)'
          }}>
            <img src={item.img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </motion.div>
      </motion.div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        style={{ flex: 1 }}
      >
        <div className="service-number" style={{
          fontSize: '6rem', fontWeight: 900, color: '#00c6ff', lineHeight: 1, marginBottom: '-30px', position: 'relative', zIndex: -1, opacity: 0.2
        }}>0{index + 1}</div>
        <h3 style={{ fontSize: '3rem', marginBottom: '20px', color: '#0077b6', fontFamily: "'Montserrat', sans-serif", fontWeight: 900 }}>{item.title}</h3>
        <p style={{ fontSize: '1.25rem', color: '#556', marginBottom: '30px', lineHeight: 1.6 }}>{item.desc}</p>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#00b0e4' }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: '#00c6ff', color: 'white', border: 'none', padding: '14px 28px',
            borderRadius: '50px', fontWeight: 700, cursor: 'pointer', fontSize: '0.9rem',
            boxShadow: '0 10px 20px rgba(0, 198, 255, 0.3)'
          }}
        >
          VER DETALLES
        </motion.button>
      </motion.div>

    </div>
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
    <section id="services" style={{ padding: '100px 0', background: '#fcfcfc' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '120px', textAlign: 'center' }}
        >
          <span style={{ color: '#00c6ff', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', fontSize: '0.9rem' }}>Nuestra Especialidad</span>
          <h2 style={{ fontSize: '3.5rem', fontFamily: "'Montserrat', sans-serif", color: '#0077b6', fontWeight: 900, marginTop: '10px' }}>Servicios Premium</h2>
          <div style={{ width: '80px', height: '6px', background: 'linear-gradient(90deg, #0077b6, #0096c7)', margin: '20px auto', borderRadius: '3px' }}></div>
        </motion.div>

        {list.map((item, i) => (
          <ServiceCardFlip key={i} item={item} index={i} />
        ))}
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" style={{
      position: 'relative',
      background: '#2790CB',
      color: 'white',
      padding: '60px 0',
      overflow: 'hidden'
    }}>


      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '40px' }}
        >
          <h2 style={{ fontSize: '3rem', fontFamily: "'Montserrat', sans-serif", fontWeight: 900, marginBottom: '16px', textShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            Contáctanos
          </h2>
          <p style={{ opacity: 0.95, fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300 }}>
            Estamos listos para transformar tu sonrisa. Agenda tu valoración hoy mismo.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="contact-grid"
          style={{ gap: '24px' }}
        >
          {[
            { title: "Ubicación", content: <p style={{ fontSize: '0.95rem' }}>Av. Insurgentes Sur 1337-301,<br />Insurgentes Mixcoac, Benito Juárez,<br />03920, Ciudad de México.</p>, icon: <MapPin size={32} strokeWidth={2} /> },
            { title: "Teléfono", content: <><p style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>+52 55 2775 1104</p><p style={{ opacity: 0.7, fontSize: '0.8rem' }}>Lunes a Viernes: 9am - 7pm</p></>, icon: <Phone size={32} strokeWidth={2} /> },
            { title: "Email", content: <p style={{ fontSize: '1rem', fontWeight: 500 }}>contacto@lanzdental.com</p>, icon: <Mail size={32} strokeWidth={2} /> }
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.2 } }
              }}
              whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 15px 30px rgba(0,0,0,0.2)' }}
              className="contact-card"
              style={{
                background: 'rgba(255, 255, 255, 0.1)', // Vidrio más sutil
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                padding: '30px 20px',
                borderRadius: '20px',
                textAlign: 'center',
                cursor: 'default',
                color: 'white'
              }}
            >
              <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'center' }}>{card.icon}</div>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#fff', fontWeight: 700 }}>{card.title}</h3>
              <div style={{ opacity: 0.9, lineHeight: 1.5 }}>{card.content}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};



const Footer = () => (
  <footer style={{ background: '#0077b6', color: 'rgba(255, 255, 255, 0.8)', padding: '40px 20px', textAlign: 'center', fontSize: '0.9rem' }}>
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
  </>
);

const root = createRoot(document.getElementById('root')!);
root.render(<App />);