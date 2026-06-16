import { Metadata } from 'next';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Ponte en contacto con ${personalInfo.name}, ${personalInfo.title}`,
};

const contactLinks = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    accent: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 6.75c0-.621.504-1.125 1.125-1.125h17.25c.621 0 1.125.504 1.125 1.125v10.5c0 .621-.504 1.125-1.125 1.125H3.375A1.125 1.125 0 0 1 2.25 17.25V6.75Zm0 0 9.75 6.75 9.75-6.75"
      />
    ),
  },
  {
    label: 'GitHub',
    value: personalInfo.github.replace('https://', ''),
    href: personalInfo.github,
    accent: 'bg-gray-100 text-gray-700 group-hover:bg-gray-900',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    ),
  },
  {
    label: 'LinkedIn',
    value: personalInfo.linkedin.replace('https://www.', '').replace('https://', ''),
    href: personalInfo.linkedin,
    accent: 'bg-sky-50 text-sky-600 group-hover:bg-sky-600',
    icon: (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6ZM2 9h4v12H2V9Zm2-7a2 2 0 1 1 0 4 2 2 0 0 1 0-4Z"
      />
    ),
  },
];

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold tracking-wide uppercase text-sm">
            Conectemos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4 font-display">
            Hablemos de tu próximo proyecto
          </h1>
          <p className="text-lg text-gray-600">
            ¿Tienes una idea, una oportunidad o solo quieres saludar? Elige el
            medio que prefieras, te respondo lo antes posible.
          </p>
        </div>

        <div className="grid gap-4">
          {contactLinks.map(({ label, value, href, accent, icon }) => (
            <a
              key={label}
              href={href}
              target={label === 'Email' ? undefined : '_blank'}
              rel={label === 'Email' ? undefined : 'noopener noreferrer'}
              className="group flex items-center gap-4 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 hover:border-transparent transition-all duration-300"
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white ${accent}`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.8}
                  className="h-6 w-6"
                >
                  {icon}
                </svg>
              </span>

              <span className="flex-1 min-w-0">
                <span className="block text-xs font-medium uppercase tracking-wide text-gray-400">
                  {label}
                </span>
                <span className="block text-base font-semibold text-gray-900 truncate">
                  {value}
                </span>
              </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-5 w-5 shrink-0 text-gray-300 transition-all duration-300 group-hover:text-blue-600 group-hover:translate-x-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center bg-gray-900 rounded-2xl p-8">
          <p className="text-white text-lg font-semibold mb-1">
            ¿Prefieres ir directo al grano?
          </p>
          <p className="text-gray-400 mb-5">
            Escríbeme un correo y te respondo en menos de 48 horas.
          </p>
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Enviar correo
          </a>
        </div>
      </div>
    </div>
  );
}
