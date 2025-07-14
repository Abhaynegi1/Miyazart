// src/app/_components/gsapUtils.ts

export function initializeLandingPageAnimations(heroTextRef: React.RefObject<HTMLElement>, heroImageRef: React.RefObject<HTMLElement>) {
  // @ts-expect-error: gsap is loaded dynamically and not typed on window
  const gsap = typeof window !== 'undefined' ? (window as any).gsap : undefined;
  if (!gsap) return;

  const heroTimeline = gsap.timeline();

  // Hero text animation
  heroTimeline.fromTo(heroTextRef.current,
    {
      opacity: 0,
      y: 50
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power3.out"
    }
  );

  // Hero image animation (slightly delayed)
  heroTimeline.fromTo(heroImageRef.current,
    {
      opacity: 0,
      scale: 0.8,
      rotation: -5
    },
    {
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "elastic.out(1, 0.5)"
    },
    "-=0.5"
  );

  // Animate steps on scroll
  const stepCards = document.querySelectorAll('.step-card');
  stepCards.forEach((card, index) => {
    gsap.fromTo(card,
      {
        opacity: 0,
        y: 60,
        scale: 0.9
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
        delay: index * 0.2
      }
    );
  });

  // Floating animation for hero image
  gsap.to(heroImageRef.current, {
    y: -10,
    duration: 2,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
  });

  // Hover animations for buttons
  const buttons = document.querySelectorAll('.gsap-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });

  // Stagger animation for navigation items
  const navItems = document.querySelectorAll('.nav-item');
  gsap.fromTo(navItems,
    {
      opacity: 0,
      y: -20
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out",
      delay: 0.3
    }
  );
}

export function initializeScrollTriggerPlugin() {
  if (typeof window === 'undefined') return;
  const scrollTriggerScript = document.createElement('script');
  scrollTriggerScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
  scrollTriggerScript.onload = () => {
    // @ts-expect-error: gsap and ScrollTrigger are loaded dynamically
    if ((window as any).gsap && (window as any).ScrollTrigger) {
      (window as any).gsap.registerPlugin((window as any).ScrollTrigger);
    }
  };
  document.head.appendChild(scrollTriggerScript);
}

export function animateMobileMenu(isMobileMenuOpen: boolean) {
  const gsap = typeof window !== 'undefined' ? (window as any).gsap : undefined;
  if (!gsap) return;
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!isMobileMenuOpen && mobileMenu) {
    gsap.fromTo(mobileMenu,
      { height: 0, opacity: 0 },
      { height: 'auto', opacity: 1, duration: 0.3, ease: "power2.out" }
    );
  }
}