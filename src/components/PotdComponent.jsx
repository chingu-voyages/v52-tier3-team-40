import { useState, useEffect } from "react";

const PotdComponent = () => {
  const [potdData, setPotdData] = useState([]);
  const apiUrl = "https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY";

  useEffect(() => {
    const fetchData = async () => {
      const cachedData = sessionStorage.getItem("apiData");
      if (cachedData) {
        setPotdData(JSON.parse(cachedData));
      } else {
        try {
          const response = await fetch(apiUrl);
          const result = await response.json();
          setPotdData(result);
          sessionStorage.setItem("apiData", JSON.stringify(result));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="flex flex-col py-20">
      <div className="self-center text-center">
        <h2 className="text-3xl">Picture of the Day</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400">
          NASA curated pictures of our universe daily
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-7xl min-h-[60vh] py-20 font-mono">
        <div>
          <img className="img-potd pb-2" src={potdData.url}></img>
          <p className="text-sm text-gray-400 text-center">
            Copyright: {potdData.copyright}
          </p>
        </div>
        <div className="content-evenly">
          <h2 className="text-2xl font-bold">{potdData.title}</h2>
          <p className="date text-sm text-gray-400 pb-5">{potdData.date}</p>
          <p className="text-slate-200">{potdData.explanation}</p>
        </div>
      </div>
      <button className="border-slate-600 border-2 px-5 py-2 w-max self-center">Scroll next</button>
    </div>
  );
};

export default PotdComponent;
