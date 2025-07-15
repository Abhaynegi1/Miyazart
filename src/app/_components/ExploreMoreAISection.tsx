import React, { useEffect, useRef } from 'react';
import ImageComparisonSlider from './ImageComparisonSlider';

const exploreItems = [
  {
    title: 'Photo Enhancer',
    description: 'Enhance photo resolution, quality and detail online 100% automatically.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
  },
  {
    title: 'AI Video Enhancer',
    description: '4k video quality enhancer online can unblur video, increase resolution and improve quality of video.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
  },
  {
    title: 'Photo Animer',
    description: 'Turn photo into moving video and bring portrait to life.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
  },
  {
    title: 'Black & White Colorizer',
    description: 'Colorize black and white photos instantly with AI.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
  },
  {
    title: 'Cartoonizer',
    description: 'Transform your photo into a cartoon or comic style.',
    before: '/beforePhoto.jpeg',
    after: '/afterPhoto.png',
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
                className="card-animate rounded-2xl shadow-lg p-4 flex flex-col items-center border"
                style={{ backgroundColor: '#FAF4E8', borderColor: '#C8C1B2', borderWidth: 2 }}
              >
                <div className="w-full aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <ImageComparisonSlider beforeImage={item.before} afterImage={item.after} />
                </div>
                <h3 className="text-xl font-bold mb-2 text-center" style={{ color: '#1C1C1C' }}>{item.title}</h3>
                <p className="text-center text-gray-600 mb-4">{item.description}</p>
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
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ExploreMoreAISection; 