import { useMemo, useState, useEffect } from 'react';

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
      link: '#',
    },
    {
      title: 'NeuroCodeurs',
      category: 'Hackathon IA',
      description: 'Système intelligent de génération de contenu personnalisé basé sur l’intelligence artificielle.',
      technologies: ['Python', 'Generative AI', 'Machine Learning', 'Data Analysis', 'Data Visualization', 'EDA', 'Git', 'GitHub'],
      link: '#',
    },
    {
      title: 'Site e-commerce de vente de vêtements',
      category: 'Laravel / E-commerce',
      description: 'Conception et développement d’un site e-commerce de vente de vêtements avec Laravel.',
      technologies: ['Laravel', 'Blade', 'JavaScript', 'Bootstrap CSS', 'PHP', 'MySQL'],
      link: '#',
    },
    {
      title: 'Application de gestion de garage',
      category: 'Gestion d’entreprise',
      description: 'Application web de gestion de garage et de véhicules avec Laravel.',
      technologies: ['Laravel', 'Blade', 'PHP', 'MySQL', 'HTML/CSS'],
      link: '#',
    },
  ],
};

function App() {
  const [portfolio, setPortfolio] = useState(defaultPortfolio);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

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
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.errors ? Object.values(data.errors).flat().join(' ') : 'Erreur lors de l’envoi');
      }

      setStatus({ type: 'success', message: data.message });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({ type: 'error', message: error.message || 'Une erreur est survenue.' });
    }
  };

  return (
    <div className="page-shell">
      <header className="topbar">
        <div className="container nav">
          <div className="brand">SORO</div>
          <nav>
            <a href="#about">À propos</a>
            <a href="#skills">Compétences</a>
            <a href="#experience">Expérience</a>
            <a href="#projects">Projets</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">Data Scientist / Développeur IA</p>
              <h1>{profile.name}</h1>
              <h2>{profile.title}</h2>
              <p className="lead">{profile.summary}</p>
              <div className="cta-row">
                <a className="btn btn-primary" href="#projects">Voir mes projets</a>
                <a className="btn btn-secondary" href={`mailto:${profile.email}`}>Me contacter</a>
              </div>

              <div className="mini-links">
                <a href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
                <span>{profile.location}</span>
                <span>{profile.phone}</span>
              </div>
            </div>

            <div className="profile-card">
              <div className="avatar">SL</div>
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
            </div>
          </div>
        </section>

        <section className="stats">
          <div className="container stats-grid">
            {statCards.map((item) => (
              <div key={item.label} className="stat-card">
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="about" className="section">
          <div className="container section-grid">
            <div>
              <p className="section-kicker">À propos</p>
              <h3>Je transforme les données en solutions utiles et intelligentes.</h3>
            </div>
            <div>
              <p>
                Je suis un Data Scientist et développeur IA passionné par la création de solutions qui allient
                analyse de données, apprentissage automatique, intelligence artificielle générative et
                développement d’applications performantes.
              </p>
              <p>
                Mon expertise couvre le développement web Laravel et React.js, la gestion de bases de données
                MySQL, le traitement du langage naturel et les architectures RAG/LLM.
              </p>
            </div>
          </div>
        </section>

        <section id="skills" className="section alt-section">
          <div className="container">
            <p className="section-kicker">Compétences</p>
            <h3>Technologies et domaines d’expertise</h3>

            <div className="skills-grid">
              {Object.entries(skills).map(([group, values]) => (
                <div key={group} className="skill-card">
                  <h4>{group}</h4>
                  <div className="tags">
                    {values.map((value) => (
                      <span key={value} className="tag">
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="container">
            <p className="section-kicker">Expérience</p>
            <h3>Parcours professionnel</h3>

            <div className="timeline">
              {experiences.map((item) => (
                <div key={`${item.role}-${item.company}`} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4>{item.role}</h4>
                      <span>{item.period}</span>
                    </div>
                    <p className="company-name">{item.company} • {item.location}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section alt-section">
          <div className="container">
            <p className="section-kicker">Projets</p>
            <h3>Réalisations marquantes</h3>

            <div className="projects-grid">
              {projects.map((project) => (
                <article key={project.title} className="project-card">
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
                  <a href={project.link}>Voir le projet</a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="container contact-grid">
            <div>
              <p className="section-kicker">Contact</p>
              <h3>Travaillons ensemble sur votre prochain projet.</h3>
              <p>
                Vous cherchez un profil qui allie intelligence artificielle, données et développement web ?
                Écrivez-moi et discutons de votre mission.
              </p>
              <ul className="contact-list">
                <li>{profile.email}</li>
                <li>{profile.phone}</li>
                <li>{profile.location}</li>
              </ul>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Nom
                <input type="text" name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={form.email} onChange={handleChange} required />
              </label>
              <label>
                Message
                <textarea name="message" rows="5" value={form.message} onChange={handleChange} required />
              </label>

              <button type="submit" className="btn btn-primary">Envoyer le message</button>

              {status && (
                <p className={`form-status ${status.type}`}>{status.message}</p>
              )}
            </form>
          </div>
        </section>
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
