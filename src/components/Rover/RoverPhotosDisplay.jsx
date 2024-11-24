import {useState, useEffect} from 'react'
import { fetchPhotosForLast10Sols } from './RoverHelper';

const RoverPhotosDisplay = ({photos, camera}) => {
  const [displayPhotos, setDisplayPhotos] = useState([])

  const filterPhotos = photos.filter((photo)=> photo.camera.name === camera)
  console.log(filterPhotos)
  setDisplayPhotos(filterPhotos)

  return (
    <div>
      This is for {camera} photo display
    </div>
  )
}

export default RoverPhotosDisplay
