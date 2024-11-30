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
					console.log(`Found ${photos?.length} photos from the last 5 sols!`);
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
    <div className="bg-cyan-700 w-full min-h-64 max-h-max px-8 py-4 rounded-tr-lg">
      {!roverInfo ? 
				<p className="font-bold text-xl">Loading...</p> 
				: 
				<div>
					<div className="bg-gray-400">
    				<h3 className="text-base/7 font-semibold text-gray-100">Rover Information</h3>
    				<p className="mt-1 max-w-2xl text-sm/6 text-gray-100">Status: {roverInfo.status}</p>
  				</div>
          <img
            src={roverImages[selectedRover]}
            alt="Rover"
            class="w-1/3 object-cover"
          />
  				<div className="mt-6 border-t border-gray-100">
    				<dl className="divide-y divide-gray-100">
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Rover Name</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">{roverInfo.name}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Launch Date</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">{roverInfo.launch_date}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Landing Date</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">{roverInfo.landing_date}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Maximum Sol (Martian Rotation/Day)</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">{roverInfo.max_sol}</dd>
      				</div>
							<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Total Photos Taken</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">{roverInfo.total_photos}</dd>
      				</div>
      				<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        				<dt className="text-sm/6 font-medium text-gray-100">Cameras</dt>
        				<dd className="mt-1 text-sm/6 text-gray-100 sm:col-span-2 sm:mt-0">
							{roverInfo.cameras.map((camera)=>
								<button 
									className={`font-bold py-2 px-4 ${
										isSpiritOrOpportunity 
											? "text-gray-100 cursor-not-allowed" 
											: "hover:bg-gray-400 text-gray-100"
										} ${
										selectedCamera === camera.name 
											? "bg-red-500 hover:bg-red-500"
											: "bg-gray-300"	
										}`
									} 
									disabled={isSpiritOrOpportunity}
									key={camera.name}
									onClick={()=>setSelectedCamera(camera.name)}
								>
									{camera.full_name}
								</button>
							)}
							{isSpiritOrOpportunity && <p className='text-lg text-bold text-red-500'>Sorry, images from Spirit and Opportunity can not be fetched.</p>}
						</dd>
      				</div>
					</dl>
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
				</div>
			}
      {/* <div class="flex max-w-2xl bg-gray-50 border border-gray-200 rounded-lg shadow-md overflow-hidden">
  <img
    src="rover-image.jpg"
    alt="Rover"
    class="w-1/3 object-cover"
  />
  <div class="p-4 w-2/3">
    <h2 class="text-xl font-bold text-gray-800">Rover Name: Curiosity</h2>
    <p class="text-gray-600 text-sm mt-2">
      Launched: November 26, 2011<br />
      Mission: Explore Gale Crater on Mars.
    </p>
    <p class="text-gray-700 mt-3">
      Curiosity is equipped with a drill, cameras, and sensors to analyze soil and rocks.
    </p>
    <a
      href="#"
      class="text-teal-500 font-semibold mt-4 inline-block hover:underline"
    >
      Read More →
    </a>
  </div>
</div> */}
    </div>
  )
}

export default RoverInfo
