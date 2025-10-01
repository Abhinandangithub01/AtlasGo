'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface StorySection {
  type: 'hero' | 'parallax' | 'timeline' | 'gallery' | 'quote' | 'cta';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  backgroundImage?: string;
  year?: string;
  quote?: string;
  author?: string;
  images?: string[];
  ctaText?: string;
  ctaLink?: string;
}

interface InteractiveStoryProps {
  title: string;
  subtitle: string;
  sections: StorySection[];
  placeSlug?: string;
}

export default function InteractiveStory({ title, subtitle, sections, placeSlug }: InteractiveStoryProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);

      // Detect active section
      sectionRefs.current.forEach((ref, index) => {
        if (ref) {
          const rect = ref.getBoundingClientRect();
          if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
            setActiveSection(index);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative bg-gray-900">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Story Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: sections[0]?.backgroundImage ? `url(${sections[0].backgroundImage})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transform: `translateY(${scrollProgress * 0.5}px)`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">{title}</h1>
          <p className="text-2xl md:text-3xl mb-8 opacity-90">{subtitle}</p>
          <div className="animate-bounce">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>

      {/* Story Sections */}
      {sections.map((section, index) => (
        <div
          key={index}
          ref={(el) => (sectionRefs.current[index] = el)}
          className={`transition-opacity duration-1000 ${
            activeSection === index ? 'opacity-100' : 'opacity-70'
          }`}
        >
          {section.type === 'parallax' && (
            <div className="relative h-screen flex items-center justify-center overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${section.backgroundImage})`,
                  transform: `translateY(${(scrollProgress - index * 20) * 0.3}px)`,
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40" />
              </div>
              <div className="relative z-10 text-center text-white px-4 max-w-3xl">
                <h2 className="text-5xl font-bold mb-4">{section.title}</h2>
                <p className="text-xl leading-relaxed">{section.content}</p>
              </div>
            </div>
          )}

          {section.type === 'timeline' && (
            <div className="relative py-20 px-4 bg-gray-800">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-8">
                  <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white">
                    <span className="text-3xl font-bold">{section.year}</span>
                  </div>
                  <div className="flex-1 text-white">
                    <h3 className="text-3xl font-bold mb-3">{section.title}</h3>
                    <p className="text-lg text-gray-300">{section.content}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {section.type === 'gallery' && section.images && (
            <div className="py-20 px-4 bg-gray-900">
              <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-bold text-white text-center mb-12">{section.title}</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {section.images.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-80 overflow-hidden rounded-lg transform hover:scale-105 transition-transform duration-500 cursor-pointer"
                    >
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {section.type === 'quote' && (
            <div className="py-32 px-4 bg-gradient-to-br from-purple-900 to-blue-900">
              <div className="max-w-4xl mx-auto text-center">
                <svg className="w-16 h-16 text-white opacity-30 mx-auto mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="text-3xl md:text-4xl font-serif text-white italic mb-6">{section.quote}</p>
                <p className="text-xl text-gray-300">— {section.author}</p>
              </div>
            </div>
          )}

          {section.type === 'cta' && (
            <div className="py-32 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-5xl font-bold text-white mb-6">{section.title}</h2>
                <p className="text-2xl text-white opacity-90 mb-8">{section.content}</p>
                <Link
                  href={section.ctaLink || '#'}
                  className="inline-block bg-white text-blue-600 px-12 py-4 rounded-full text-xl font-bold hover:bg-gray-100 transform hover:scale-105 transition-all shadow-2xl"
                >
                  {section.ctaText || 'Explore Now'}
                </Link>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`block w-3 h-3 rounded-full transition-all ${
              activeSection === index ? 'bg-white scale-150' : 'bg-gray-500 hover:bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
