// Sort by title
function sortByTitle(itemA, itemB) {
  let titleA = itemA.getTitle().toLowerCase();
  let titleB = itemB.getTitle().toLowerCase();
  if(titleA < titleB) {
    return -1;
  } else if(titleA > titleB) {
    return 1;
  } else {
    return 0
  }
}

function getAllDoneItems(array) {
  return array.filter(item => item.isDone());
}

function getAllUndoneItems(array) {
  return array.filter(item => !(item.isDone()));
}

// return an array sorted based on the items status and titles 
function sort(array) {
  let sortedUndoneItems =  getAllUndoneItems(array).sort(sortByTitle);
  let sortedDoneItems =  getAllDoneItems(array).sort(sortByTitle);
  return [...sortedUndoneItems, ...sortedDoneItems];
}

module.exports = {
  sort
}