var startButton = document.getElementById('start-btn');
var questionContainer = document.getElementById('quiz-screen');
var questionElement = document.getElementById('question');
var answerButtonsElement = document.getElementById('answer-buttons');
var timerElement = document.getElementById('time-left');
var finalScoreElement = document.getElementById('final-score');
var initialsForm = document.getElementById('score-form');
var highScoresScreen = document.getElementById('high-scores');
var scoreList = document.getElementById("high-score-list");
var clearScoresButton = document.getElementById('clear-scores');
var goBackButton = document.getElementById('go-back');
var startScreen = document.getElementById('start-screen');
var endScreen = document.getElementById('end-screen');

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
    timer = 120;
    startTimer();
    setNextQuestion();
}

function startTimer() {
    timerElement.innerText = timer;
    var timerInterval = setInterval(() => {
        timer--;
        timerElement.innerText = timer;
        if (timer <= 0 || currentQuestionIndex >= questions.length) {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function resetState() {
    answerButtonsElement.innerHTML = '';
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(function(answer, index) {
        var button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        if (index === question.correct) {
            button.dataset.correct = true;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer() {
    var selectedButton = this;
    var correct = selectedButton.dataset.correct;
    if (!correct) {
        timer -= 10; 
    } else {
        score++;
    }
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        setNextQuestion();
    
    } else {
        endQuiz();
    }
}

function endQuiz() {
    questionContainer.classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    finalScoreElement.innerText = score;
}

function saveHighScore(e) {
    e.preventDefault();
    var initials = initialsForm.initials.value;
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    var newScore = { score: score, initials: initials };
    highScores.push(newScore);
    highScores.sort(function(a, b) { return b.score - a.score; });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    showHighScores();
}
 
function showHighScores() {
    endScreen.classList.add('hidden');
    highScoresScreen.classList.remove('hidden');
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    scoreList.innerHTML = highScores.map(function(score) { return '<li>' + score.initials + ' - ' + score.score + '</li>';}).join('');
}

document.getElementById('view-high-scores').addEventListener('click', function(){
    startScreen.classList.add('hidden');
    showHighScores();
});

function goBack() {
    highScoresScreen.classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    startButton.classList.remove('hidden');
    startScreen.classList.remove('hidden');
}

function clearHighScores() {
    localStorage.removeItem('highScores');
    scoreList.innerHTML = '';
}