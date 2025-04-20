import DriverOnboarding from "./components/driver-onboarding";
import Navbar from "../navbar/index";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            Driver Onboarding Portal
          </h1>
          <DriverOnboarding />
        </div>
      </main>
    </>
  );
}
