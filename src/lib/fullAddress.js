const fullAddress = (testCentre) => [
  testCentre.address,
  testCentre.addressLine2,
  testCentre.town,
  testCentre.postCode,
].filter(Boolean).join(', ');

export default fullAddress;
