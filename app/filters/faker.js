// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
const faker = require("faker");

// Leave this filters line
let filters = {}

/*
  ====================================================================
  fakePerson
  --------------------------------------------------------------------
  Short description for the filter
  ====================================================================

  Usage:

  [Usage here]

*/

filters.fakePerson = (string) => {
  // faker.seed(123)
  let firstName = faker.name.firstName();
  let lastName = faker.name.lastName();
  let fullName = firstName + " " + lastName;
  let email = fullName.split(' ').join('.').toLowerCase() + "@example.com";
  let user = {
    firstName: firstName,
    lastName: lastName,
    fullName: fullName,
    email: email
  }
  return user;
}

/*
  ====================================================================
  fakeAddress
  --------------------------------------------------------------------
  Short description for the filter
  ====================================================================

  Usage:

  [Usage here]

*/

filters.fakeAddress = (string) => {

  return address;
}


// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
