_ = lodash;

function redistribute(items) {
  let lockedRatio = 0;
  let unlockedNumber = 0;
  _.each(items, (item) => {
    if (item.locked) lockedRatio += item.ratio;
    else unlockedNumber++;
  });
  const unlockedRatio = (1-lockedRatio)/unlockedNumber;
  _.each(items, (item) => {
    if (!item.locked) item.ratio = unlockedRatio;
  });
  return items;
}

function redistributeMale(items) {
  let lockedRatio = 0;
  let unlockedNumber = 0;
  _.each(items, (item) => {
    if (item.lockedMale) lockedRatio += item.male;
    else unlockedNumber++;
  });
  const unlockedRatio = (1-lockedRatio)/unlockedNumber;
  _.each(items, (item) => {
    if (!item.lockedMale) item.male = unlockedRatio;
  });
  return items;
}

function redistributeFemale(items) {
  let lockedRatio = 0;
  let unlockedNumber = 0;
  _.each(items, (item) => {
    if (item.lockedFemale) lockedRatio += item.female;
    else unlockedNumber++;
  });
  const unlockedRatio = (1-lockedRatio)/unlockedNumber;
  _.each(items, (item) => {
    if (!item.lockedFemale) item.female = unlockedRatio;
  });
  return items;
}

export { redistribute, redistributeMale, redistributeFemale };