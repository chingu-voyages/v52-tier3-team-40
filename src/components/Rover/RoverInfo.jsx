import React, { useEffect, useState } from 'react'
import RoverPhotosDisplay from './RoverPhotosDisplay'
import { fetchPhotosForLast10Sols } from './RoverHelper'

const RoverInfo = ({selectedRover}) => {
	const apiKey = process.env.VITE_NASA_API_KEY
	const [photos, setPhotos] = useState([])
	const [roverInfo, setRoverInfo] = useState("")
	const [isFetchingPhotosComplete, setIsFetchingPhotosComplete] = useState(false)
	const [selectedCamera, setSelectedCamera] = useState("")

	useEffect(()=> {
		const fetchRoverInfo = async ()=>{
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
			fetchRoverInfo();
		}

	}, [selectedRover])

	useEffect(()=> {
		const fetchPhotos = async () => {
      try {
        const photos = await fetchPhotosForLast10Sols(roverInfo.name, roverInfo.max_sol);
        console.log(`Found ${photos.length} photos from the last 10 sols!`);
        setPhotos(photos);
				setIsFetchingPhotosComplete(true);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };
		
		if (roverInfo){
			fetchPhotos(); // Call the async function
		}
	}, [roverInfo])

  return (
    <div>
      {!roverInfo ? 
				<p>Loading...</p> 
				: 
				<div>
					<div className="px-4 sm:px-0">
    				<h3 className="text-base/7 font-semibold text-gray-900">Rover Information</h3>
    				<p className="mt-1 max-w-2xl text-sm/6 text-gray-500">Status: {roverInfo.status}</p>
  				</div>
  				<div className="mt-6 border-t border-gray-100">
    				<dl className="divide-y divide-gray-100">
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Rover Name</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{roverInfo.name}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Launch Date</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{roverInfo.launch_date}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Landing Date</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{roverInfo.landing_date}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Maximum Sol (Martian Rotation/Day)</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{roverInfo.max_sol}</dd>
      				</div>
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Total Photos Taken</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">{roverInfo.total_photos}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-900">Cameras</dt>
        				<dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
							{roverInfo.cameras.map((camera)=>
								<button 
									className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4" 
									key={camera.name}
									onClick={()=>setSelectedCamera(camera.name)}
								>
									{camera.full_name}
								</button>
							)}
							{selectedCamera && (
								isFetchingPhotosComplete ? 
									<RoverPhotosDisplay 
										photos={photos}
										camera={selectedCamera}
									/>
								:
									<p>Loading...</p> 
							)}
						</dd>
      				</div>
					</dl>
  				</div>
				</div>
			}
    </div>
  )
}

export default RoverInfo
