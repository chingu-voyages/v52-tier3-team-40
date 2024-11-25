import {useState, useRef} from 'react'

const RoverPhotosDisplay = ({photos, camera}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filterPhotos = photos?.filter((photo)=> photo.camera.name === camera)
  console.log(filterPhotos)

  const scrollContainerRef = useRef(null)

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <>
    {!filterPhotos.length ? 
          <p >
            Sorry there were no photos taken by {camera}in the last 5 sol.
          </p>
          :
    <div className="relative w-full">
      {/* Scroll Left Button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollLeft}
      >
        ←
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth w-full p-4"
      >
        {
          filterPhotos.map(photo => (
          <img
            key={photo.id}
            src={photo.img_src}
            alt={photo.camera.full_name}
            className="h-40 sm:h-48 md:h-64 rounded-lg shadow-md hover:scale-105 ease-in-out duration-300"
            onClick={()=>setSelectedPhoto(photo)}
          />
        ))}
      </div>

      {/* Scroll Right Button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 rounded-full shadow-md"
        onClick={scrollRight}
      >
        →
      </button>

      {selectedPhoto && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setSelectedPhoto(null)}
          >
            ✕
          </button>
          <img
            src={selectedPhoto.img_src}
            alt={selectedPhoto.camera.full_name}
            className="rounded-lg mb-4"
          />
          <h3 className="text-lg font-bold">{selectedPhoto.camera.full_name}</h3>
          <p className="text-gray-600">Sol: {selectedPhoto.sol}</p>
          <p className="text-gray-600">Earth Date: {selectedPhoto.earth_date}</p>
          <p className="text-gray-600">Rover: {selectedPhoto.rover.name}</p>
        </div>
      </div>
    )}
    <div>Hello</div>
    </div>
  }
  </>
  );
};

export default RoverPhotosDisplay
