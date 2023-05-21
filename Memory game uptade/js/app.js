const moves = document.getElementById("moves-count");
const timeValue = document.getElementById("time");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const gameContainer = document.querySelector(".game-container");
const result = document.getElementById("result");
const controls = document.querySelector(".controls-container");
const checkbox = document.querySelector("#checkbox");
const body = document.querySelector("body");
const container = document.querySelector(".container");

let select = document.querySelector('#select')
let cards;
let interval;
let firstCard = false;
let secondCard = false;
 let type = 'Cars';

 checkbox.addEventListener("click", () => {
  body.classList.toggle("active");
  controls.classList.toggle("active");
});

 select.addEventListener('change' , () =>{
  type = select.value
  console.log(select.value);
 })

//Items array
let items = [
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

//Initial Time
let seconds = 0,
  minutes = 0;
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
  if(!winCount > 0){
    if(movesCount == 3){
      result.innerHTML = `<h2>You Won</h2>
      <h4>Moves: ${movesCount}</h4>`;
        stopGame();
    }
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
        card.classList.add("flipped");
        if (!firstCard) {
          firstCard = card;
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
            if (winCount == Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You Won</h2>
            <h4>Moves: ${movesCount}</h4>`;
              stopGame();
            }
          } else {
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

  if( type == 'Furniture'){
    items = [
      {
        name: "bee",
        image:
          "https://media.istockphoto.com/id/1329937916/photo/scandinavian-domestic-dining-room-interior.jpg?s=1024x1024&w=is&k=20&c=Kutzt5DumAWH0r6gxSf5eSWX2ZO5O-twwZ2xuUFOUDI=",
      },
      {
        name: "crocodile",
        image:
          "https://media.istockphoto.com/id/1468739859/photo/wood-dining-table-landscape-with-sunlight.jpg?s=612x612&w=0&k=20&c=Hxmo9EP62hbDD6HYjhiZIanfx4pSWxoXUwVrbSpdzb4=",
      },
      {
        name: "macaw",
        image:
          "https://media.istockphoto.com/id/1202095799/photo/scandinavian-dining-room-interior.jpg?s=612x612&w=0&k=20&c=mXkbhmTqn79dLoTjKLJsyUtt_KVweWDs6uO39El7y8M=",
      },
      {
        name: "gorilla",
        image:
          "https://media.istockphoto.com/id/1141409340/photo/stylish-and-modern-dining-room-interior-with-design-sharing-table-chairs-gold-pendant-lamp.jpg?s=612x612&w=0&k=20&c=Qxsvd-4nj46aJxFfDcd03FWhGBqejeCZFrDPfQ1X784=",
      },
      {
        name: "tiger",
        image:
          "https://media.istockphoto.com/id/1328629859/photo/modern-dining-room-with-wooden-dining-table-chairs-and-potted-plants.jpg?s=612x612&w=0&k=20&c=NeaE_UJjaPMlH_9cw0CErtS262q6mTRTKH7QacY4K0s=",
      },
      {
        name: "monkey",
        image:
          "https://media.istockphoto.com/id/1136896439/photo/eclectic-and-elegant-dining-room-interior-with-design-sharing-table-chairs-gold-pedant-lamp.jpg?s=612x612&w=0&k=20&c=Oit_13eS2il2e_r26Rnewe1err7az8aRc7LWfA2VEl4=",
      },
      {
        name: "chameleon",
        image:
          "https://media.istockphoto.com/id/948764188/photo/gold-open-space-interior.jpg?s=612x612&w=0&k=20&c=F3dr--5V3jFtr8DENiJXwujR_0PpgWCJmVaJEsXaVUA=",
      },
      {
        name: "piranha",
        image:
          "https://media.istockphoto.com/id/1410960904/photo/dining-room-interior-with-wooden-table-and-wicker-chairs.jpg?s=612x612&w=0&k=20&c=K2sg72qbz6Hrnwg4qzleaOViSh_1zxVHujjPzDRi5c4=",
      },
      {
        name: "anaconda",
        image:
          "https://media.istockphoto.com/id/1480208543/photo/modern-minimalistic-dining-room-interior.jpg?s=612x612&w=0&k=20&c=iM0OXSS9CVweZc1maxIvHzH1b2SDMYnJw3DFLnGWN-w=",
      },
      {
        name: "sloth",
        image:
          "https://media.istockphoto.com/id/933712640/photo/modern-nordic-dining-room-in-loft-apartment-3d-rendering.jpg?s=612x612&w=0&k=20&c=I0SjonFEjTRrcE1bLFymYAIlZUQ7p0kwJEJMCTwluws=",
      },
      {
        name: "cockatoo",
        image:
          "https://media.istockphoto.com/id/1155655369/photo/modern-dining-room.jpg?s=612x612&w=0&k=20&c=uBfFpA6mqVU_NmbBjGz3pzKonQqbrlaVyO2E1cbrUP0=",
      },
      {
        name: "toucan",
        image:
          "https://media.istockphoto.com/id/822646256/photo/white-dining-hall.jpg?s=612x612&w=0&k=20&c=IjZSNKjJZpLe_rLFRZneqCSFSfg4Nli6LUxvWqas5OY=",
      },
    ];
  }else if(type == 'Animals'){
    items = [
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
  }else if (type == 'Cars'){
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


  let loader = document.querySelector('.loader')

  loader.classList.add('active')

setTimeout(() => {
  loader.classList.remove('active')
}, 1000);
 setTimeout(() => {
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
 }, 1000);
});

//Stop game
stopButton.addEventListener(
  "click",
  (stopGame = () => {
    controls.classList.remove("hide");
    stopButton.classList.add("hide");
    startButton.classList.remove("hide");
    clearInterval(interval);
  }),
);

//Initialize values and func calls
const initializer = () => {
  result.innerText = "";
  winCount = 0;
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};
// 