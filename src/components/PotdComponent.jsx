import { useState, useEffect } from "react";

  const PotdComponent = () => { 

    const [potdData, setPotdData] = useState([])
    const apiUrl = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY'; 
   
    useEffect(() => { 
      const fetchData = async () => { 
        const cachedData = sessionStorage.getItem('apiData'); 
        if (cachedData) { 
          setPotdData(JSON.parse(cachedData)); 
        } else { 
          try { 
            const response = await fetch(apiUrl); 
            const result = await response.json(); 
            setPotdData(result); 
            sessionStorage.setItem('apiData', JSON.stringify(result)); 
          } catch (error) { 
            console.error('Error fetching data:', error); 
          } 
        } 
      }; 
   
      fetchData(); 
    }, [apiUrl]); 

  return (
    <div className="grid grid-cols-2 gap-10 w-full max-w-7xl min-h-[60vh] py-20">
      <div>
        <img className="img-potd pb-2" src={potdData.url}></img>
        <p className="text-sm text-gray-400 text-center">Copyright: {potdData.copyright}</p>
      </div>
      <div className="content-evenly">
        <h2 className="text-2xl font-bold">{potdData.title}</h2>
        <p className="date text-sm text-gray-400 pb-10">{potdData.date}</p>
        <p className="text-slate-200">{potdData.explanation}</p>
      </div>
      </div>

  )
}

export default PotdComponent;
