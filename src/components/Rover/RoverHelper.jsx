const apiKey = process.env.VITE_NASA_API_KEY;

// Helper function to generate sol range
function getSolRange(maxSol) {
  const sols = [];
  const startSol = Math.max(maxSol - 10, 0); // Ensure we don't go below sol 0
  for (let sol = maxSol; sol >= startSol; sol--) {
    sols.push(sol);
  }
  return sols;
}
  
// Fetch photos for the last 10 sols
export async function fetchPhotosForLast10Sols(roverName, maxSol) {
  const solRange = getSolRange(maxSol);
  const allPhotos = [];

  for (const sol of solRange) {
    const url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos?sol=${sol}&api_key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.photos.length > 0) {
      allPhotos.push(...data.photos);
    }
  }

  return allPhotos;
}



