const contacts = [];

class Contact {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.add(this);
  }
  add(contact) {
    contacts.push(contact);
  }
}

function sortContacts() {
  return contacts.slice().sort((a, b) => {
    if(a.lastName < b.lastName) {
      return -1;
    } else if(a.lastName > b.lastName) {
      return 1;
    } else if(a.firstName < b.firstName) {
      return -1;
    } else if(a.firstName > b.firstName) {
      return 1; 
    } else {
      return 0;
    }
  });
}

function getContacts() {
  return contacts.slice();
}
module.exports = {
  Contact, sortContacts, getContacts
}