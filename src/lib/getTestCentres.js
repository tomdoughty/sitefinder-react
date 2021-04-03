import calculateDistance from './calculateDistance';
import facilities from './facilities';
import fullAddress from './fullAddress';
import openingTimes from './openingTimes';

// Returns list of test centres based on filters and location
const getTestCentres = (testCentres, filters, latitude, longitude) => testCentres
  // Check all filters
  .filter((testCentre) => filters.every(({ id }) => testCentre[id]))
  // Map test centres to pretify data
  .map((testCentre) => ({
    ...testCentre,
    distance: calculateDistance(
      testCentre,
      latitude,
      longitude
    ),
    facilities: facilities(testCentre),
    fullAddress: fullAddress(testCentre),
    openingTimes: openingTimes(testCentre),
  }))
  // Order by nearest first
  .sort((a, b) => a.distance - b.distance)
  // Only return top 25 results
  .slice(0, 25);

export default getTestCentres;
