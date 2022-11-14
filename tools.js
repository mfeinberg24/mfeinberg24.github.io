function mercX(lon) {
  lon = radians(lon);
  var a = (256 / PI) * pow(2, zoom);
  var b = lon + PI;
  return a * b;
}

function mercY(lat) {
  lat = radians(lat);
  var a = (256 / PI) * pow(2, zoom);
  var b = tan(PI / 4 + lat / 2);
  var c = PI - log(b);GUI
  return a * c;
}

function drawLine(lineVals) {
  for (var i = 0; i <= lineVals.length - 4; i += 2) {
    line(lineVals[i], lineVals[i + 1], lineVals[i + 2], lineVals[i + 3]);
  }
}

function convertLine(lineVals, cx, cy) {
  NewList = [];
  for (var i = 0; i < lineVals.length; i++) {
    if (i % 2 == 0) {
      NewList.push(mercX(lineVals[i]) - cx);
    } else {
      NewList.push(mercY(lineVals[i]) - cy);
    }
  }
  return NewList;
}

function Get(yourUrl){
  var Httpreq = new XMLHttpRequest(); // a new request
  Httpreq.open("GET",Turl,false);
  Httpreq.send(null);
  return Httpreq.responseText;        
}
