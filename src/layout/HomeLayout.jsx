import Header from "../components/Header";
import PotdComponent from "../components/PotdComponent";
import Component2 from "../components/Component2";
import Footer from "../components/Footer/Footer";
import Rover from "../components/Rover/Rover";
import DailyQuiz from "../components/DailyQuiz";
import SlidingPuzzle from "../components/SlidingPuzzle/SlidingPuzzle";

const HomeLayout = () => {
  return (
    <div className="flex flex-col w-full font-mono bg-black text-white">
      <section className="h-screen w-full">
        <Header />
      </section>

      <main className="w-full">
        <div className="w-full px-4 py-10 space-y-8">
          <div className="flex justify-center w-full">
            <PotdComponent />
          </div>
          <div className="flex justify-center w-full">
            <Component2 />
          </div>
          <div className="flex justify-center w-full">
            <Rover />
          </div>
          <div className="flex justify-center w-full">
            <DailyQuiz />
          </div>
          <div className="flex justify-center w-full">
            <SlidingPuzzle />
          </div>
        </div>
      </main>

      <div className="w-full ">
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
