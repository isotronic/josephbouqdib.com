import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa6";

const SocialLinks: React.FC = () => {
  return (
    <div className="fixed bottom-10 left-4 hidden flex-col space-y-4 md:flex">
      <a
        href="https://github.com/isotronic"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="transition hover:text-green-500"
      >
        <FaGithub size={30} />
      </a>
      <a
        href="https://www.linkedin.com/in/jbouqdib/"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn"
        className="transition hover:text-green-500"
      >
        <FaLinkedin size={30} />
      </a>
      <a
        href="mailto:joseph@bouqdib.com"
        target="_blank"
        rel="noreferrer"
        aria-label="Email"
        className="transition hover:text-green-500"
      >
        <FaEnvelope size={30} />
      </a>
    </div>
  );
};

export default SocialLinks;
