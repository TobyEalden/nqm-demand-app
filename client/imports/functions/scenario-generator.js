_ = lodash;

function generateScenario(initial, planning, year) {

  _.remove(planning, (poplet) => {
    if (poplet.year != year) return true;
    else return false;
  });

  let totals = {
    "0-4": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "5-9": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "10-14": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "15-19": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "20-24": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "25-29": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "30-34": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "35-39": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "40-44": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "45-49": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "50-54": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "55-59": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "60-64": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "65-69": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "70-74": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "75-79": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "80-84": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "85-89": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0},
    "90+": {iMale: 0, iFemale: 0, pMale: 0, pFemale: 0, mRatio: 0, fRatio: 0}
  };
  _.each(initial, (poplet) => {
    if (poplet.gender === "male") totals[poplet.age_band].iMale += poplet.persons;
    else totals[poplet.age_band].iFemale += poplet.persons;
  });
  _.each(planning, (poplet) => {
    if (poplet.gender === "male") totals[poplet.age_band].pMale += poplet.persons;
    else totals[poplet.age_band].pFemale += poplet.persons;
  });
  _.each(totals, (ageBand) => {
    ageBand.mRatio = 1 - (ageBand.pMale/ageBand.iMale);
    ageBand.fRatio = 1- (ageBand.pFemale/ageBand.iFemale); 
  });
  _.each(initial, (poplet) => {
    if (poplet.gender === "male") poplet.persons *= totals[poplet.age_band].mRatio;
    else poplet.persons *= totals[poplet.age_band].fRatio;
  });
  _.each(planning, (poplet) => {
    let pop = _.find(initial, (iPoplet) => {
      if ((iPoplet.area_id === poplet.area_id) && (iPoplet.gender === poplet.gender) && (iPoplet.age_band === poplet.age_band)) return true;
      else return false;
    });
    pop.persons += poplet.persons;
  });
  return initial;
}

export { generateScenario }; 