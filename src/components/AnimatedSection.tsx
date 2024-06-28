import * as React from "react";
import { useEffect, useRef } from "react";

interface SectionProps {
  children: React.ReactNode;
  className: string;
  id: string;
}

const AnimatedSection: React.FC<SectionProps> = ({
  children,
  className,
  id,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (currentRef) {
              currentRef.classList.add("visible-section");
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section id={id} ref={sectionRef} className={"hidden-section " + className}>
      {children}
    </section>
  );
};

export default AnimatedSection;
