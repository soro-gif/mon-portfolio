import { useMemo, useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SkillBadge from './SkillBadge';


import {
  faArrowUpRightFromSquare,
  faBrain,
  faChartLine,
  faCode,
  faDatabase,
  faEnvelope,
  faLocationDot,
  faPaperPlane,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub as faGithubBrand, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const apiBase = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api';

const defaultPortfolio = {
  profile: {
    name: 'SORO Lamoussa',
    title: 'Data Scientist / Développeur IA',
    location: 'Abidjan',
    phone: '+225 0153898969',
    email: 'sorolamoussa1212@gmail.com',
    github: 'https://github.com/soro-gif',
    linkedin: 'https://www.linkedin.com/in/lamoussa-soro-629055144',
    summary:
      'Data Scientist & Spécialiste GenAI, avec 4 ans d’expérience en gestion de base de données et supervision qualité pour l’ONG IDEAL INTER, combinée à une expertise en développement web (Laravel, React.js).',
  },
  skills: {
    Langages: ['Python', 'JavaScript', 'PHP', 'HTML5', 'CSS3', 'SQL'],
    'AI & ML': ['Machine Learning', 'Deep Learning', 'NLP', 'IA générative', 'Prompt Engineering', 'RAG', 'LLM', 'Scikit-learn', 'TensorFlow'],
    Web: ['React.js', 'Laravel', 'Blade', 'Bootstrap CSS'],
    Data: ['MySQL', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter Notebook'],
    IoT: ['ESP32', 'Arduino'],
    Outils: ['Git', 'GitHub', 'Postman', 'Selenium IDE', 'Ollama', 'Hugging Face', 'ChatGPT', 'Claude Code', 'Gemini'],
  },
  experiences: [
    {
      role: 'Gestionnaire de Base de Données & Superviseur',
      company: 'ONG IDEAL INTER',
      location: 'Korhogo',
      period: '2021 - 2025',
      description: 'Gestion, saisie, contrôle et analyse des données de plus de 3 000 bénéficiaires dans la base de données PNOEV.',
    },
    {
      role: 'Développeur Web',
      company: 'ONG IDEAL INTER',
      location: 'Korhogo',
      period: '2021 – 2025',
      description: 'Conception et mise en ligne du site web institutionnel avec WordPress et gestion des contenus.',
    },
    {
      role: 'Développement d’un système IoT de surveillance environnementale',
      company: 'Projet de Master',
      location: 'Korhogo',
      period: '2025 - 2026',
      description: 'Conception d’un système IoT de surveillance environnementale basé sur ESP32.',
    },
  ],
  projects: [
    {
      title: 'Projet de fin d’études - Bootcamp Generative AI & Machine Learning',
      category: 'IA générative',
      description: 'Conception et développement d’une solution d’IA générative capable de produire des résumés et interprétations de projets de loi adaptés à différents publics.',
      technologies: ['Python', 'Generative AI', 'Machine Learning', 'NLP', 'LLM', 'Prompt Engineering'],
      link: 'https://github.com/soro-gif',
      image:
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'NeuroCodeurs',
      category: 'Hackathon IA',
      description: 'Système intelligent de génération de contenu personnalisé basé sur l’intelligence artificielle.',
      technologies: ['Python', 'Generative AI', 'Machine Learning', 'Data Analysis', 'Data Visualization', 'EDA', 'Git', 'GitHub'],
      link: 'https://github.com/soro-gif',
      image:
        'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Site e-commerce de vente de vêtements',
      category: 'Laravel / E-commerce',
      description: 'Conception et développement d’un site e-commerce de vente de vêtements avec Laravel.',
      technologies: ['Laravel', 'Blade', 'JavaScript', 'Bootstrap CSS', 'PHP', 'MySQL'],
      link: 'https://github.com/soro-gif',
      image:
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80',
    },
    {
      title: 'Application de gestion de garage',
      category: 'Gestion d’entreprise',
      description: 'Application web de gestion de garage et de véhicules avec Laravel.',
      technologies: ['Laravel', 'Blade', 'PHP', 'MySQL', 'HTML/CSS'],
      link: 'https://github.com/soro-gif',
      image:
        'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80',
    },
  ],
};

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    const match = String(value).match(/^(\d+)(.*)$/);
    if (!match || !isInView) return;
    
    const target = parseInt(match[1], 10);
    const duration = 1000; // 1 second
    const fps = 60;
    const steps = duration / (1000 / fps);
    const increment = target / steps;
    
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 1000 / fps);
    
    return () => clearInterval(timer);
  }, [value, isInView]);

  const match = String(value).match(/^(\d+)(.*)$/);
  if (!match) {
    return <strong>{value}</strong>;
  }

  return <strong ref={ref}>{count}{match[2]}</strong>;
}

