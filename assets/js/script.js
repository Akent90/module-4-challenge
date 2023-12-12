var startButton = document.getElementById('start-btn');
var questionContainer = document.getElementById('quiz-screen');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerElement = document.getElementById('end-screen');
var finalScoreElement = document.getElementById('final-score');
var initialsForm = document.getElementById('score-form');
var highScoresScreen = document.getElementById('high-scores');
var scoreList = document.getElementById("go-back");
var clearScoresButton = document.getElementById('clear-scores');

var currentQuestionIndex, questions, timer, score;

questions = [
    { question: "In HTML, which of the following is the correct way for showing how to import an external script?", answers: [
        "<script add='index.js'></script>",
        "<script src='index.js'></script>",
        "<script adding-js='index.js'></script>",
        "<script js='index.js'></script>"
    ], correct: 0 },

    { question: "How is the document type initialized in HTML5?", answers: [
        "</DOCTYPE HTML>",
        "</DOCTYPE>",
        "<!HTML>",
        "<!DOCTYPE HTML>"
    ], correct: 3 },

    { question: "In JavaScript, what is the name of the method used to remove white space from the beginning and end of a string?", answers: [
        ".reduce()",
        ".trim()",
        ".slice()",
        ".substring()"
    ], correct: 1 }, 

    { question: "In JavaScript, a variable that has been declared but not assigned a value is known as...?", answers: [
        "unknown",
        "pending",
        "undefined",
        "unassigned"
    ], correct: 2 },

    { question: "In JavaScript, which comparison operator is used to express strict equality?", answers: [
        ">=",
        "+=",
        "<=",
        "==="
    ], correct: 3 },

    { question: "What does JSON stand for?", answers: [
        "Jupiter Script Object Notation",
        "JavaScript Object Notation",
        "Jabber Script Object Notation",
        "Jargon Script Object Notation"
    ], correct: 1 },

    { question: "In JavaScript, what is the logical AND operator?", answers: [
        "||",
        "**",
        "!",
        "&&"
    ], correct: 3 },

    { question: "In JavaScript, what is the name of the method used to add new elements to the DOM tree?", answers: [
        "Callback function",
        ".querySelectorAll()",
        "document.createElement()",
        ".textContent()"
    ], correct: 2 },

    { question: "In JavaScript, what type of value is an Array?", answers: [
        "Object",
        "Array",
        "Map",
        "Set",
    ], correct: 0 },

    { question: "In JavaScript, what is it called when an event is triggered on a target element and subsequent parent elements?", answers: [
        "Event propagation",
        "Event bubbling",
        "Event capturing",
        "Event handling",
    ], correct: 1 },
];

startButton.addEventListener('click', startGame);
initialsForm.addEventListener('submit', saveHighScore);
goBackButton.addEventListener('click', goBack);
clearScoresButton.addEventListener('click', clearHighScores);

function startGame() {
    score = 0;
    currentQuestionIndex = 0;
    startButton.classList.add('hidden');
    questionContainer.classList.remove('hidden');
    timer = 60;
    startTimer();
    setNextQuestion();
}

function startTimer() {
    timerElement.innerText = timer;
    var timerInterval = setInterval(function(){
        timer--;
        timerElement.innerText = timer;
        if (timer <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}