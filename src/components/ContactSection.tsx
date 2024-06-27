const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="mx-auto my-60 max-w-lg px-12 py-12 text-center lg:px-0"
    >
      <h2 className="mb-12 text-3xl font-semibold">Contact Me</h2>
      <p className="mb-16">
        You can always reach out to me if you have any questions, want to
        discuss potential opportunities, or even just to say hi. I will do my
        best to respond to you.
      </p>
      <a
        href="mailto:joseph@bouqdib.com"
        className="inline-block rounded-md border border-green-400 px-6 py-3 text-green-400 transition hover:bg-green-400 hover:text-slate-900"
      >
        Say Hello
      </a>
    </section>
  );
};

export default ContactSection;
