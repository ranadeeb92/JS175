const contacts = [];

class Contact {
  constructor(firstName, lastName, phoneNumber) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }
}

function addContact(contact) {
  contacts.push(contact);
} 

function sortContacts(data) {
  return data.slice().sort((a, b) => {
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

const clone = object => {
  return JSON.parse(JSON.stringify(object));
}


module.exports = {
  Contact, sortContacts, getContacts, addContact, clone
}