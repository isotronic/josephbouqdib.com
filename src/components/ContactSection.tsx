import AnimatedSection from "./AnimatedSection";

const ContactSection: React.FC = () => {
  return (
    <AnimatedSection
      id="contact"
      className="mx-auto my-60 max-w-lg px-12 py-12 text-center lg:px-0"
    >
      <h2 className="mb-12 text-3xl font-semibold">Contact Me</h2>
      <p className="mb-4">
        You can always reach out to me if you have any questions, want to
        discuss potential opportunities, or even just to say hi. I will do my
        best to respond to you.
      </p>
      <p>
        Phone:{" "}
        <a className="text-green-500" href="tel:+447391249521">
          +44 (0) 7391 249 521
        </a>
      </p>
      <p className="mb-16">Email: joseph@bouqdib.com</p>
      <a
        href="mailto:joseph@bouqdib.com"
        className="inline-block rounded-md border border-green-500 px-6 py-3 text-green-500 transition hover:bg-green-500 hover:text-slate-900"
      >
        Say Hello
      </a>
    </AnimatedSection>
  );
};

export default ContactSection;
