const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const wrapper = document.querySelector(".wrapper");
const checkbox = document.querySelector("#checkbox");
const body = document.querySelector("body");
const container = document.querySelector(".container");
const controlsContainer = document.querySelector(".controls-container");
let loader = document.querySelector(".loader");
let select = document.querySelector("#select");

checkbox.addEventListener("click", () => {
  body.classList.toggle("active");
  controlsContainer.classList.toggle("active");
});

let cards;
let interval;
let firstCard = false;
let secondCard = false;
let type = "Animals";

select.addEventListener("change", () => {
  type = select.value;
  console.log(select.value);
});
//Items array

let items = [
  { name: "bee", image: "image/bee.png" },
  { name: "crocodile", image: "image/crocodile.png" },
  { name: "macaw", image: "image/macaw.png" },
  { name: "gorilla", image: "image/gorilla.png" },
  { name: "tiger", image: "image/tiger.png" },
  { name: "monkey", image: "image/monkey.png" },
  { name: "chameleon", image: "image/chameleon.png" },
  { name: "piranha", image: "image/piranha.png" },
  { name: "anaconda", image: "image/anaconda.png" },
  { name: "sloth", image: "image/sloth.png" },
  { name: "cockatoo", image: "image/cockatoo.png" },
  { name: "toucan", image: "image/toucan.png" },
];
//Initial Time
let seconds = 0,
  minutes = 0,
  nums = 0;
//Initial moves and win count
let movesCount = 0,
  winCount = 0;
//For timer
const timeGenerator = () => {
  seconds += 1;
  //minutes logic
  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }
  //format time before displaying
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

//For calculating moves
const movesCounter = () => {
  movesCount += 1;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  if (movesCount == 3) {
    nums = 0;
    result.innerHTML = `<h2>You Lose</h2>
            <h4>Moves: ${movesCount}</h4>`;
    stopGame();
  }
};
const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];
  size = (size * size) / 2;
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    tempArray.splice(randomIndex, 1);
  }
  return cardValues;
};
select.addEventListener("change", () => {
  tempArray = select.value;
});
const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];
  //simple shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
       create cards
      */
    gameContainer.innerHTML += `
     <div class="card-container" data-card-value="${cardValues[i].name}">
        <div class="card-before">?</div>
        <div class="card-after">
        <img src="${cardValues[i].image}" class="image"/></div>
     </div>
     `;
  }
  //Grid
  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;
  //Cards
  cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      if (!card.classList.contains("matched")) {
        //flip the cliked card
        loader.style.display = "flex";
        wrapper.style.filter = "blur(20px)";
        setTimeout(() => {
          loader.style.display = "none";
          wrapper.style.filter = "blur(0px)";
        }, 400);
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
          console.log("bitta card ochildi");
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();

          //secondCard and value
          
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue == secondCardValue) {
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");
            firstCard = false;
            winCount += 1;
            nums = 0;
            console.log("bir xil card topildi");

            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else if (nums == 2) {
            console.log("xatolar soni 3 ga teng boldi");
            nums = 0;
            result.innerHTML = `<h2>You Lose</h2>
            <h4>Moves: ${movesCount}</h4>`;
            stopGame();
          } else {
            nums += 1;
            console.log("xatolar soni " + nums);
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};
//Start game
startButton.addEventListener("click", () => {
  if (type == "Cars") {
    items = [
      { name: "lambo", image: "image/lambo.jpg" },
      { name: "lamborgini", image: "image/lamborgini.jpg" },
      { name: "mclaren", image: "image/mclaren.jpg" },
      { name: "mersedes", image: "image/mersedes.jpg" },
      { name: "nissan", image: "image/nissan.jpg" },
      { name: "corvette", image: "image/corvette.jpg" },
      { name: "camaro", image: "image/camaro.jpg" },
      { name: "pinred", image: "image/pinred.jpg" },
      { name: "veyron", image: "image/veyron.jpg" },
      { name: "mers", image: "image/mers.jpg" },
      { name: "bugattKona", image: "image/bugattKona.jpg" },
      { name: "bugatti", image: "image/bugatti.jpg" },
    ];
  }

  movesCount = 0;
  seconds = 0;
  minutes = 0;

  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");
  //Start timer
  interval = setInterval(timeGenerator, 1000);
  //initial moves
  moves.innerHTML = `<span>Moves:</span> ${movesCount}`;
  initializer();
});

//Stop game

stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  })
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
