// https://colorhunt.co/palette/f5e8c7ecccb2deb6abac7088

const etchGrid = document.getElementById("etch-grid")
const CONTENTSIZE = 500
const upArrow = document.getElementById("up-arrow")
const downArrow = document.getElementById("down-arrow")
const upArrowSens = document.getElementById("up-arrow-sens")
const downArrowSens = document.getElementById("down-arrow-sens")
const gridSizeNumber = document.getElementById("grid-size-number")
const sensitivityNumber = document.getElementById("sensitivity-number")

window.getSelection().removeAllRanges()

let mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  --mouseDown;
}

const arrowButtonBools = new Map([["downArrow", false], ["upArrow", false], ["downArrowSens", false], ["upArrowSens", false]])

let mouseOverEtch = false

let gridGenerated = false 

let gridSize = 15

let sensitivity = 0.1

function generateGrid(cells){
  if (gridGenerated){
    while (etchGrid.firstChild) {
      etchGrid.removeChild(etchGrid.lastChild);
    }
  }

  function drawIntoCell(e){
    if (!mouseDown) return
    //e.target.style.backgroundColor = "#c688a0"
    const opacity = e.target.style.opacity
    if (opacity >= 1){
      return
    } else {
      e.target.style.opacity = parseFloat(opacity) + sensitivity;
      if (e.target.style.opacity > 1 ) e.target.style.opacity = 1
      console.log(e.target.style.opacity)
     }
  }

  gridGenerated = true

  for (let i = 0; i < cells; i++) {
    const cellSize = (CONTENTSIZE / cells) 
    const row = document.createElement('div');
    row.classList.add("flex-grid")

    for (let iInner = 0; iInner < cells; iInner++) {
      const cell = document.createElement('div');
      cell.style.backgroundColor = "#c688a0"
      cell.style.opacity = 0
      cell.classList.add("col");
      //cell.style.padding = cellSize/2+"px"
      cell.style.height = cellSize+"px"
      cell.style.width = cellSize+"px"
      cell.addEventListener("mouseover", drawIntoCell)
      row.appendChild(cell) 
    }
    etchGrid.appendChild(row)
  
  }
}

function incrementGridSize(){
  if (gridSize < 100 ){
    gridSize++
  } else {
    gridSize = 1
  }    
}

function decreaseGridSize(){
  if (gridSize > 1 ){
    gridSize--
  } else {
    gridSize = 100
  }    
}

function increaseSens(){
  if (sensitivity < 1 ){
    sensitivity = sensitivity+0.1
  } else {
    sensitivity = 0.1
  }
  sensitivity = Math.round(sensitivity*10)/10
}

function decreaseSens(){
  if (sensitivity > 0.1 ){
    sensitivity = sensitivity-0.1
  } else {
    sensitivity = 1
  } 
  sensitivity = Math.round(sensitivity*10)/10
}

function changeGridSize(isIncreasing, whichArrow){
  if (isIncreasing){
    incrementGridSize()
  } else {
    decreaseGridSize()
  }
  gridSizeNumber.textContent = gridSize.toString()
  setTimeout(() => {
    if (!arrowButtonBools.get(whichArrow)) {
      generateGrid(gridSize)
      return
    }
    if (isIncreasing) { 
      changeGridSize(true, "upArrow")
    } else {
      changeGridSize(false, "downArrow")
    }
  }, 100);
}

function changeSens(isIncreasing, whichArrow){
  if (isIncreasing){
    increaseSens()
  } else {
    decreaseSens()
  }
  
  sensitivityNumber.textContent = sensitivity.toString()
  setTimeout(() => {
    if (!arrowButtonBools.get(whichArrow)) {
      return
    }
    if (isIncreasing) { 
      changeSens(true, "upArrowSens")
    } else {
      changeSens(false, "downArrowSens")
    }
  }, 100);
}

// mousedown ///////////////////////////////////////////////////////////

etchGrid.addEventListener("mouseover", ()=>{
  mouseOverEtch = true
})

etchGrid.addEventListener("mouseout", ()=>{
  mouseOverEtch = false
})

// down arrow, grid size

downArrow.addEventListener("mousedown", () => {
  arrowButtonBools.set("downArrow", true)
  setTimeout(() => {
    if (arrowButtonBools.get("downArrow")) { 
      changeGridSize(false, "downArrow")
    }
  }, 500);
});
downArrow.addEventListener("click", () => {
  decreaseGridSize()
  generateGrid(gridSize)
  gridSizeNumber.textContent = gridSize.toString()
});
downArrow.addEventListener("mouseup", () => { arrowButtonBools.set("downArrow", false) });
downArrow.addEventListener("mouseleave", () => { arrowButtonBools.set("downArrow", false); });

// up arrow, grid size

upArrow.addEventListener("mousedown", () => {
  arrowButtonBools.set("upArrow", true)
  setTimeout(() => {
    if (arrowButtonBools.get("upArrow")) { 
      changeGridSize(true, "upArrow")
    }
  }, 500);
});
upArrow.addEventListener("click", () => {
  incrementGridSize()
  generateGrid(gridSize)
  gridSizeNumber.textContent = gridSize.toString()
});
upArrow.addEventListener("mouseup", () => { arrowButtonBools.set("upArrow", false) });
upArrow.addEventListener("mouseleave", () => { arrowButtonBools.set("upArrow", false) });

// down arrow, sens

downArrowSens.addEventListener("mousedown", () => {
  arrowButtonBools.set("downArrowSens", true)
  setTimeout(() => {
    if (arrowButtonBools.get("downArrowSens")) { 
      changeSens(false, "downArrowSens")
    }
  }, 500);
});
downArrowSens.addEventListener("click", () => {
  decreaseSens()
  sensitivityNumber.textContent = sensitivity.toString()

});
downArrowSens.addEventListener("mouseup", () => { arrowButtonBools.set("downArrowSens", false) });
downArrowSens.addEventListener("mouseleave", () => { arrowButtonBools.set("downArrowSens", false) });

// up arrow, sens

upArrowSens.addEventListener("mousedown", () => {
  arrowButtonBools.set("upArrowSens", true)
  setTimeout(() => {
    if (arrowButtonBools.get("upArrowSens")) { 
      changeSens(true, "upArrowSens")
    }
  }, 500);
});
upArrowSens.addEventListener("click", () => {
  increaseSens()
  sensitivityNumber.textContent = sensitivity.toString()

});
upArrowSens.addEventListener("mouseup", () => { arrowButtonBools.set("upArrowSens", false) });
upArrowSens.addEventListener("mouseleave", () => { arrowButtonBools.set("upArrowSens", false) });

////////////////////////////////////////////////////////////////////



generateGrid(gridSize)