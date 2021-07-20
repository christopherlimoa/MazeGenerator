let cols,rows;
const w = 40;

let cells = [];

function setup(){
    createCanvas(400,400);

    cols = floor(width/w);
    rows = floor(height/w);

    for(let i=0;i<cols;i++){
        for(let j=0;j<rows;j++){
            cells.push(new Cell(i,j))
        }
    }
}

function draw(){
    background(51);

    for(let i=0; i< cells.length; i++){
        cells[i].draw();
    }

}

class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    draw(){
        let x = this.x * w;
        let y = this.y * w;
        
        stroke(255)
        // top line of rect
        line(x, y, x+w, y)
        // right line of rect
        line(x+w, y, x+w, y+w)
        // bottom line of rect
        line(x+w, y+w, x, y+w)
        // left line of rect
        line(x, y+w, x, y)
    }
  }