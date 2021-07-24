// Project inspired by Daniel Shiffman, Coding Train

// Pseudocode of Algorithm Generation
// https://en.wikipedia.org/wiki/Maze_generation_algorithm#Iterative_implementation

let cols,rows;
const w = 25;

let cells = [];

let currentCell, randomNeighbour;
let visitedCells = [];
let stack = [];

function getIndex(x,y){
    if(x <0)
        return -1;
    else if(y<0)
        return -1;
    else if(x>cols-1)
        return -1;
    else if(y>rows-1)
        return -1;

    return y*cols + x;
}

function checkNeighbour(cell){
    let unvisitedNeighbour = [];
    let x = cell.x;
    let y = cell.y;

    // cell above
    let index = getIndex(x, y-1);
    if(index != -1){
        let neighbour = cells[index];
        if(!neighbour.visited)
            unvisitedNeighbour.push(neighbour)
    }
    
    // cell to right 
    index = getIndex(x+1, y);
    if(index != -1){
        let neighbour = cells[index];
        if(!neighbour.visited)
            unvisitedNeighbour.push(neighbour)
    }

    // cell below
    index = getIndex(x, y+1);

    if(index != -1){
        let neighbour = cells[index];
        if(!neighbour.visited)
            unvisitedNeighbour.push(neighbour)
    }

    // cell to left 
    index = getIndex(x-1, y);
    if(index != -1){
        let neighbour = cells[index];
        if(!neighbour.visited)
            unvisitedNeighbour.push(neighbour)
    }

    return unvisitedNeighbour;
}

function removeWalls(cell, neighbour){
    let cellIndex = getIndex(cell.x, cell.y);
    let neighbourIndex = getIndex(neighbour.x, neighbour.y);

    // cell left and neighbour right
    if(cellIndex - neighbourIndex == -1){
        cell.walls[1] = false;
        neighbour.walls[3] = false;
    }

    // cell top and neighbour bottom
    else if(cellIndex - neighbourIndex < -1){
        cell.walls[2] = false;
        neighbour.walls[0] = false;
    }

    // cell right and neighbour left
    else if(cellIndex - neighbourIndex == 1){
        cell.walls[3] = false;
        neighbour.walls[1] = false;
    }
    
    // cell bottom and neighbour top
    else if(cellIndex - neighbourIndex > 1){
        cell.walls[0] = false;
        neighbour.walls[2] = false;
    }

    else{
        console.log("something's not right...");
    }
}


function setup(){
    createCanvas(400,400);
    frameRate(10);

    cols = floor(width/w);
    rows = floor(height/w);

    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            cells.push(new Cell(i,j));
        }
    }

    currentCell = cells[0];
    currentCell.visited = true;
    stack.push(currentCell);
}

function draw(){
    background(51);
    
    for(let i=0; i< cells.length; i++){
        cells[i].draw();
    }
    
    currentCell = stack.pop();
    currentCell.highlight();


    let unvisitedNeighbours = checkNeighbour(currentCell);

    if(unvisitedNeighbours.length){
        stack.push(currentCell);
        
        randomNeighbour = unvisitedNeighbours[Math.floor(Math.random() * unvisitedNeighbours.length)];

        removeWalls(currentCell, randomNeighbour)
        randomNeighbour.visited = true;
        stack.push(randomNeighbour);
    }

}

class Cell {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.visited = false;
      this.walls = [true, true, true, true];     // [top, right, bottom, left]
    }

    draw(){
        let x = this.x * w;
        let y = this.y * w;
        
        stroke(255);

        // top line of rect
        if(this.walls[0])
            line(x, y, x+w, y);

        // right line of rect
        if(this.walls[1])
            line(x+w, y, x+w, y+w);

        // bottom line of rect
        if(this.walls[2])
            line(x+w, y+w, x, y+w);
        
        // left line of rect
        if(this.walls[3])
            line(x, y+w, x, y);

        if(this.visited){
            fill("#40916c");
            noStroke();
            rect(x, y, w,w);
        }
            
    }

    highlight() {
        let x = this.x * w;
        let y = this.y * w;
        noStroke();
        fill(255, 0, 0, 100);
        rect(x, y, w, w);
      };
  }