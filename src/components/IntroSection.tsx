const AboutSection: React.FC = () => {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="mb:mx-auto mx-12 max-w-4xl text-left">
        <p className="-mt-32 mb-6 text-green-500">Hi, my name is</p>
        <h1 className="text-4xl font-bold md:text-7xl">Joseph Bouqdib.</h1>
        <h2 className="mt-4 text-4xl font-bold text-slate-400 md:mt-6 md:text-7xl">
          I build things for the web.
        </h2>
        <p className="mt-6 max-w-lg text-slate-400">
          I am a full-stack developer, passionate about creating outstanding
          digital experiences. Currently, I am focusing on developing web and
          mobile applications using React and Node.js.
        </p>
        <a
          href="#"
          className="mb-16 mt-8 inline-block rounded-md border border-green-400 px-6 py-3 text-green-500 transition hover:bg-green-500 hover:text-slate-900"
        >
          Check out my course!
        </a>
      </div>
    </section>
  );
};

export default AboutSection;
