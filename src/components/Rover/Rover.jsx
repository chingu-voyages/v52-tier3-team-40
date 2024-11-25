import { useState } from 'react'
import RoverInfo from './RoverInfo'

const Rover = () => {
  const [selectedRover, setSelectedRover] = useState("")
  const [openInfo, setOpenInfo] = useState(false)



  return (
    <div className="w-full px-4 py-6 bg-gray-200 relative">
      <h2 className="text-lg font-semibold">Mars Rover</h2>
      <p>This is the rover component of the homepage.</p>
      <p>Pick your rover</p>
      <div className="inline-flex">
        <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
            onClick={()=>{
              setSelectedRover("perseverance")
              setOpenInfo(true)
            }}
        >
          Perseverance
        </button>
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          onClick={()=>{
            setSelectedRover("curiosity")
            setOpenInfo(true)
          }}
        >
          Curiosity
        </button>
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4"
          onClick={()=>{
            setSelectedRover("opportunity")
            setOpenInfo(true)
          }}
        >
          Opportunity
        </button>
        <button 
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
          onClick={()=>{
            setSelectedRover("spirit")
            setOpenInfo(true)
          }}
        >
          Spirit
        </button>
      </div>
      {openInfo && <RoverInfo selectedRover={selectedRover}/>}
    </div>
  )
}

export default Rover
