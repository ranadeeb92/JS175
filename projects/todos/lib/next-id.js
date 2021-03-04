// handle object ID generation
let currentId = 0;

function nextId() {
  currentId++;
  return currentId;
}

module.exports = nextId;