import Image from "next/image";
import { Login } from "../components/login";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Login />
    </div>
  );
}
