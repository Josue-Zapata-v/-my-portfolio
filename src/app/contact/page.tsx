import { Metadata } from 'next';
import { personalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Contacto',
  description: `Ponte en contacto con ${personalInfo.name}, ${personalInfo.title}`,
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Contacto</h1>
        <p className="text-lg text-gray-600 mb-12">
          ¿Tienes un proyecto en mente o quieres conversar? Escríbeme por
          cualquiera de estos medios.
        </p>

        <div className="grid gap-4">
          <a
            href={`mailto:${personalInfo.email}`}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <p className="text-sm text-gray-500 mb-1">Email</p>
            <p className="text-lg font-semibold text-gray-900">
              {personalInfo.email}
            </p>
          </a>

          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <p className="text-sm text-gray-500 mb-1">GitHub</p>
            <p className="text-lg font-semibold text-gray-900">
              {personalInfo.github.replace('https://', '')}
            </p>
          </a>

          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-left"
          >
            <p className="text-sm text-gray-500 mb-1">LinkedIn</p>
            <p className="text-lg font-semibold text-gray-900">
              {personalInfo.linkedin.replace('https://', '')}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
}
