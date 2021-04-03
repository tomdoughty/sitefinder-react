import facilities from './facilities';
import fullAddress from './fullAddress';
import openingTimes from './openingTimes';

const getTestCentre = (testCentres, id) => {
  if (testCentres.length) {
    const testCentre = testCentres
      .find((centre) => centre.id === id);

    if (testCentre) {
      return {
        ...testCentre,
        facilities: facilities(testCentre),
        fullAddress: fullAddress(testCentre),
        openingTimes: openingTimes(testCentre),
      };
    }
  }
  return null;
};

export default getTestCentre;