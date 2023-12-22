
 let score = 0;
//megvárjuk míg a HTML betöltődik
document.addEventListener("DOMContentLoaded", () => {

  //queryselectorok
  const gridDisplay = document.querySelector(".grid");
  const scoreDisplay = document.querySelector('#score');
  const resetButton = document.querySelector('.reset-button');
  const userTitle = document.querySelector(".user");
  
  //újra gomb láthatatlanná tétele
  resetButton.style.display = 'none';



  //kezdeti inicializálás
  const width = 4;
  let squares = [];
 


  //__________________________________________________________________________________
  //tábla készítő
  function createBoard() {

    //4x4 es tábla
    for (let i = 0; i < width * width; i++) {

      //div azaz "kocka" létrehozása
      square = document.createElement("div");
      square.innerHTML = 0;

      //belerakjuk a grid-be
      gridDisplay.appendChild(square);

      //tömbben eltároljuk a kockákat
      squares.push(square);
    }
    generate();
    generate();
  }


  //__________________________________________________________________________________
  //cellák színezése adott értéktől függően
  function updateCellStyles() {
    squares.forEach((square, index) => {

      //kocka értéke
      const value = parseInt(square.innerHTML);
      
    //maga a színek
    let backgroundColor;

    //Alapértelmezett szövegszín
    let textColor = "#776e65"; 

    switch (value) {
        case 0:
        backgroundColor = "#bbada0";
        textColor = "#bbada0"
        break;
        case 2:
        backgroundColor = "#F3F1E3";
        textColor = "#776e65"
        break;
        case 4:
        backgroundColor = "#F8EED0";
        textColor = "#776e65"
        break;
        case 8:
        backgroundColor = "#F5B682";
        textColor = "#f9f6f2"
        break;
        case 16:
        backgroundColor = "#F89563";
        textColor = "#f9f6f2"
        break;
        case 32:
        backgroundColor = "#F77C5E";
        textColor = "#f9f6f2"
        break;
        case 64:
        backgroundColor = "#F75E3D";
        textColor = "#f9f6f2"
        break;
        case 128:
        backgroundColor = "#ECCB84";
        textColor = "#f9f6f2"
        break;
        case 256:
        backgroundColor = "#E8C064";
        textColor = "#f9f6f2"
        break;
        case 512:
        backgroundColor = "#E8BF45";
        textColor = "#f9f6f2"
        break;
        case 1024:
        backgroundColor = "#E6B121";
        textColor = "#f9f6f2"
        break;
        case 2048:
        backgroundColor = "#E6AB16";
        textColor = "#f9f6f2"
        break;

      default:

        //Alapértelmezett szín
        backgroundColor = "#cdc1b4"; 
        break;
    }

    // Módosítjuk a stílust
    square.style.backgroundColor = backgroundColor;
    square.style.color = textColor;

    //hozzáadjuk a cell osztályt
    square.classList.add("cell");
  })};
  
  
  //játék kezdése, létrehozzuk a táblát, majd egyből frissítjük a kinézetlt
  createBoard();
  updateCellStyles();


  //__________________________________________________________________________________
  //random szám generáló
  function generate() {
    //random helyre berakjuk a kockát azaz átírjuk 0->2
    let randomNumber = Math.floor(Math.random() * squares.length);
    if (

      //ha üres a hely, akkor berakja a 2-est
      squares[randomNumber].innerHTML == 0) {
      squares[randomNumber].innerHTML = 2;

      //minden szám generálását követően lecheckolom, hogy betelt-e már a tábla
      checkForLose();
    } else {
      generate();
    }
  }


  //__________________________________________________________________________________
  //jobbra húzás
  function rightSwipe() {
    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {

        //számok eltárolása
        let firstNumInRow = squares[i].innerHTML;
        let secondNumInRow = squares[i + 1].innerHTML;
        let thirdNumInRow = squares[i + 2].innerHTML;
        let fourthNumInRow = squares[i + 3].innerHTML;

        //számok eltárolása tömbben
        let row = [
          parseInt(firstNumInRow),
          parseInt(secondNumInRow),
          parseInt(thirdNumInRow),
          parseInt(fourthNumInRow),
        ];

        console.log(row);

        //nullamentes tömbök
        let filteredRow = row.filter((num) => num);
        console.log(filteredRow);

        //hiányzó számok számossága
        let zerosCount = 4 - filteredRow.length;

        //hiányzó számnyi nullával feltöltött tömb
        let zeros = Array(zerosCount).fill(0);
        console.log(zeros);

        //számok (melyek nem nullák) és a nullások össze illesztése egy tömbbe jobbra zárva
        let newRow = zeros.concat(filteredRow);
        console.log(newRow);

        //megjelenítés
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }


  //__________________________________________________________________________________
  //balra húzás
  function leftSwipe() {
    //16-ig megyünk, és modulo 4 et használunk, mert itt végig kell menni a táblán(16), és (mod 4) mert minden sor első eleme kell

    for (let i = 0; i < 16; i++) {
      if (i % 4 === 0) {

        //számok eltárolása
        let firstNumInRow = squares[i].innerHTML;
        let secondNumInRow = squares[i + 1].innerHTML;
        let thirdNumInRow = squares[i + 2].innerHTML;
        let fourthNumInRow = squares[i + 3].innerHTML;

        //számok eltárolása tömbben
        let row = [
          parseInt(firstNumInRow),
          parseInt(secondNumInRow),
          parseInt(thirdNumInRow),
          parseInt(fourthNumInRow),
        ];

        console.log(row);

        //nullamentes tömbök
        let filteredRow = row.filter((num) => num);
        console.log(filteredRow);

        //hiányzó számok számossága
        let zerosCount = 4 - filteredRow.length;

        //hiányzó számnyi nullával feltöltött tömb
        let zeros = Array(zerosCount).fill(0);
        console.log(zeros);

        //számok (melyek nem nullák) és a nullások össze illesztése egy tömbbe balra zárva  !!!!!
        let newRow = filteredRow.concat(zeros);
        console.log(newRow);

        //megjelenítés
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
      }
    }
  }


  //__________________________________________________________________________________
  //lefele húzás
  function downSwipe() {
    //elég 4 ig bejárni a táblát, mert a tábla első 4 eleméből vizsgáljuk az az alatti elemeket (*width)
    for (let i = 0; i < 4; i++) {
      let firstNumInCol = squares[i].innerHTML;
      let secondNumInCol = squares[i + width].innerHTML;
      let thirdNumInCol = squares[i + width * 2].innerHTML;
      let fourthNumInCol = squares[i + width * 3].innerHTML;

      //számok eltárolása
      let column = [
        parseInt(firstNumInCol),
        parseInt(secondNumInCol),
        parseInt(thirdNumInCol),
        parseInt(fourthNumInCol),
      ];

      //nullamentes oszlopok
      let filteredColumn = column.filter((num) => num);

      //hiányzó számok számossága
      let zerosCount = 4 - filteredColumn.length;

      //hiányzó számnyi nullával feltöltött tömb
      let zeros = Array(zerosCount).fill(0);

      //tömbök összeillesztése
      let newColumn = zeros.concat(filteredColumn);

      //megjelenítés
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }


  //__________________________________________________________________________________
  //felfele húzás
  function upSwipe() {
    //elég 4 ig bejárni a táblát mert a tábla első 4 eleméből vizsgáljuk az az alatti elemeket (*width)
    for (let i = 0; i < 4; i++) {
      let firstNumInCol = squares[i].innerHTML;
      let secondNumInCol = squares[i + width].innerHTML;
      let thirdNumInCol = squares[i + width * 2].innerHTML;
      let fourthNumInCol = squares[i + width * 3].innerHTML;

      //számok eltárolása
      let column = [
        parseInt(firstNumInCol),
        parseInt(secondNumInCol),
        parseInt(thirdNumInCol),
        parseInt(fourthNumInCol),
      ];

      //nullamentes oszlopok
      let filteredColumn = column.filter((num) => num);

      //hiányzó számok számossága
      let zerosCount = 4 - filteredColumn.length;

      //hiányzó számnyi nullával feltöltött tömb
      let zeros = Array(zerosCount).fill(0);

      //tömbök összeillesztése
      let newColumn = filteredColumn.concat(zeros);

      //megjelenítés
      squares[i].innerHTML = newColumn[0];
      squares[i + width].innerHTML = newColumn[1];
      squares[i + width * 2].innerHTML = newColumn[2];
      squares[i + width * 3].innerHTML = newColumn[3];
    }
  }


  //__________________________________________________________________________________
  //kombinálás sorban
  function combineRow() {
    for (let i = 0; i < 15; i++) {
      if (squares[i].innerHTML === squares[i + 1].innerHTML) {
        //két egymás mellett lévők összege
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);

        squares[i].innerHTML = combinedTotal;
        squares[i + 1].innerHTML = 0;

        //pont számláló
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    //minden kombinálásnál lecheckolom, hogy nyert-e a játékos
    checkForWin();
  }


  //__________________________________________________________________________________
  //kombinálás oszlopban
  function combineColumn() {
    //12-ig járjuk csak be mert addig elegendő, mivel az utolsó sort nem kell
    for (let i = 0; i < 12; i++) {
      if (squares[i].innerHTML === squares[i + width].innerHTML) {
        //két egymás alatti lévők összege
        let combinedTotal =
          parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);

        squares[i].innerHTML = combinedTotal;
        squares[i + width].innerHTML = 0;

        //pont számláló
        score += combinedTotal;
        scoreDisplay.innerHTML = score;
      }
    }
    //minden kombinálásnál lecheckolom, hogy nyert-e a játékos
    checkForWin();
  }


  //__________________________________________________________________________________
  //Swipe funkció
  //változók
  let startTouchX;
  let startTouchY;
  let isSwipeSuspended = false;

  //Eseménykezelő a swipe kezdésére
  gridDisplay.addEventListener("touchstart", (e) => {
    startTouchX = e.touches[0].clientX;
    startTouchY = e.touches[0].clientY;
  });

  //Eseménykezelő a swipe közben
  //Ha nem érünk hozzá vagy felfüggessztettük a swipe-ot, simán return
  gridDisplay.addEventListener("touchmove", (e) => {
    if (!startTouchX || !startTouchY || isSwipeSuspended) return;

    //Jelenlegi koordináták
    const currentTouchX = e.touches[0].clientX;
    const currentTouchY = e.touches[0].clientY;

    //kezdeti és a jelenlegi érintés közti különbség
    const diffX = startTouchX - currentTouchX;
    const diffY = startTouchY - currentTouchY;

    //Threshold az érvényes swipe-nek
    const threshold = 50;

    //Vizsgálat arra, hogy elég nagyot swipe-oltunk-e
    if (Math.abs(diffX) > threshold || Math.abs(diffY) > threshold) {

      // Vízszintes swipe
      if (Math.abs(diffX) > Math.abs(diffY)) {
        if (diffX > 0) {
          // Balra swipe
          keyLeft();
        } else {
          // Jobbra swipe
          keyRight();
        }
      }// Függőleges swipe 
      else { 
        if (diffY > 0) {
          // Felfelé swipe
          keyUp();
        } else {
          // Lefelé swipe
          keyDown();
        }
      }

      // Reset startTouchX és startTouchY, hogy ne legyen folyamatos swipe
      startTouchX = null;
      startTouchY = null;
    }
  });

  // Eseménykezelő a swipe befejezésére
  gridDisplay.addEventListener("touchend", () => {
    startTouchX = null;
    startTouchY = null;
  });


  //__________________________________________________________________________________
  //irányító gombok
  function control(e) {
    //ha a jobbra(39) vagy a D(65) nyilat felengedjük
    if (e.keyCode === 39 || e.keyCode === 68) {
      keyRight();
    } else if (e.keyCode === 37 || e.keyCode === 65) {
      keyLeft();
    } else if (e.keyCode === 38 || e.keyCode === 87) {
      keyUp();
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      keyDown();
    }
  }


  //keyup (amikor felengedjük az adott gombot)
  document.addEventListener("keyup", control);

  //__________________________________________________________________________________
  //Mozgások
  //jobbra az összes, majd rögtön kombinál, kombináltat is jobbra, majd egy új szám jön be a táblába, és frissítjük a megjelenést
  function keyRight() {
    rightSwipe();

    combineRow();
    
    rightSwipe();

    generate();

    updateCellStyles();
  }

  function keyLeft() {
    leftSwipe();

    combineRow();

    leftSwipe();

    generate();

    updateCellStyles();
  }

  function keyDown() {
    downSwipe();

    combineColumn();

    downSwipe();

    generate();

    updateCellStyles();
  }
  function keyUp() {
    upSwipe();

    combineColumn();

    upSwipe();

    generate();

    updateCellStyles();

  }
  //__________________________________________________________________________________
  //pont elküldése
  function giveScore(score){

  }





  //__________________________________________________________________________________



  //__________________________________________________________________________________
  //nyert-e vizsgáló
  function checkForWin() {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 2048) {

        //létrehozzuk az eredmény div-jét
        const resultDiv = document.createElement('div');
        resultDiv.className = 'result';

        //ráillesszük a táblára
        const tableDiv = document.querySelector('.table');
        tableDiv.appendChild(resultDiv);

        //Majd beleírjuk a szöveget
        resultDiv.innerText = "Nyertél!";

        //felfüggesztjük az irányításokat
        document.removeEventListener("keyup", control);
        isSwipeSuspended = true;

        //Újra gomb láthatóvá tétele
        resetButton.style.display = 'block';
      }
    }
  }


  //__________________________________________________________________________________
  //vesztett-e vizsgáló
  function checkForLose() {
    let zeros = 0;

    //nullák megszámolása
    for (let i = 0; i < squares.length; i++) {
      if (squares[i].innerHTML == 0) {
        zeros++;
      }
    }

    //ha nincs 0-s akkor vesztettünk
    if (zeros === 0) {

    //Jelenleg elért pont átadása a "update_score.php"-nek
    let earnedScore = {
      "scr": score,
    };

    fetch("update_score.php", {
      "method": "POST",
      "headers": {
        "Content-Type": "application/json; charset=utf-8"
       },
      "body": JSON.stringify(earnedScore)
      }).then(function(response){
        return response.text();
      }).then(function(data){
        console.log(data);
      })

 
      //létrehozzuk az eredmény div-jét
      const resultDiv = document.createElement('div');
      resultDiv.className = 'result';

      //ráillesszük a táblára
      const tableDiv = document.querySelector('.table');
      tableDiv.appendChild(resultDiv);

      //Majd beleírjuk a szöveget
      resultDiv.innerText = "Vesztettél!";
        
      //felfüggesztjük az irányításokat
      document.removeEventListener("keyup", control);
      isSwipeSuspended = true;

      //Újra gomb láthatóvá tétele
      resetButton.style.display = 'block';      
    }
  }
});


//__________________________________________________________________________________
//Újrakezdés funkció
function reset(){
  location.reload();
}


//__________________________________________________________________________________
//Menü funkció
function menu(){
  var menuURL = 'index.php';
    window.location.href = menuURL;
}

//__________________________________________________________________________________
//ScoreBoard
function showEndScreen(){
  document.getElementById("scoreValue").innerHTML="Score: "+score;
  document.getElementById("endScreen").style.display="block";
}

function showScores () {
  document.getElementById("endScreen").style.display="none";
  document.getElementById("scoresScreen").style.display="block";
  document.getElementById("scoresContainer").innerHTML="Loading...";
  getScores();
}

function getScores() {
  fetch('server.php')
  .then(response => response.json())
  .then(data => console.log(data));
    };

