import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="fixed bottom-10 left-4 flex flex-col space-y-4">
      <a href="https://github.com/isotronic" target="_blank" rel="noreferrer">
        <FaGithub className="text-3xl hover:text-slate-400" />
      </a>
      <a
        href="https://www.linkedin.com/in/jbouqdib/"
        target="_blank"
        rel="noreferrer"
      >
        <FaLinkedin className="text-3xl hover:text-slate-400" />
      </a>
    </div>
  );
}
