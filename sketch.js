let debug = false;
let Turl;
let originalmap = true;

if (debug) {
  Turl = "https://api-v3.mbta.com/vehicles?filter%5Broute_type%5D=1&api_key=a3702bb23cb44a24bce28119a8db0ec0"
} else {
  Turl = "http://192.168.19.39:5000"
}


let Tjason = null;
let mapimg;
let cx;
let cy;
let mappedX;
let mappedY;
let mapUrl;
let zoom;
let slider;
let clon;
let clat;


if (originalmap){
  clon = -71.06603;
  clat = 42.32684;
  zoom = 10;
} else {
  clon = -71.0617;
  clat = 42.3135;
  zoom = 10.4;
}



let json;
function preload() {

  cx = mercX(clon);
  cy = mercY(clat);


  if (originalmap){
  mapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + clon + "," + clat + "," + zoom + "," +
    "0,0/1024x512?access_token=pk.eyJ1Ijoia2VlbmFuZ3JheSIsImEiOiJjbDltdHU3ZzEwMWJ6M3dubHlhMDMybHJ4In0.Go3MKj2uDvnizU2H-iiUHQ";
  mapimg = loadImage(mapUrl);
  } else{
 mapUrl = "https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-71.0617,42.3135,10.4,0/585x1266?access_token=pk.eyJ1IjoibWZlaW5iZXJnIiwiYSI6ImNsYWI2bnFuNzAwczczb243NGpyejhuMWkifQ.aUKZAxciz9GrVWvz0qG-dA"
  mapimg = loadImage(mapUrl);
  }

 

  Tjason = loadJSON(Turl);



}

setInterval(function () {
  Tjason = JSON.parse(Get(Turl));
  // console.log(Tjason)
}, 5000)

function setup() {

  // setInterval(function(){
  //   Tjason = JSON.parse(Get(Turl));
  //   // console.log(Tjason)
  // },10000)


  createCanvas(mapimg.width, mapimg.height + 400);

  redLineAshmont = convertLine(redLineAshmont, cx, cy);
  orangeLine = convertLine(orangeLine, cx, cy);
  blueLine = convertLine(blueLine, cx, cy);
  mattapanLine = convertLine(mattapanLine, cx, cy);
  JFKToBraintree = convertLine(JFKToBraintree, cx, cy);


  angleMode(RADIANS);
  imageMode(CENTER);

}





function draw() {

  frameRate(60)
  clear();
  translate(width / 2, height / 2 - 200);
  image(mapimg, 0, 0);
  push();
  strokeWeight(10);
  stroke(225, 0, 0);
  drawLine(redLineAshmont);
  drawLine(mattapanLine);
  drawLine(JFKToBraintree);
  stroke(225, 168, 0);
  drawLine(orangeLine);
  stroke(0, 0, 225);
  drawLine(blueLine);
  pop();

  let latT;
  let lonT;

  for (var i = 0; i < Tjason.data.length; i++) {
    number = Tjason.data[i].attributes.label;
    latT = Tjason.data[i].attributes.latitude;
    lonT = Tjason.data[i].attributes.longitude;
    Rotation = Tjason.data[i].attributes.bearing;
    Color = Tjason.data[i].relationships.route.data.id;
    Direction = Tjason.data[i].attributes.direction_id;
    Status = Tjason.data[i].attributes.current_status;
    Occupancy = Tjason.data[i].attributes.occupancy_status;
    mappedX = mercX(lonT) - cx;
    mappedY = mercY(latT) - cy;

    push();
    translate(mappedX, mappedY);
    rectMode(CENTER)

    let c = map(mouseX, 0, width, 0, 360);

    rotate(Rotation);

    let colObj = color(Color);
    let col1 = color(colObj.levels[0], colObj.levels[1], colObj.levels[2]);
    let col2 = color(
      colObj.levels[0] + 50,
      colObj.levels[1] + 50,
      colObj.levels[2] + 50
    );



    fill(col2);

    // if (Direction == 1) {
    //   rect(0, 0, 20, 10, 0, 20, 20, 0)
    // }
    // if (Direction == 0) {
    //   rect(0, 0, 20, 10, 0, 20, 20, 0)
    // }

    if (Direction == 1) {
      circle(0, 0, 10)
    }
    if (Direction == 0) {
      circle(0, 0, 10)
    }
    pop();
  }


  for (let i = 0; i < Tjason.data.length; i++) {
    number = Tjason.data[i].attributes.label;
    latT = Tjason.data[i].attributes.latitude;
    lonT = Tjason.data[i].attributes.longitude;
    Rotation = Tjason.data[i].attributes.bearing;
    Color = Tjason.data[i].relationships.route.data.id;
    Direction = Tjason.data[i].attributes.direction_id;
    Status = Tjason.data[i].attributes.current_status;
    Occupancy = Tjason.data[i].attributes.occupancy_status;
    mappedX = mercX(lonT) - cx;
    mappedY = mercY(latT) - cy;

    if (abs((mouseX - width / 2) - mappedX) < 5 && abs((mouseY - height / 2 + 200) - mappedY) < 5) {
      if (debug) {
        Occupancy = [1, 37, 81, 123, 142, 167]
      }
      GUI(mouseX - width / 2, mouseY - height / 2 + 200, Color, Direction, Status, Occupancy)
    }

  }


}
