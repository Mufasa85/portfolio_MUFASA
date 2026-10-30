import type { SceneKey } from "./data"

/** Placeholders base64 (20px, flous) — Évitent le flash blanc pendant le chargement. */
export const lqip: Record<SceneKey, string> = {
  hero: 'data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAACwAwCdASoUAAsAPu1kqk4ppaQiMAgBMB2JZgCdACHXT5D9IeIPAAD+qezr6TMuR+v5cc8Lirt3YhpuDWufGAMBs1YoxrSJJJ5gfAAA',
  about: 'data:image/webp;base64,UklGRlgAAABXRUJQVlA4IEwAAAAwAwCdASoUAAsAPu1kqU2ppaQiMAgBMB2JQBOgAU2AYmJoAP7D8m0GUOIejsp4On8Wp4RxFVDYaQFzlAZtp/7qyqRoFnec5/jWZQAA',
  skills: 'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAACwAwCdASoUAAsAPu1iqk4ppaQiMAgBMB2JQAALfGI2dEG4SSDcAAD+tfNzs18OcAwu/3zTd3rdYQq1p0aD19kwjcJ4eWbiOAA=',
  experience: 'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAwCdASoUAAsAPu1kqk4ppaQiMAgBMB2JQBOgAx9UCTgAtrFhMAAA/tqKDK3KsO+GQouM4y8Omijg6eFhfyomTi5+Q4NhsBWY0zDYAAA=',
  projects: 'data:image/webp;base64,UklGRloAAABXRUJQVlA4IE4AAADQAwCdASoUAAsAPu1kqk4ppaQiMAgBMB2JQBOgAx9UCTgAtrFhMAAA/tqKDK3KsO+GQouM4y8Omijg6eFhfyomTi5+Q4NhsBWY0zDYAAA=',
  lab: 'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAABwAwCdASoUAAsAPu1krU6ppaSiMAgBMB2JTK3JlAJxuP0hMmAA/u9f28lFQ3yYTCYptBlQE+7M3MLOEGB71xEwFhjwAA==',
  contact: 'data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAABwAwCdASoUAAsAPu1iqU2ppaOiMAgBMB2JZwDG9DBi6l3v+wAA/vCNeQzvlIYFnKcrDcOhZjkaGAAA',
}
