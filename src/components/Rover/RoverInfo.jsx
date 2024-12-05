import React, { useEffect, useState } from 'react'
import roverImages from '../../assets/rover/images'
import RoverPhotosDisplay from './RoverPhotosDisplay'
import { fetchPhotosForLast5Sols } from './RoverHelper'

const RoverInfo = ({selectedRover}) => {
  const apiKey = process.env.VITE_NASA_API_KEY
  const [photos, setPhotos] = useState([])
  const [roverInfo, setRoverInfo] = useState("")
  const [isFetchingPhotosComplete, setIsFetchingPhotosComplete] = useState(false)
  const [selectedCamera, setSelectedCamera] = useState("")

  const isSpiritOrOpportunity = selectedRover === "spirit" || selectedRover === "opportunity"

  useEffect(()=> {
    const fetchRoverInfo = async ()=> {
      try {
        const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}?&api_key=${apiKey}`)
        const data = await response.json()
        setRoverInfo(data.rover)
      } catch (error) {
        console.error(error)
      }
    };
        
    if (selectedRover) {
      setRoverInfo("")
      setIsFetchingPhotosComplete(false)
      setSelectedCamera("")
      setPhotos([])
      fetchRoverInfo();
    }

  }, [selectedRover])

  useEffect(()=> {
    const fetchPhotos = async () => {
      //Mars Rover API are not returning Opportunity and Spirit images
      if (!isSpiritOrOpportunity) {
        try {
          const photos = await fetchPhotosForLast5Sols(roverInfo.name, roverInfo.max_sol);
          setPhotos(photos);
          setIsFetchingPhotosComplete(true);
        } catch (error) {
          console.error("Error fetching photos:", error);
        }
      }
    };
        
    if (roverInfo){
      fetchPhotos(); // Call the async function
    }
  }, [roverInfo])



  return (
    <div className="bg-cyan-700 w-full min-h-64 max-h-min px-8 py-4 rounded-tr-lg rounded-b-lg">
      {!roverInfo ? 
        <p className="font-bold text-xl">Loading...</p> 
          : 
        <div className='container'>

          <div className='flex flex-col sm:flex-row sm:gap-6'>
            <div className='w-full sm:w-1/2 mt-2 sm:mt-5 '>
              <img
                src={roverImages[selectedRover]}
                alt="Rover"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="w-full sm:w-1/2">
              <dl className="divide-y divide-gray-100">
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Rover Name</dt>
                  <dd className="mt-1 text-sm/6 text-gray-100 sm:mt-0">{roverInfo.name}</dd>
                </div>
                  
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Rover Status</dt>
                  <dd className={`mt-1 text-sm/6 sm:mt-0 ${roverInfo.status === "complete" ? 'text-red-300' : 'text-emerald-300'}`}>{roverInfo.status.toUpperCase()}</dd>
                </div>
                        
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Launch Date</dt>
                  <dd className="mt-1 text-sm/6 text-gray-100 sm:mt-0">{roverInfo.launch_date}</dd>
                </div>
                        
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Landing Date</dt>
                  <dd className="mt-1 text-sm/6 text-gray-100 sm:mt-0">{roverInfo.landing_date}</dd>
                </div>
                        
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Sols on Mission (Martian Days)</dt>
                  <dd className="mt-1 text-sm/6 text-gray-100 sm:mt-0">{roverInfo.max_sol}</dd>
                </div>
                              
                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                  <dt className="font-black text-base text-gray-100">Total Photos Taken</dt>
                  <dd className="mt-1 text-sm/6 text-gray-100 sm:mt-0">{roverInfo.total_photos}</dd>
                </div>

                <div className="p-2 sm:p-3 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
                </div>		
              </dl>
            </div>
          </div>

          <div className="p-2 sm:grid sm:grid-cols-7 sm:px-0">
            <p className="font-black text-base text-gray-100">Cameras 
              <span className='text-xs inline-block font-thin italic'>Choose a camera to view the photos captured by the rover.</span>
            </p>
            <div className="mt-1 text-sm/6 text-gray-100 sm:mt-0 sm:col-span-6">
              {roverInfo.cameras.map((camera)=>
                <button 
                  className={`font-bold p-1 sm:py-2 rounded-md m-1 sm:px-3 ${
                    isSpiritOrOpportunity 
                      ? "text-slate-600 cursor-not-allowed" 
                      : "hover:bg-teal-500 text-slate-600"
                    } ${
                    selectedCamera === camera.name 
                      ? "bg-red-300"
                      : "bg-teal-200"	
                    }`
                  } 
                  disabled={isSpiritOrOpportunity}
                  key={camera.name}
                  onClick={()=>setSelectedCamera(camera.name)}
                >
                  {camera.full_name}
                </button>
              )}
              {isSpiritOrOpportunity && <p className='text-lg text-bold text-red-300'>Sorry, images from Spirit and Opportunity can not be fetched.</p>}
            </div>
          </div>
                    
          {selectedCamera && (
            isFetchingPhotosComplete ? 
              <RoverPhotosDisplay 
                photos={photos}
                camera={selectedCamera}
              />
            :
            <p className="font-bold text-xl">Loading...</p> 
          )}
        </div>
      }
    </div>
  )
}

export default RoverInfo