function App() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetch(`${apiBase}/portfolio`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setPortfolio(data);
      } catch (error) {
        console.warn('Using default portfolio data because API is unavailable.', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  const profile = portfolio.profile || defaultPortfolio.profile;
  const skills = portfolio.skills || defaultPortfolio.skills;
  const experiences = portfolio.experiences || defaultPortfolio.experiences;
  const projects = portfolio.projects || defaultPortfolio.projects;

  const statCards = useMemo(
    () => [
      { label: 'Années d’expérience', value: '4+' },
      { label: 'Projets IA', value: '10+' },
      { label: 'Stack', value: 'Laravel + React' },
      { label: 'Bases de données', value: 'MySQL' },
    ],
    []
  );

  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Compétences', href: '#skills' },
    { label: 'Expérience', href: '#experience' },
    { label: 'Projets', href: '#projects' },
    { label: 'Contact', href: '#contact', mobileOnly: true },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours...' });

    try {
      const response = await fetch(`${apiBase}/contact`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? Object.values(data.errors).flat().join(' ') : 'Erreur lors de l’envoi');
      }

      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Une erreur est survenue.' });
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav-shell">
          <div className="brand-block">
            <a 
              href="#" 
              className="brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              SORO
            </a>
            <span className="brand-tag">Data & IA</span>
          </div>

          <button
            type="button"
            className="nav-toggle"
            aria-label="Ouvrir le menu"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
            <span className={mobileMenuOpen ? 'open' : ''} />
          </button>

          <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                className={item.mobileOnly ? 'mobile-only-link' : ''}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a className="nav-cta" href="#contact">
            Me contacter
          </a>
        </div>
      </header>

      <main>
        <motion.section 
          id="home"
          className="hero"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container hero-grid">
            <motion.div variants={fadeInUp}>
              <p className="eyebrow">Data Scientist / Développeur IA</p>
              <h1>{profile.name}</h1>
              <h2>{profile.title}</h2>
              <p className="lead">{profile.summary}</p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#projects">Voir mes projets</a>
                <a className="btn btn-secondary" href={`mailto:${profile.email}`}>Me contacter</a>
                <a className="btn btn-secondary" href="/CV.pdf" download>
                  Télécharger le CV
                </a>
              </div>

              <div className="mini-links">
                <a href={profile.github} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faGithubBrand} /> GitHub
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  <FontAwesomeIcon icon={faLinkedinIn} /> LinkedIn
                </a>
                <span>
                  <FontAwesomeIcon icon={faLocationDot} /> {profile.location}
                </span>
                <span>
                  <FontAwesomeIcon icon={faPhone} /> {profile.phone}
                </span>
              </div>
            </motion.div>

            <motion.div className="profile-card" variants={fadeInUp}>
              <div className="illustration-frame">
                <img
                  src="/profile.png"
                  alt="Photo de profil de SORO Lamoussa"
                />
              </div>

              <div className="mini-visual-badge">
                <FontAwesomeIcon icon={faChartLine} />
                <span>AI & Data</span>
              </div>

              <div className="card-grid">
                <div>
                  <small>Localisation</small>
                  <strong>{profile.location}</strong>
                </div>
                <div>
                  <small>Email</small>
                  <strong>{profile.email}</strong>
                </div>
                <div>
                  <small>Disponibilité</small>
                  <strong>Disponible</strong>
                </div>
                <div>
                  <small>Focus</small>
                  <strong>GenAI / Data</strong>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          className="stats"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container stats-grid">
            {statCards.map((item) => (
              <motion.div key={item.label} className="stat-card" variants={fadeInUp}>
                <AnimatedNumber value={item.value} />
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          id="about" 
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container section-grid">
            <motion.div variants={fadeInUp}>
              <p className="section-kicker">À propos</p>
              <h3>Je transforme les données en solutions utiles et intelligentes.</h3>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <p>
                Je suis un Data Scientist et développeur IA passionné par la création de solutions qui allient
                analyse de données, apprentissage automatique, intelligence artificielle générative et
                développement d’applications performantes.
              </p>
              <p>
                Mon expertise couvre le développement web Laravel et React.js, la gestion de bases de données
                MySQL, le traitement du langage naturel et les architectures RAG/LLM.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="skills" 
          className="section alt-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container">
            <motion.p className="section-kicker" variants={fadeInUp}>Compétences</motion.p>
            <motion.h3 variants={fadeInUp}>Technologies et domaines d’expertise</motion.h3>

            <motion.div className="skills-grid" variants={staggerContainer}>
              {Object.entries(skills).map(([group, values]) => (
                <motion.div key={group} className="skill-card" variants={fadeInUp}>
                  <h4>{group}</h4>
                  <div className="tags">
                    {values.map((value) => (
                      <SkillBadge key={value} name={value} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="experience" 
          className="section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container">
            <motion.p className="section-kicker" variants={fadeInUp}>Expérience</motion.p>
            <motion.h3 variants={fadeInUp}>Parcours professionnel</motion.h3>

            <motion.div className="timeline" variants={staggerContainer}>
              {experiences.map((item) => (
                <motion.div key={`${item.role}-${item.company}`} className="timeline-item" variants={fadeInUp}>
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{item.role}</h4>
                      <span>{item.period}</span>
                    </div>
                    <p className="company-name">{item.company} • {item.location}</p>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="projects" 
          className="section alt-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
        >
          <div className="container">
            <motion.p className="section-kicker" variants={fadeInUp}>Projets</motion.p>
            <motion.h3 variants={fadeInUp}>Réalisations marquantes</motion.h3>

            <motion.div className="projects-grid" variants={staggerContainer}>
              {projects.map((project) => (
                <motion.article key={project.title} className="project-card" variants={fadeInUp}>
                  <div className="project-image-wrap">
                    <img src={project.image} alt={project.title} className="project-image" />
                  </div>
                  <div className="project-header">
                    <span className="project-tag">{project.category}</span>
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.description}</p>
                  <div className="tags compact-tags">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="tag small-tag">{tech}</span>
                    ))}
                  </div>
                  <a href={project.link} target="_blank" rel="noreferrer" className="project-link">
                    Voir le projet <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <motion.section 
          id="contact" 
          className="section contact-section"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="container contact-grid">
            <motion.div variants={fadeInUp}>
              <p className="section-kicker">Contact</p>
              <h3>Travaillons ensemble sur votre prochain projet.</h3>
              <p>
                Vous cherchez un profil qui allie intelligence artificielle, données et développement web ?
                Écrivez-moi et discutons de votre mission.
              </p>
              <ul className="contact-list">
                <li>
                  <FontAwesomeIcon icon={faEnvelope} /> {profile.email}
                </li>
                <li>
                  <FontAwesomeIcon icon={faPhone} /> {profile.phone}
                </li>
                <li>
                  <FontAwesomeIcon icon={faLocationDot} /> {profile.location}
                </li>
              </ul>
            </motion.div>

            <motion.form className="contact-form" onSubmit={handleSubmit} variants={fadeInUp}>
              <label>
                Nom
                <input type="text" name="name" placeholder="Votre nom complet" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" placeholder="vous@exemple.com" value={form.email} onChange={handleChange} required />
              </label>
              <label>
                Objet
                <input type="text" name="subject" placeholder="Sujet de votre message" value={form.subject} onChange={handleChange} required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" placeholder="Comment puis-je vous aider ?" value={form.message} onChange={handleChange} required />
              </label>

              <button type="submit" className="btn btn-primary">
                <FontAwesomeIcon icon={faPaperPlane} /> Envoyer le message
              </button>

              {status && (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              )}
            </motion.form>
          </div>
        </motion.section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <span>© {new Date().getFullYear()} SORO Lamoussa</span>
          <span>Data Scientist • Développeur IA</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
