//query selectorok
const titleText = document.querySelector('.title-text');
const gameButton = document.querySelector('.game-button');
const game = document.querySelector('.game');
const loginResp = document.querySelector('.login-resp');
const regResp = document.querySelector('.reg-resp');
const regButton = document.querySelector('.register-button');
const regMenuButton = document.querySelector('.register-menu-button');
const h2Element = document.querySelector("h2");
const logButton = document.querySelector('.login-button');
const backButton = document.querySelector('.back-button');
document.querySelector('form').onsubmit = function() {
    login();
    return false;    
};


//kezdőképernyő még nem fontos gombjainak láthatatlanná tétele
/*regButton.style.display = 'none';
backButton.style.display = 'none';
*/
gameButton.style.display = 'block';
regButton.style.display = 'block';

//Jelszó validálás
function validatePassword() {   
    const password = document.getElementById('password').value;
       const numberPattern = /\d/;
       const specialCharPattern = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

       //számok vizsgálata
       if (!numberPattern.test(password)) {
           alert('A jelszónak tartalmaznia kell legalább egy számot.');
           return false;
       }
       //speciális karakterek vizsgálata
       if (!specialCharPattern.test(password)) {
           alert('A jelszónak tartalmaznia kell legalább egy speciális karaktert.');
           return false;
       }

       //helyes jelszó
       if (numberPattern.test(password)  && specialCharPattern.test(password)){

        //'Sikeres regisztráció' felirat kiírása
        let regText = document.createElement('span');
        regText.className = "reg-output";
        regResp.appendChild(regText);

        //Regisztráció gomb letiltása
        regButton.disabled = true;
            
        console.log("registration succesful")
        return true;
       }
       
       

   }

//Oldal újratöltése
function reload(){
    location.reload();
}

//Bejelentkezés
function login(){
    //név kiválasztása
    let name = document.querySelector('#user-name').value
    //Üdvözlés létrehozása
    let greeting = `Üdv, ${name}. Jó szórakozást!`;
    console.log(greeting);

    //span létrehozása a HTML-ben, class nevet adunk hozzá, majd feltöltjük az üdvözléssel

    let text = document.createElement('span');
    text.className = "greeting-output"
    text.innerText = greeting;

    //game div-hez hozzáadjuk
    loginResp.appendChild(text);

    //majd a játék oldalára a hivatkozást is 
    game.innerHTML += `<a href="game.php?user-name=${name}" class="game-button">Játék</a>`;

    //láthatóvá/láthatatlanná tesszük a gombot
    gameButton.style.display = 'block';
    regButton.style.display = 'block';
    regMenuButton.style.display = 'none';
    backButton.style.display = 'block';

    //bejelentkezés gomb letiltása
    logButton.disabled = true;

    
    
}

   function registration() {

    titleText.innerText = "2048 Registration"

    //'Regisztrálj' szöveg kiírása
    h2Element.innerText = "Regisztrálj!";

    //láthatóvá/láthatatlanná tesszük a gombot
    logButton.style.display = 'none';
    regButton.style.display = 'block';
    regMenuButton.style.display = 'none';
    backButton.style.display = 'block';
    //gameButton.style.display = 'none';

    
    
   }

   function submitForm() {
    if (validatePassword()) {
        document.forms[0].submit(); // Csak akkor küldjük el a formát, ha a validáció sikeres

    } else {
    }
}






// Az eredmények ablak bezárása
function closeScoresScreen() {
    document.getElementById("scoresScreen").style.display = "none";
}

// Ezt a függvényt hívd meg, amikor a szerverről lekérted az eredményeket
function displayScores(scores) {
    const scoresContainer = document.getElementById("scoresContainer");
    scoresContainer.innerHTML = "";

    scores.forEach(score => {
        const scoreItem = document.createElement("div");
        scoreItem.textContent = `${score.username}: ${score.score}`;
        scoresContainer.appendChild(scoreItem);
    });
}

// Szerverről eredmények lekérésére
function getScores() {
    return fetch('server.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);
        return data;
      })
      .catch(error => {
        console.error('Error fetching scores:', error);
        throw error;
      });
  }
  
  // A ScoreBoard gombra kattintva megjeleníti az eredményeket
function showScores() {
    document.getElementById("scoresScreen").style.display = "flex";
  
    // getScores visszaad egy Promise-t, így a .then blokkban kezeljük a lekért adatokat
    getScores().then(data => {
      const scoresContainer = document.getElementById("scoresContainer");
      scoresContainer.innerHTML = "";
      
  
        // Táblázat létrehozása
        const table = document.createElement("table");

        // Fejléc létrehozása
        const headerRow = document.createElement("tr");
        const usernameHeader = document.createElement("th");
        usernameHeader.innerText = "Username";
        const scoreHeader = document.createElement("th");
        scoreHeader.innerText = "Score";
        headerRow.appendChild(usernameHeader);
        headerRow.appendChild(scoreHeader);
        table.appendChild(headerRow);

        // Adatok hozzáadása a táblázathoz
        data.forEach(a => {
            const row = document.createElement("tr");
            const usernameCell = document.createElement("td");
            usernameCell.innerText = a.UserName;
            const scoreCell = document.createElement("td");
            scoreCell.innerText = a.Score;
            row.appendChild(usernameCell);
            row.appendChild(scoreCell);
            table.appendChild(row);
        });

        // Táblázat hozzáadása a táblázathoz
        scoresContainer.appendChild(table);
    });
  }
  

  
  

   