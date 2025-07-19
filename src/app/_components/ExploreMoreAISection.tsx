import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const exploreItems = [
  {
    title: 'Animefy',
    description: 'Transform your photos into vibrant anime style art with just one click. Whether its bold lines, big eyes, or that signature anime glow Animefy brings your inner character to life in seconds.',
    before: '/AnimefyBefore.jpeg',
    after: '/AnimefyAfter.png',
  },
  {
    title: 'Posterize',
    description: 'Transform your photo into a bold, poster-style artwork with striking colors and sharp contrasts.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
  },
  {
    title: 'Background Remover',
    description: 'Effortlessly erase backgrounds from your photos for a clean, professional look.',
    before: '/RemoveBgBefore.jpeg',
    after: '/RemoveBgAfter.png',
  },
];

const ExploreMoreAISection = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .fade-in-up {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: opacity 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1);
        }
        .card-animate {
          opacity: 0;
          transform: translateY(40px);
        }
        /* Enhanced crossover animation */
        .crossover-container {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .crossover-before {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: opacity 1s cubic-bezier(0.77,0,0.175,1), transform 1s cubic-bezier(0.77,0,0.175,1);
        }
        .crossover-after {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 2;
          opacity: 0;
          transform: scale(1.08);
          transition: opacity 1s cubic-bezier(0.77,0,0.175,1), transform 1s cubic-bezier(0.77,0,0.175,1);
        }
        .group:hover .crossover-before {
          opacity: 0;
          transform: scale(0.96);
        }
        .group:hover .crossover-after {
          opacity: 1;
          transform: scale(1);
        }
      `}</style>
      <section className="py-16 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#FAF4E8' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12" style={{ color: '#1C1C1C' }}>
            Explore More AI
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {exploreItems.map((item, idx) => (
              <div
                key={idx}
                ref={el => { cardRefs.current[idx] = el; }}
                className="card-animate rounded-2xl shadow-lg p-4 flex flex-col items-center border h-[520px]"
                style={{ backgroundColor: '#FAF4E8', borderColor: '#C8C1B2', borderWidth: 2 }}
              >
                <div className="w-full aspect-[9/16] rounded-xl overflow-hidden mb-4 flex items-center justify-center bg-white relative group">
                  {/* Enhanced crossover animation between before and after images */}
                  <div className="crossover-container">
                    <Image
                      src={item.before}
                      alt="before"
                      width={500}
                      height={500}
                      className="crossover-before"
                    />
                    <Image
                      src={item.after}
                      alt="after"
                      width={500}
                      height={500}
                      className="crossover-after"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#1C1C1C' }}>{item.title}</h3>
                {item.title === 'Background Remover' ? (
                  <Link href="/PhotoBackgroundRemover">
                    <button
                      className="px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow border-2"
                      style={{
                        backgroundColor: '#E7C74B',
                        color: '#000',
                        borderColor: '#E7C74B',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFD600')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E7C74B')}
                    >
                      Explore
                    </button>
                  </Link>
                ) : item.title === 'Animefy' ? (
                  <Link href="/PhotoConverter">
                    <button
                      className="px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow border-2"
                      style={{
                        backgroundColor: '#E7C74B',
                        color: '#000',
                        borderColor: '#E7C74B',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFD600')}
                      onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E7C74B')}
                    >
                      Explore
                    </button>
                  </Link>
                ) : (
                  <button
                    className="px-6 py-2 rounded-full font-semibold transition-all duration-200 shadow border-2"
                    style={{
                      backgroundColor: '#E7C74B',
                      color: '#000',
                      borderColor: '#E7C74B',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#FFD600')}
                    onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#E7C74B')}
                  >
                    Explore
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreMoreAISection; 