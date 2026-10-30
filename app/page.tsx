'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { ChevronDown, Mail, Sparkles } from 'lucide-react'
import {
  experiments,
  experience,
  heroLines,
  nav,
  phases,
  projects,
  skills,
  stack,
  stats,
  type SceneKey,
} from '@/lib/data'
import { lqip } from '@/lib/lqip'

/** Scène de fond associée à chaque section (pilote le backdrop photographique). */
const sceneImages: Record<SceneKey, string> = {
  hero: '/images/scene-hero.webp',
  about: '/images/scene-about.webp',
  skills: '/images/scene-skills.webp',
  experience: '/images/scene-experience.webp',
  projects: '/images/scene-experience.webp',
  lab: '/images/scene-lab.webp',
  contact: '/images/scene-contact.webp',
}

/** Mapping section → index de phase du cycle (pilote la teinte du backdrop). */
const sectionPhase: Record<string, number> = {
  top: 0,
  journey: 0,
  skills: 1,
  experience: 2,
  work: 2,
  lab: 3,
  contact: 4,
}

export default function Page() {
  const [progress, setProgress] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [heroIndex, setHeroIndex] = useState(0)
  const [activeScene, setActiveScene] = useState<SceneKey>('hero')
  const [activeSection, setActiveSection] = useState('top')
  const [activePhase, setActivePhase] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [reduced, setReduced] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [cursorState, setCursorState] = useState<'default' | 'view'>('default')

  /* ------------------------------------------------------------------ */
  /* Effets                                                             */
  /* ------------------------------------------------------------------ */

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    const finish = () => setIsLoading(false)
    if (document.readyState === 'complete') finish()
    else window.addEventListener('load', finish, { once: true })
    return () => window.removeEventListener('load', finish)
  }, [])

  // Rotation du slogan du hero
  useEffect(() => {
    if (reduced) return
    const timer = window.setInterval(
      () => setHeroIndex((current) => (current + 1) % heroLines.length),
      7000,
    )
    return () => window.clearInterval(timer)
  }, [reduced])

  // Scroll : progression + header + phase active du cycle
  useEffect(() => {
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        const scrollable = Math.max(
          1,
          document.documentElement.scrollHeight - window.innerHeight,
        )
        setProgress(Math.min(1, window.scrollY / scrollable))
        setScrolled(window.scrollY > 40)

        // Tant que la section Journey est à l'écran, la phase suit la carte
        // la plus proche du centre du viewport.
        const journey = document.getElementById('journey')
        if (journey) {
          const bounds = journey.getBoundingClientRect()
          const inJourney =
            bounds.top < window.innerHeight * 0.65 &&
            bounds.bottom > window.innerHeight * 0.35
          if (inJourney) {
            const middle = window.innerHeight / 2
            let closest = -1
            let distance = Infinity
            journey
              .querySelectorAll('[data-phase-index]')
              .forEach((card) => {
                const rect = card.getBoundingClientRect()
                const delta = Math.abs(
                  rect.top + rect.height / 2 - middle,
                )
                if (delta < distance) {
                  distance = delta
                  closest = Number(
                    (card as HTMLElement).dataset.phaseIndex ?? -1,
                  )
                }
              })
            if (closest >= 0) setActivePhase(closest)
          }
        }
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Reveal au scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }),
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    )
    document
      .querySelectorAll('.reveal-on-scroll')
      .forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Section active : pilote le nav, la scène et la phase du cycle
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible) return
        const element = visible.target as HTMLElement
        const id = element.dataset.section
        if (!id) return
        setActiveSection(id)
        setActiveScene(element.dataset.scene as SceneKey)
        setActivePhase(sectionPhase[id] ?? 0)
      },
      { threshold: [0.15, 0.4, 0.7], rootMargin: '-20% 0px -35% 0px' },
    )
    document
      .querySelectorAll('[data-section]')
      .forEach((node) => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  // Curseur custom
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    let frame = 0
    const onMove = (event: PointerEvent) => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        frame = 0
        document.documentElement.style.setProperty(
          '--cursor-x',
          `${event.clientX}px`,
        )
        document.documentElement.style.setProperty(
          '--cursor-y',
          `${event.clientY}px`,
        )
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  // Verrouille le scroll quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  /* ------------------------------------------------------------------ */
  /* Données dérivées                                                    */
  /* ------------------------------------------------------------------ */

  const phase = phases[activePhase]

  const sceneStyle = useMemo(
    () =>
      ({
        '--scene-image': `url(${sceneImages[activeScene]})`,
        '--scene-tint': phase.tint,
        '--scene-blend': phase.blend,
        '--scene-grade': phase.grade,
        '--journey': progress,
      }) as React.CSSProperties,
    [activeScene, phase, progress],
  )

  const scrollTo = useCallback((href: string) => {
    document.querySelector(href)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }, [])

  const jumpToPhase = useCallback((index: number) => {
    document
      .querySelector(`[data-phase-index="${index}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  const heroWords = useMemo(() => heroLines[heroIndex].split(' '), [heroIndex])

  return (
    <main
      id="main"
      className={`kingdom ${reduced ? 'reduced-motion' : ''}`}
      style={sceneStyle}
    >
      {isLoading && (
        <div className="cinematic-loader" role="status" aria-live="polite">
          <div className="loader-horizon" />
          <div className="loader-grass" />
          <div className="loader-core">
            <span>RM</span>
          </div>
          <div className="loader-copy">
            <span className="loader-kicker">The Kingdom Within</span>
            <strong>Entering the wild.</strong>
            <span className="loader-status">Loading the experience</span>
          </div>
        </div>
      )}

      {/* Backdrop photographique — change de scène et de teinte selon la phase */}
      <div className="cinematic-backdrop" aria-hidden="true" />

      {/* Barre de progression */}
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* ---------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ---------------------------------------------------------------- */}
      <header className="topbar" data-scrolled={scrolled}>
        <a
          className="brand"
          href="#top"
          aria-label="The Kingdom Within — accueil"
        >
          <span className="brand-mark" aria-hidden="true">
            ◉
          </span>
          <span>
            The Kingdom
            <br />
            <em>Within</em>
          </span>
        </a>

        <div className="top-meta">
          <span>Randy Musafiri</span>
          <span className="status">
            <b aria-hidden="true" /> Available for meaningful work
          </span>
        </div>

        <nav aria-label="Navigation principale">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-index={item.index}
              aria-current={
                activeSection === item.href.slice(1) ? 'true' : undefined
              }
              onClick={(event) => {
                event.preventDefault()
                scrollTo(item.href)
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="menu-toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
        </button>
      </header>

      {/* Menu mobile */}
      <div className="mobile-menu" id="mobile-menu" data-open={menuOpen}>
        {nav.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            style={{ transitionDelay: `${80 + index * 60}ms` }}
            onClick={(event) => {
              event.preventDefault()
              setMenuOpen(false)
              window.setTimeout(() => scrollTo(item.href), 260)
            }}
          >
            <span>{item.index}</span>
            {item.label}
          </a>
        ))}
        <div className="mobile-menu-foot">
          <span>hello@randymusafiri.com</span>
          <span>Paris · Available worldwide</span>
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Rail du cycle                                                     */}
      {/* ---------------------------------------------------------------- */}
      <aside
        className="journey-rail"
        aria-label="Progression dans le cycle de la journée"
      >
        <span className="rail-label">The Cycle</span>
        <div className="rail-track" aria-hidden="true">
          <span style={{ height: `${progress * 100}%` }} />
        </div>
        <ol>
          {phases.map((item, index) => (
            <li
              key={item.id}
              className={index === activePhase ? 'active' : ''}
              onClick={() => jumpToPhase(index)}
            >
              <span>{String(index + 1).padStart(2, '0')}</span>
              {item.label}
            </li>
          ))}
        </ol>
      </aside>

      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="hero" id="top" data-section="top" data-scene="hero">
        <div className="hero-copy">
          <p className="kicker">
            Creative developer · Frontend engineer · Interactive experiences
          </p>
          <h1 className="hero-slogan" key={heroIndex}>
            {heroWords.map((word, index) => (
              <span
                key={`${word}-${index}`}
                style={{ '--i': index } as React.CSSProperties}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-intro">
            Un portfolio comme un territoire vivant. Faites défiler pour traverser
            une journée entière — et découvrir ce qui se construit derrière chaque
            lumière.
          </p>
          <div className="hero-actions">
            <a
              className="primary-cta"
              href="#journey"
              onClick={(event) => {
                event.preventDefault()
                scrollTo('#journey')
              }}
            >
              Explore the kingdom <ChevronDown size={16} />
            </a>
            <a
              className="primary-cta"
              href="mailto:hello@randymusafiri.com"
              style={{ borderBottomColor: 'var(--line)' }}
            >
              <Mail size={15} /> hello@randymusafiri.com
            </a>
          </div>
        </div>

        <div className="hero-caption">
          <span>{phase.clock}</span>
          <span className="caption-line" />
          <span>{phase.label}</span>
          <span className="caption-line" />
          <span>Serengeti · 04°S 34°E</span>
        </div>

        <div className="scroll-cue">
          <span>Scroll to travel</span>
          <ChevronDown size={16} />
        </div>
      </section>

      {/* Bandeau de chiffres */}
      <div className="stats-band" aria-label="Quelques chiffres">
        {stats.map((stat) => (
          <div className="stat" key={stat.label}>
            <b>{stat.value}</b>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Journey — le cycle de la journée                                */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="journey section section-pad"
        id="journey"
        data-section="journey"
        data-scene="about"
      >
        <div className="shell">
          <div className="section-head reveal-on-scroll">
            <div>
              <p className="kicker">One continuous day</p>
              <h2 className="section-title">
                Chaque heure révèle <em>une autre facette.</em>
              </h2>
            </div>
            <p className="lede">
              Le paysage change, mais le fil reste le même : une curiosité qui
              refuse de rester immobile. Voici les cinq moments qui ont construit
              cette pratique.
            </p>
          </div>

          <div className="journey-track">
            {phases.map((item, index) => (
              <article
                key={item.id}
                data-phase-index={index}
                className={`phase-card ${
                  index === activePhase ? 'is-active' : ''
                }`}
              >
                <span className="phase-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="kicker kicker-plain">{item.eyebrow}</p>
                  <h3>{item.title}</h3>
                  <p className="phase-copy">{item.copy}</p>
                </div>
                <div className="phase-meta">
                  <b>{item.label}</b>
                  <span>{item.clock}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Skills — l'expertise                                            */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="section section-pad"
        id="skills"
        data-section="skills"
        data-scene="skills"
      >
        <div className="shell">
          <div className="section-head reveal-on-scroll">
            <div>
              <p className="kicker">Expertise</p>
              <h2 className="section-title">
                Quatre terrains, <em>une même exigence.</em>
              </h2>
            </div>
            <p className="lede">
              De l’intention visuelle à la mise en production, chaque discipline
              sert la même cause : rendre les idées claires, durables et agréables
              à utiliser.
            </p>
          </div>

          <div className="skill-grid reveal-on-scroll">
            {skills.map((skill) => (
              <article className="skill-card" key={skill.title}>
                <h3>{skill.title}</h3>
                <p>{skill.description}</p>
                <div className="skill-tags">
                  {skill.items.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Experience — le parcours                                        */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="section section-pad"
        id="experience"
        data-section="experience"
        data-scene="experience"
      >
        <div className="shell">
          <div className="section-head reveal-on-scroll">
            <div>
              <p className="kicker">Parcours</p>
              <h2 className="section-title">
                Huit années à <em>affûter le geste.</em>
              </h2>
            </div>
            <p className="lede">
              Du studio créatif au produit, chaque étape a ajouté une pièce à
              l’outillage — la direction artistique, l’architecture, la
              performance.
            </p>
          </div>

          <div className="experience-list reveal-on-scroll">
            {experience.map((role) => (
              <article className="role" key={role.period}>
                <p className="role-period">{role.period}</p>
                <div>
                  <h3>{role.role}</h3>
                  <p className="role-studio">
                    {role.studio} · {role.place}
                  </p>
                  <p className="role-summary">{role.summary}</p>
                </div>
                <ul className="role-highlights">
                  {role.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Work — les projets                                               */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="section section-pad"
        id="work"
        data-section="work"
        data-scene="projects"
      >
        <div className="shell">
          <div className="section-head reveal-on-scroll">
            <div>
              <p className="kicker">Field notes</p>
              <h2 className="section-title">
                Des projets qui <em>laissent une trace.</em>
              </h2>
            </div>
            <p className="lede">
              Trois collaborations récentes, entendues comme des territoires : une
              identité, une expérience, une recherche.
            </p>
          </div>

          <div className="project-grid">
            {projects.map((project, index) => (
              <article
                className="project-card reveal-on-scroll"
                key={project.name}
                onPointerEnter={() => setCursorState('view')}
                onPointerLeave={() => setCursorState('default')}
              >
                <div
                  className="project-media"
                  style={{ backgroundImage: `url(${lqip[project.scene]})` }}
                  aria-hidden="true"
                >
                  <img
                    src={project.image}
                    srcSet={`${project.image.replace('.webp', '-md.webp')} 1280w, ${project.image} 1920w`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    alt={`Aperçu du projet ${project.name}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <span className="project-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="project-year">{project.year}</span>
                <p className="project-type">{project.type}</p>
                <h3>{project.name}</h3>
                <p className="project-copy">{project.copy}</p>
                <div className="project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="tech-marquee" aria-hidden="true">
            <div>
              {[...stack, ...stack].map((item, index) => (
                <span key={`${item}-${index}`}>{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Lab — le terrain d'expérimentation                              */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="section section-pad"
        id="lab"
        data-section="lab"
        data-scene="lab"
      >
        <div className="shell">
          <div className="section-head reveal-on-scroll">
            <div>
              <p className="kicker">Lab</p>
              <h2 className="section-title">
                Le terrain d’<em>expérimentation.</em>
              </h2>
            </div>
            <p className="lede">
              Là où aucune commande ne dicte la forme. Des prototypes, des shaders,
              des sons — pour garder le geste vivant.
            </p>
          </div>

          <div className="lab-grid reveal-on-scroll">
            {experiments.map((experiment) => (
              <article className="lab-card" key={experiment.index}>
                <span className="lab-index">{experiment.index}</span>
                <h3>{experiment.title}</h3>
                <p>{experiment.description}</p>
                <span className="lab-tag">{experiment.tag}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Contact                                                          */}
      {/* ---------------------------------------------------------------- */}
      <section
        className="contact"
        id="contact"
        data-section="contact"
        data-scene="contact"
      >
        <div className="shell">
          <div className="constellation" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <svg viewBox="0 0 500 220">
              <path d="M24 166 L142 42 L276 148 L402 58 L477 184" />
            </svg>
          </div>

          <p className="kicker">Night radio</p>
          <h2>
            Every legend begins
            <br />
            with a <em>conversation.</em>
          </h2>
          <a
            className="primary-cta"
            href="mailto:hello@randymusafiri.com"
          >
            Start a conversation <Sparkles size={16} />
          </a>
          <p className="contact-note">
            Designing digital worlds from Paris to everywhere.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <span>© 2026 Randy Musafiri</span>
        <span>The Kingdom Within · A continuous portfolio experience</span>
        <span>
          {phase.label} · {String(activePhase + 1).padStart(2, '0')} / 05
        </span>
      </footer>

      {/* Curseur custom */}
      <div
        className="custom-cursor"
        data-state={cursorState}
        aria-hidden="true"
      >
        <span>{cursorState === 'view' ? 'View' : ''}</span>
      </div>
    </main>
  )
}
