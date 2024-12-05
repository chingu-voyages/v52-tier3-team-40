import {useState, useRef} from 'react'

const RoverPhotosDisplay = ({photos, camera}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)

  const filterPhotos = photos?.filter((photo)=> photo.camera.name === camera)

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
        <p className="font-bold text-xl">
          Sorry there were no photos taken by {camera} in the last 5 sols.
        </p>
      :
        <div className="relative max-w-[975px]">
      
          {/* Scroll Left Button */}
          <button
            className="absolute -left-6 sm:-left-4 top-1/2 box-border transform -translate-y-1/2 z-10 bg-gray-800 text-white p-2 text-lg rounded-full shadow-md"
            onClick={scrollLeft}
          >
            ←
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth w-full p-4"
          >
            {filterPhotos.map(photo => (
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
            className="absolute -right-6 sm:-right-8 top-1/2 transform -translate-y-1/2 z-10 box-border bg-gray-800 text-white text-lg p-2 rounded-full shadow-md"
            onClick={scrollRight}
          >
            →
          </button>

          {selectedPhoto && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center transition-opacity justify-center z-50">
              <div className="bg-white p-6 md:p-10 rounded-lg w-full sm:w-3/5 relative">
                <button
                  className="absolute top-1 md:top-2 right-2 md:right-3 text-2xl border-box font-bold text-gray-500 hover:text-gray-900"
                  onClick={() => setSelectedPhoto(null)}
                >
                  ✕
                </button>
                <img
                  src={selectedPhoto.img_src}
                  alt={selectedPhoto.camera.full_name}
                  className="rounded-lg mb-4 w-5/6 md:w-2/3 mx-auto"
                />
                <div className="md:w-3/5 m-auto">
                  <h3 className="text-lg text-center font-bold text-slate-900">{selectedPhoto.camera.full_name}</h3>
                  <p className="text-gray-700 text-center">Sol: {selectedPhoto.sol}</p>
                  <p className="text-gray-700 text-center">Earth Date: {selectedPhoto.earth_date}</p>
                  <p className="text-gray-700 text-center">Rover: {selectedPhoto.rover.name}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      }
    </>
  );
};

export default RoverPhotosDisplay
