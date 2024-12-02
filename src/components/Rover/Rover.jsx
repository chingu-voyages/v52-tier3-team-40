import { useState } from 'react'
import RoverInfo from './RoverInfo'

const Rover = () => {
  const [selectedRover, setSelectedRover] = useState("perseverance")

  return (
    <div className="w-full px-8 py-6 bg-gray-900 rounded-3xl shadow-lg ">
      <div className="self-center text-center">
        <h2 className="text-3xl font-bold">Mars Rover</h2>
        <hr className="border-b-teal-400 border-b-2 border-t-0 w-32 mx-auto my-4"></hr>
        <p className="text-gray-400 pb-4">
          UNMANNED VEHICLES MAPPING DISTANT PLACES
        </p>
      </div>

      <div className='container mx-auto px-4 md:px-24 xl:px-64'>
        <p className='py-2'>Mars rovers are robotic vehicles designed to explore the surface of Mars. They capture high-resolution images, analyze soil and rock samples, and collect data to study the planet's geology, climate, and potential for past or present life.</p>
        <p className='py-3 italic'>Click to learn more about a specific rover and view the images it had captured of Mars.</p>
      </div>
      <div className='flex flex-col sm:flex-row mt-4'>
        <div className="flex flex-row sm:flex-col">
          <button 
            className={`${selectedRover === "perseverance" ? "bg-cyan-700" : "bg-teal-200 hover:bg-teal-500 text-slate-600"} sm:text-xl font-bold py-2 px-2 sm:px-4 border-2 border-gray-900 border-b-0 sm:border-0 sm:border-b-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none -ml-0.5`}
            onClick={()=>{
              setSelectedRover("perseverance")
            }}
          >
            Perseverance
          </button>
          <button 
            className={`${selectedRover === "curiosity" ? "bg-cyan-700" : "bg-teal-200 hover:bg-teal-500 text-slate-600"} sm:text-xl font-bold py-2 px-2 sm:px-4 border-2 border-gray-900 border-b-0 sm:border-0 sm:border-b-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none`}
            onClick={()=>{
              setSelectedRover("curiosity")
            }}
          >
            Curiosity
          </button>
          <button 
            className={`${selectedRover === "opportunity" ? "bg-cyan-700" : "bg-teal-200 hover:bg-teal-500 text-slate-600"} sm:text-xl font-bold py-2 px-2 sm:px-4 border-2 border-gray-900 border-b-0 sm:border-0 sm:border-b-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none`}
            onClick={()=>{
              setSelectedRover("opportunity")
            }}
          >
            Opportunity
          </button>
          <button 
            className={`${selectedRover === "spirit" ? "bg-cyan-700" : "bg-teal-200 hover:bg-teal-500 text-slate-600"} sm:text-xl font-bold py-2 px-2 sm:px-4 border-2 border-gray-900 border-b-0 sm:border-0 sm:border-b-4 rounded-t-lg sm:rounded-l-lg sm:rounded-tr-none`}
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
