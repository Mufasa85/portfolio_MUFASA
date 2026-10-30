export type SceneKey =
  | 'hero'
  | 'about'
  | 'skills'
  | 'experience'
  | 'projects'
  | 'lab'
  | 'contact'

export type Phase = {
  id: string
  label: string
  clock: string
  eyebrow: string
  title: string
  copy: string
  scene: SceneKey
  /** Teinte appliquée sur la photo de fond pendant cette phase du cycle. */
  tint: string
  /** Mode de fusion de la teinte : `overlay` garde la photo, `color` la recolore. */
  blend: 'overlay' | 'color' | 'soft-light'
  /** Valeur du filtre de saturation/luminosité du backdrop. */
  grade: string
}

export const phases: Phase[] = [
  {
    id: 'dawn',
    label: 'Aube',
    clock: '05:42',
    eyebrow: '01 — L’origine',
    title: 'Naissance de la passion',
    copy: 'Tout commence au ras du sol. Une curiosité devient une direction, puis une manière de regarder le monde.',
    scene: 'about',
    tint: 'rgba(255, 138, 58, .34)',
    blend: 'soft-light',
    grade: 'saturate(1.02) contrast(1.04) brightness(1.02)',
  },
  {
    id: 'noon',
    label: 'Midi',
    clock: '12:15',
    eyebrow: '02 — L’apprentissage',
    title: 'Construire avec précision',
    copy: 'Les idées se transforment en systèmes. Chaque compétence devient une pierre sur laquelle avancer.',
    scene: 'skills',
    tint: 'rgba(255, 214, 150, .2)',
    blend: 'overlay',
    grade: 'saturate(.94) contrast(1.06) brightness(1.06)',
  },
  {
    id: 'golden',
    label: 'Golden Hour',
    clock: '18:30',
    eyebrow: '03 — L’expertise',
    title: 'Donner une forme aux idées',
    copy: 'Les meilleurs projets prennent vie quand le craft, la narration et la technologie avancent dans la même direction.',
    scene: 'experience',
    tint: 'rgba(255, 168, 62, .32)',
    blend: 'soft-light',
    grade: 'saturate(1.06) contrast(1.03) brightness(1)',
  },
  {
    id: 'dusk',
    label: 'Crépuscule',
    clock: '20:45',
    eyebrow: '04 — La vision',
    title: 'Transformer l’intuition en direction',
    copy: 'La réflexion devient une méthode. J’explore les nouveaux usages, les récits interactifs et les systèmes qui donnent une forme claire aux idées de demain.',
    scene: 'lab',
    tint: 'rgba(96, 84, 176, .34)',
    blend: 'overlay',
    grade: 'saturate(.86) contrast(1.08) brightness(.9)',
  },
  {
    id: 'night',
    label: 'Nuit étoilée',
    clock: '23:10',
    eyebrow: '05 — La connexion',
    title: 'Relier les bonnes personnes',
    copy: 'Les compétences et les réalisations se répondent comme des constellations. Une collaboration commence par une conversation, puis devient une trajectoire commune.',
    scene: 'contact',
    tint: 'rgba(38, 62, 120, .46)',
    blend: 'color',
    grade: 'saturate(.72) contrast(1.1) brightness(.82)',
  },
]

export const heroLines = [
  'Build what you feel.',
  'Make the invisible visible.',
  'Create with intention.',
]

export type Skill = {
  title: string
  description: string
  items: string[]
}

export const skills: Skill[] = [
  {
    title: 'Direction artistique',
    description:
      'Définir une identité, un ton et un système visuel cohérents avant la première ligne de code.',
    items: ['Identité visuelle', 'Direction photo', 'Design system', 'Motion language'],
  },
  {
    title: 'Ingénierie front-end',
    description:
      'Des interfaces rapides, accessibles et maintenables, construites pour durer au-delà de la démo.',
    items: ['React · Next.js', 'TypeScript', 'WebGL · Three.js', 'Performance'],
  },
  {
    title: 'Interaction & mouvement',
    description:
      'Le mouvement au service de la compréhension : guider, révéler, confirmer — jamais distraire.',
    items: ['GSAP · Motion', 'Scroll-driven', 'Micro-interactions', 'Prototypage'],
  },
  {
    title: 'Systèmes & craft',
    description:
      'Des fondations solides pour que les équipes avancent vite, ensemble, sans dette inutile.',
    items: ['Architecture', 'Testing', 'CI/CD', 'Documentation'],
  },
]

