import { useState } from 'react'
import RoverInfo from './RoverInfo'

const Rover = () => {
  const [selectedRover, setSelectedRover] = useState("")
  const [openInfo, setOpenInfo] = useState(false)



  return (
    <div className="w-full max-w-7xl px-6 py-6 bg-gray-800 rounded-3xl shadow-lg ">
      <h2 className="text-3xl font-bold">Mars Rovers</h2>
      <p className='py-2'>Mars rovers are robotic vehicles designed to explore the surface of Mars. They capture high-resolution images, analyze soil and rock samples, and collect data to study the planet's geology, climate, and potential for past or present life.</p>
      <p className='pb-2 italic'>Click to learn more about a specific rover and view the images it captured of Mars.</p>
      <div className='flex'>
        <div className="flex flex-col">
          <button 
              className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-l"
              onClick={()=>{
                setSelectedRover("perseverance")
                setOpenInfo(true)
              }}
          >
            Perseverance
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4"
            onClick={()=>{
              setSelectedRover("curiosity")
              setOpenInfo(true)
            }}
          >
            Curiosity
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4"
            onClick={()=>{
              setSelectedRover("opportunity")
              setOpenInfo(true)
            }}
          >
            Opportunity
          </button>
          <button 
            className="bg-gray-300 hover:bg-gray-400 text-gray-500 font-bold py-2 px-4 rounded-r"
            onClick={()=>{
              setSelectedRover("spirit")
              setOpenInfo(true)
            }}
          >
            Spirit
          </button>
        </div>
        <RoverInfo selectedRover={selectedRover}/>
        {/* {openInfo && <RoverInfo selectedRover={selectedRover}/>} */}
      </div>
    </div>
  )
}

export default Rover
