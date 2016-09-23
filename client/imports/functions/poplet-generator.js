_ = lodash;

function genPoplets(lsoaData, populations, age_bands) {
  let poplets = [];
  _.each(populations, (population) => {
    _.each(lsoaData, (lsoa) => {
      let totalMale = 0;
      let totalFemale = 0;
      _.each(age_bands, (band) => {
        let male = population.population * lsoa.ratio * 0.5 * band.male;
        totalMale += male;
        poplets.push ({
          area_name: lsoa.name,
          area_id: lsoa.area_id,
          age_band: band.range,
          gender: "male",
          year: population.year,
          persons: male,
          popId: "",
          popId_description: ""
        });
        let female = population.population * lsoa.ratio * 0.5 * band.female;
        totalFemale += female;
        poplets.push({
          area_name: lsoa.name,
          area_id: lsoa.area_id,
          age_band: band.range,
          gender: "female",
          year: population.year,
          persons: female,
          popId: "",
          popId_description: ""
        }); 
      });
      poplets.push({
        area_name: lsoa.name,
        area_id: lsoa.area_id,
        age_band: "All Ages",
        gender: "female",
        year: population.year,
        persons: totalFemale,
        popId: "",
        popId_description: ""
      });   
      poplets.push({
        area_name: lsoa.name,
        area_id: lsoa.area_id,
        age_band: "All Ages",
        gender: "male",
        year: population.year,
        persons: totalMale,
        popId: "",
        popId_description: ""
      }); 
    });
  });
  return poplets;
}

function getRecipe(name, id, poplets) {
  let years = {};
  let lsoas = {};
  _.each(poplets, (poplet) => {
    if (poplet.age_band === "All Ages") {
      if (years[poplet.year]) years[poplet.year] += poplet.persons;
      else years[poplet.year] = poplet.persons;
      if (lsoas[poplet.area_id]) lsoas[poplet.area_id].population += poplet.persons;
      else {
        lsoas[poplet.area_id] = {};
        lsoas[poplet.area_id].population = poplet.persons;
        lsoas[poplet.area_id].name = poplet.area_name;
      }
    }
  });

  const populations = _.map(years, (population, year) => {
    return {year: parseInt(year,10), population: Math.round(population)};
  });
  const totalPop = _.sumBy(populations, (year) => {
    return year.population;
  });
  const lsoaData = _.map(lsoas, (data, id) => {
    return {area_id: id, ratio: data.population/totalPop, name: data.name, locked: true};
  });
  let bands = _.filter(poplets, (poplet) => {
    if (poplet.area_id === lsoaData[0].area_id && poplet.year === populations[0].year) return true;
    else return false;
  });
  const all_ages = _.remove(bands, (band) => {
    if (band.age_band === "All Ages") return true;
    else return false;
  });
  bands = _.groupBy(bands, (band) => {
    return band.age_band;
  });
  let totalMale, totalFemale;
  if (all_ages[0].gender === "male") {
    totalMale = all_ages[0].persons;
    totalFemale = all_ages[1].persons;
  }
  else {
    totalMale = all_ages[1].persons;
    totalFemale = all_ages[0].persons;
  }
  const age_bands = _.map(bands, (data, band) => {
    let male, female;
    if (data[0].gender === "male") {
      male = data[0].persons;
      female = data[1].persons;
    }
    else {
      male = data[1].persons;
      female = data[0].persons;
    }
    return {range: band, male: male/totalMale, female: female/totalFemale, lockedMale: true, lockedFemale: true};
  });
  const state = {
    name: name,
    id: id,
    lsoaData: lsoaData,
    populations: populations,
    age_bands: age_bands
  };

  return state;
}

export { genPoplets, getRecipe }; 