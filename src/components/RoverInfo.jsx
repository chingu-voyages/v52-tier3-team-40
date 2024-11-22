import React, { useEffect, useState } from 'react'

const RoverInfo = ({selectedRover}) => {
	const apiKey = process.env.VITE_NASA_API_KEY
	const [roverInfo, setRoverInfo] = useState("")
	
	useEffect(()=> {
		const fetchManifest = async ()=>{
			try {
				const response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${selectedRover}?&api_key=${apiKey}`)
				const data = await response.json()
				setRoverInfo(data)
			} catch (error) {
			console.error(error)
			}
		};
		
		if (selectedRover) {
			fetchManifest();
		}

	}, [selectedRover])

  return (
    <div>
      {!roverInfo ? <p>Loading...</p> : <div>RoverInfo</div>}
    </div>
  )
}

export default RoverInfo
