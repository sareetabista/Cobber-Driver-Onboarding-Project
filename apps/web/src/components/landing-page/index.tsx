import DriverOnboarding from "./components/driver-onboarding";
import Navbar from "../navbar/index";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className=" bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-5xl">
          {/* <div className="mb-8 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            Driver Onboarding Portal
          </div> */}
          <DriverOnboarding />
        </div>
      </main>
    </>
  );
}
