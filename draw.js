function GUI(x,y,Color, Direction, Status, passengers){
    push();
    if (Status == "ARRIVING_AT") {
      Status = "Train Aproaching";
    }
  
    if (Direction == "0") {
      Direction = "Inbound";
    }
    if (Direction == "1") {
      Direction = "Outbound";
    }
    if (Status == "INCOMING_AT") {
      Status = "Train Incoming";
      if (Direction == "0") {
        Direction = "Inbound";
      }
      if (Direction == "1") {
        Direction = "Outbound";
      }
    }
    if (Status == "IN_TRANSIT_TO") {
      Status = "In Transit To";
      if (Direction == "0") {
        Direction = "Inbound";
      }
      if (Direction == "1") {
        Direction = "Outbound";
      }
    }
  
    if (Status == "STOPPED_AT") {
      Status = "Stopped";
      if (Direction == "0") {
        Direction = "Inbound";
      }
      if (Direction == "1") {
        Direction = "Outbound";
      }
    }
      push()
      strokeWeight(5)
      rect(x+10,y+10,170,65,5)
      textAlign(CENTER)
      fill(255);
      textSize(8);
      stroke(0);
      strokeWeight(2);
      text(Color, x+30, y+40);
      text(Direction, x+88, y+40);
      text(Status,x+150, y+40);


    
      push();
      for (var i=0;i<6;i++){
        colorMode(HSB,100)
        fill(map(passengers[i],0,167,30,0),100,100)
        rect(x+20+i*26,y+50,20,10,100)
      }
    pop();
  
      push();
      strokeWeight(2);
      fill(0, 200, 90);
      textSize(11)
      text("Train Line", x+40, y+30);
      text("Direction", x+95, y+30);
      text("Status", x+150, y+30);
      pop();
      pop()
  }