export type Project = {
  name: string
  type: string
  year: string
  copy: string
  tech: string[]
  image: string
  scene: SceneKey
}

export const projects: Project[] = [
  {
    name: 'ArcaneCore',
    type: 'Digital product',
    year: '2025',
    copy: 'Une identité vivante pour rendre les systèmes complexes désirables.',
    tech: ['Strategy', 'Art direction', 'Frontend'],
    image: '/images/scene-lab.webp',
    scene: 'lab',
  },
  {
    name: 'Habitat',
    type: 'Experience',
    year: '2024',
    copy: 'Des interfaces qui respirent avec leur contenu.',
    tech: ['UX', 'Motion', 'Interaction'],
    image: '/images/scene-experience.webp',
    scene: 'experience',
  },
  {
    name: 'Afterlight',
    type: 'Experiment',
    year: '2024',
    copy: 'Une étude sur la lumière, la mémoire et le temps.',
    tech: ['R3F', 'Shaders', 'Sound'],
    image: '/images/scene-skills.webp',
    scene: 'skills',
  },
]

export type Role = {
  period: string
  role: string
  studio: string
  place: string
  summary: string
  highlights: string[]
}

export const experience: Role[] = [
  {
    period: '2024 — 2026',
    role: 'Lead Creative Developer',
    studio: 'Studio indépendant',
    place: 'Paris · Remote',
    summary:
      'Direction d’un portfolio à la frontière du produit et de l’expérience, de la stratégie visuelle à la mise en production.',
    highlights: ['Refonte complète de l’expérience', 'Design system partagé', 'Mentorat de 3 développeurs'],
  },
  {
    period: '2022 — 2024',
    role: 'Senior Frontend Engineer',
    studio: 'Agence digitale',
    place: 'Paris',
    summary:
      'Construction d’interfaces riches pour des marques culturelles et des produits à fort trafic, avec un obsession pour la performance.',
    highlights: ['LCP divisé par 3', 'Migration Next.js', 'Bibliothèque de composants'],
  },
  {
    period: '2020 — 2022',
    role: 'Frontend Developer',
    studio: 'Produit SaaS',
    place: 'Lille',
    summary:
      'Développement de fonctionnalités produit dans une équipe pluridisciplinaire, du prototype à la mise en production.',
    highlights: ['Tableau de bord temps réel', 'Accessibilité AA', 'Tests end-to-end'],
  },
  {
    period: '2018 — 2020',
    role: 'Designer · Motion',
    studio: 'Studio créatif',
    place: 'Bruxelles',
    summary:
      'Premières explorations : identité, motion design et sites éditoriaux, pour apprendre à raconter des histoires avec le code.',
    highlights: ['Identités visuelles', 'Sites éditoriaux', 'Rendu WebGL'],
  },
]

export type Experiment = {
  index: string
  title: string
  description: string
  tag: string
}

export const experiments: Experiment[] = [
  {
    index: '01',
    title: 'Terrain Study',
    description: 'Études de lumière et de matière générées à partir de relevés de terrain.',
    tag: 'Shaders',
  },
  {
    index: '02',
    title: 'Type in Motion',
    description: 'Une fonte variable qui réagit à la voix et au scroll.',
    tag: 'Variable fonts',
  },
  {
    index: '03',
    title: 'Sound of Dust',
    description: 'Un paysage sonore synthétique piloté par la position du pointeur.',
    tag: 'Web Audio',
  },
  {
    index: '04',
    title: 'Atlas',
    description: 'Cartographie generative de trajectoires de navigation.',
    tag: 'Canvas',
  },
]

export const stack = [
  'React',
  'Next.js',
  'TypeScript',
  'WebGL',
  'Three.js',
  'GSAP',
  'Tailwind',
  'Motion',
  'Storybook',
  'Vercel',
]

export const stats = [
  { value: '8+', label: 'Années de craft' },
  { value: '40+', label: 'Projets livrés' },
  { value: '12', label: 'Design systems' },
  { value: '3', label: 'Langues parlées' },
]

export const nav = [
  { href: '#journey', label: 'Journey', index: '01' },
  { href: '#skills', label: 'Expertise', index: '02' },
  { href: '#experience', label: 'Parcours', index: '03' },
  { href: '#work', label: 'Projets', index: '04' },
  { href: '#contact', label: 'Contact', index: '05' },
]
