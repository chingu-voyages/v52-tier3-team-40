import { useState } from 'react'
import RoverInfo from './RoverInfo'

const Rover = () => {
  const [selectedRover, setSelectedRover] = useState("perseverance")

  return (
    <div className="w-full max-w-7xl px-8 py-6 bg-gray-900 rounded-3xl shadow-lg ">
      <div className="self-center text-center">
        <h2 className="text-3xl font-bold">Mars Rover</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400 pb-4">
          UNMANNED VEHICLES MAPPING DISTANT PLACES
        </p>
      </div>

      <div className='container mx-auto px-4 md:px-32 xl:px-64'>
        <p className='py-2'>Mars rovers are robotic vehicles designed to explore the surface of Mars. They capture high-resolution images, analyze soil and rock samples, and collect data to study the planet's geology, climate, and potential for past or present life.</p>
        <p className='pb-2 italic'>Click to learn more about a specific rover and view the images it had captured of Mars.</p>
      </div>
      <div className='flex'>
        <div className="flex flex-col">
          <button 
            className="bg-teal-200 hover:bg-teal-500 text-slate-600 font-bold py-2 px-4 border-y-2 border-y-gray-900 rounded-l-lg -mt-0.5"
            onClick={()=>{
              setSelectedRover("perseverance")
            }}
          >
            Perseverance
          </button>
          <button 
            className="bg-teal-200 hover:bg-teal-500 text-slate-600 font-bold py-2 px-4 border-y-2 border-y-gray-900 rounded-l-lg"
            onClick={()=>{
              setSelectedRover("curiosity")
            }}
          >
            Curiosity
          </button>
          <button 
            className="bg-teal-200 hover:bg-teal-500 text-slate-600 font-bold py-2 px-4 border-y-2 border-y-gray-900 rounded-l-lg"
            onClick={()=>{
              setSelectedRover("opportunity")
            }}
          >
            Opportunity
          </button>
          <button 
            className="bg-teal-200 hover:bg-teal-500 text-slate-600 font-bold py-2 px-4 border-y-2 border-y-gray-900 rounded-l-lg"
            onClick={()=>{
              setSelectedRover("spirit")
            }}
          >
            Spirit
          </button>
        </div>
        <RoverInfo selectedRover={selectedRover}/>
      </div>
    </div>
  )
}

export default Rover
