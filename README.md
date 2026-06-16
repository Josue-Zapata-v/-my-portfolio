# Portafolio — Josue Zapata

Portafolio personal full stack construido con **Next.js (App Router)**, optimizado para SEO, rendimiento e imágenes, y desplegado en Vercel.

🔗 **Demo en producción:** [https://my-portfolio-josuezv.vercel.app/](https://my-portfolio-josuezv.vercel.app/)

---

## Tabla de contenidos

- [Stack tecnológico](#stack-tecnológico)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Páginas](#páginas)
- [Componentes compartidos](#componentes-compartidos)
- [Tipos y datos](#tipos-y-datos)
- [SEO](#seo)
- [Optimización de imágenes](#optimización-de-imágenes)
- [Tipografía](#tipografía)
- [Cómo correr el proyecto localmente](#cómo-correr-el-proyecto-localmente)
- [Scripts disponibles](#scripts-disponibles)
- [Despliegue](#despliegue)
- [Auditoría Lighthouse](#auditoría-lighthouse)

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| [Next.js 16](https://nextjs.org/) (App Router) | Framework principal, SSG con `generateStaticParams` |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipado estático |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilos (vía `@tailwindcss/postcss`) |
| [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) | Carga optimizada de Google Fonts (Inter + Poppins) |
| [next/image](https://nextjs.org/docs/app/api-reference/components/image) | Imágenes optimizadas con lazy loading, AVIF/WebP |
| [Vercel](https://vercel.com/) | Hosting y despliegue continuo desde GitHub |

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx              # Layout raíz + metadata global (SEO, OG, Twitter, robots)
│   ├── page.tsx                # Home: hero + proyectos destacados
│   ├── globals.css             # Tailwind + variables de tema (fuentes)
│   ├── sitemap.ts               # Generador dinámico de /sitemap.xml
│   ├── robots.ts                # Generador dinámico de /robots.txt
│   ├── about/
│   │   └── page.tsx            # Página "Sobre Mí"
│   ├── contact/
│   │   └── page.tsx            # Página de contacto (informativa)
│   └── projects/
│       ├── page.tsx            # Listado completo de proyectos
│       └── [slug]/
│           └── page.tsx        # Detalle de proyecto con metadata dinámica
├── components/
│   ├── Header.tsx              # Navegación principal (sticky)
│   ├── Footer.tsx               # Pie de página con links sociales
│   └── ProjectCard.tsx         # Tarjeta de proyecto reutilizable
├── lib/
│   └── data.ts                  # Datos de ejemplo: proyectos e info personal
└── types/
    └── index.ts                  # Interfaces TypeScript (Project, Metadata)
```

## Páginas

| Ruta | Descripción | Generación |
|---|---|---|
| `/` | Hero con foto, título, descripción y proyectos destacados | Estática (SSG) |
| `/about` | Biografía y habilidades técnicas | Estática (SSG) |
| `/projects` | Listado de todos los proyectos | Estática (SSG) |
| `/projects/[slug]` | Detalle de un proyecto, con metadata Open Graph/Twitter dinámica por slug | Estática (SSG vía `generateStaticParams`) |
| `/contact` | Email, GitHub y LinkedIn de contacto | Estática (SSG) |
| `/sitemap.xml` | Sitemap generado dinámicamente a partir de `lib/data.ts` | Ruta especial de Next.js |
| `/robots.txt` | Reglas de indexación para crawlers | Ruta especial de Next.js |

## Componentes compartidos

- **`Header`**: barra de navegación sticky con links a Inicio, Proyectos, Sobre Mí y Contacto.
- **`Footer`**: copyright dinámico (`new Date().getFullYear()`) y links a GitHub, LinkedIn y correo.
- **`ProjectCard`**: tarjeta de proyecto clickeable completa (envuelta en `Link`), con imagen optimizada, efecto hover de zoom, descripción truncada (`line-clamp-2`) y badges de tecnologías (máx. 3 visibles + contador).

## Tipos y datos

`src/types/index.ts` define las interfaces compartidas:

```ts
export interface Project {
  slug: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Metadata {
  title: string;
  description: string;
  keywords?: string[];
  author?: string;
  ogImage?: string;
}
```

`src/lib/data.ts` centraliza los datos de ejemplo (`projects`) y la información personal (`personalInfo`) usada en toda la app — un solo lugar para editar nombre, email, redes y URL del sitio.

## SEO

- **Metadata global** (`layout.tsx`): título con template (`%s | Josue Zapata`), descripción, keywords, autor, Open Graph completo, Twitter Card, reglas de `robots` (`index`, `follow`, configuración de `googleBot`) y `metadataBase` apuntando al dominio de producción.
- **Metadata dinámica por proyecto** (`projects/[slug]/page.tsx`): cada proyecto genera su propio `title`, `description`, `og:image` y `twitter:image` vía `generateMetadata`.
- **Sitemap dinámico** (`sitemap.ts`): incluye automáticamente todas las páginas estáticas y una entrada por cada proyecto en `lib/data.ts`, con `priority` y `changeFrequency` diferenciados.
- **Robots.txt dinámico** (`robots.ts`): reglas para `*` y `Googlebot`, y referencia al sitemap.
- Verificado manualmente: presencia de `<title>`, `<meta name="description">`, todas las etiquetas `og:*` y `twitter:*` en el HTML renderizado, tanto en home como en páginas de detalle de proyecto.

## Optimización de imágenes

Configurado en `next.config.ts`:

```ts
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  remotePatterns: [{ protocol: 'https', hostname: '**.unsplash.com' }],
}
```

Todas las imágenes (avatar, proyectos) usan `next/image` con `fill`, `sizes` responsivos y `loading="lazy"` (excepto el LCP del hero, que usa `priority`).

## Tipografía

- **Inter** (`--font-inter` / `font-sans`): tipografía base del cuerpo de texto.
- **Poppins** (`--font-poppins` / `font-display`, pesos 600 y 700): tipografía de display para el nombre en el Header.

Ambas cargadas vía `next/font/google` y expuestas como utilidades de Tailwind (`font-sans`, `font-display`) a través de `@theme inline` en `globals.css`.

## Cómo correr el proyecto localmente

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Comando | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo (Turbopack) |
| `npm run build` | Build de producción + chequeo de TypeScript |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | Linting con ESLint |

## Despliegue

El proyecto está conectado a GitHub (`Josue-Zapata-v/-my-portfolio`) y se despliega automáticamente en **Vercel** en cada push a `main`.

- **Dominio de producción:** [my-portfolio-josuezv.vercel.app](https://my-portfolio-josuezv.vercel.app/)
- `siteUrl` en `src/lib/data.ts` debe coincidir siempre con el dominio activo en Vercel, ya que de él dependen `metadataBase`, el sitemap y los meta tags Open Graph/Twitter.

## Auditoría Lighthouse

Auditoría final en producción (incógnito, sin extensiones):

| Categoría | Desktop | Mobile |
|---|---|---|
| Performance | 100 | 98 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

Objetivo de la tarea (**Score > 90 en todas las categorías, Desktop y Mobile**) cumplido en ambos modos tras optimizar imágenes (`next/image` con AVIF/WebP, lazy loading), fuentes (`next/font`) y metadata.
