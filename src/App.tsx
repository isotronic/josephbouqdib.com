import { HandRaisedIcon } from "@heroicons/react/24/solid";
import NavBar from "./components/NavBar";
import SocialLinks from "./components/SocialLinks";

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <NavBar />
      <SocialLinks />
      <main className="m-auto flex flex-row gap-3">
        <h1 className="text-3xl">Hi there!</h1>
        <HandRaisedIcon className="size-8" />
      </main>
    </div>
  );
}
