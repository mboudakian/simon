let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let playing = false;
let level = 0;

//detecta si fue apretada la tecla para empezar a jugar

$(document).keydown(function() {
  if (!playing) {
    //cambia el valor del nivel del titulo
    $("#level-title").text("Nivel " + level);
    nextSequence();
    playing = true;
  }
});

//funcion para seleccionar el sonido segun el color
function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//funcion para armar la secuencia
function nextSequence() {
  //vacia el array una vez q aumenta el nivel
  userClickedPattern = [];
  //aumenta el nivel
  level++;

  //dentro de nextSequence(), actualizamos el h1
  $("#level-title").text("Nivel " + level);

  //randomiza el color a elegir
  let randomNumber = Math.floor(Math.random() * 4);

  let randomChosenColour = buttonColours[randomNumber];

  //pushea el color generado al array del patron
  gamePattern.push(randomChosenColour);

  //animacion y sonido
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

//funcion para que el usuario clickee
$(".btn").click(function() {
  let userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//animaciones con click
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

//chequea la respuesta, en caso de ser correcto llama a la nextsequence()
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("wrong");
    setTimeout(function() {
      $("body").removeClass("wrong");
    }, 200);
    $("h1").text("Perdiste! apreta cualquier tecla para volver a jugar");
    startOver();
  }
}

function startOver() {
  level = 0;
  playing = false;
  gamePattern = [];
}
