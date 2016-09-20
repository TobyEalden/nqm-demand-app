_ = lodash;

function centreOf(points) {
  if(points.length === 1) points = points[0];
  let lats = [];
  let longs = [];
  _.each(points, (point) => {
    lats.push(point[1]);
    longs.push(point[0]);
  }); 


  return([_.mean(lats), _.mean(longs)]);
}

export { centreOf };