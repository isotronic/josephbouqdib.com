import { useState } from "react";

const NavBar: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <nav>
      <div className="mx-auto flex max-w-screen-2xl flex-wrap items-center justify-between p-4">
        <a href="/" className="flex items-center space-x-3">
          <svg
            width="50"
            height="50"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon
              points="50,5 90,25 90,75 50,95 10,75 10,25"
              fill="#0f172a"
              stroke="#22c55e"
              stroke-width="4"
            />

            <text
              x="50%"
              y="52%"
              dominant-baseline="middle"
              text-anchor="middle"
              font-family="Inter"
              font-size="35"
              fill="#22c55e"
            >
              JB
            </text>
          </svg>
        </a>
        <button
          onClick={() => setIsNavOpen((prev) => !prev)}
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm md:hidden"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="h-5 w-5 hover:text-slate-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`fixed right-0 top-16 h-screen w-1/3 transform ${
            isNavOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 md:relative md:right-0 md:top-0 md:block md:h-auto md:w-auto md:transform-none md:bg-transparent md:shadow-none`}
        >
          <ul className="flex h-full flex-col space-y-4 overflow-y-auto p-4 font-medium md:mt-0 md:h-auto md:flex-row md:space-x-12 md:space-y-0 md:overflow-y-visible md:p-0">
            <li>
              <a href="#about" className="block hover:text-green-500">
                About
              </a>
            </li>
            <li>
              <a href="#projects" className="block hover:text-green-500">
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="block hover:text-green-500">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
