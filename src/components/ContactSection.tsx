import * as React from "react";
import AnimatedSection from "./AnimatedSection";

const ContactSection: React.FC = () => {
  return (
    <AnimatedSection id="contact" className="mx-auto my-60 max-w-lg px-12 py-12 text-center lg:px-0">
      <h2 className="mb-12 text-3xl font-semibold">Contact Me</h2>
      <p className="mb-4">
        You can always reach out to me if you have any questions, want to discuss potential opportunities, or even just
        to say hi. I will do my best to respond to you.
      </p>
      <p>
        &#80;&#104;&#111;&#110;&#101;&#58;&#32;
        <a
          className="&#116;&#101;&#120;&#116;&#45;&#103;&#114;&#101;&#101;&#110;&#45;&#53;&#48;&#48;"
          target="&#95;&#98;&#108;&#97;&#110;&#107;"
          rel="&#110;&#111;&#114;&#101;&#102;&#101;&#114;&#114;&#101;&#114;"
          href="&#116;&#101;&#108;&#58;&#43;&#52;&#52;&#55;&#51;&#57;&#49;&#50;&#52;&#57;&#53;&#50;&#49;"
        >
          &#43;&#52;&#52;&#32;&#40;&#48;&#41;&#32;&#55;&#51;&#57;&#49;&#32;&#50;&#52;&#57;&#32;&#53;&#50;&#49;
        </a>
      </p>
      <p className="mb-16">Email: joseph@bouqdib.com</p>
      <a
        href="mailto:joseph@bouqdib.com"
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-md border border-green-500 px-6 py-3 text-green-500 transition hover:bg-green-500 hover:text-slate-900"
      >
        Say Hello
      </a>
    </AnimatedSection>
  );
};

export default ContactSection;
