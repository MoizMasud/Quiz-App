//we need to do 3 things: start game, set nextquestions, do something when u select answer

const startButton = document.querySelector('.start-btn');
const nextButton = document.querySelector('.next-btn');
const questionContainer = document.getElementById('question-container');
let shuffledQuestions, currentQuestionsIndex;
startButton.addEventListener('click' , startGame);
nextButton.addEventListener('click' , () => {
    currentQuestionsIndex++; // get next question
    setNextQuestion();
});
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-btns');

function startGame() {
    startButton.classList.add('hide');
    questionContainer.classList.remove('hide'); // shows questions container
    shuffledQuestions = QuestionsList.sort(() => Math.random() * 0.5); // completely random question
    currentQuestionsIndex = 0; // start from first question in questions list
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(shuffledQuestions[currentQuestionsIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) { 
            button.dataset.correct = answer.correct; // sets the data attribute to true if answer is correct
        }
        button.addEventListener('click', selectAnswer);
        answerButtons.appendChild(button);
    })
}

function resetState() {
    clearElementStatus(document.body) // resets background color
    nextButton.classList.add('hide');
    while(answerButtons.firstChild) { // removes all the previous buttons
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(event) {
    const selectedButton = event.target;
    const correct = selectedButton.dataset.correct;
    // change body and button colors
    setStatusClass(document.body, correct);
    Array.from(answerButtons.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if(shuffledQuestions.length > currentQuestionsIndex+1) {
        nextButton.classList.remove('hide') // still have questions left
    } else {
        //last question 
        startButton.innerText = 'Restart';
        startButton.classList.remove('hide');
    }
   
}

function setStatusClass(element, isCorrect) {
    // clear previous buttons status
    clearElementStatus(element);
    if(isCorrect) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearElementStatus(element) {
    element.classList.remove('correct');
    element.classList.remove ('wrong');
}

const QuestionsList = [
    {
        question: 'Who made this?',
        answers: [
            {text: 'Osama', correct: false},
            {text: 'Moiz', correct: true},
            {text: 'Wu tang clan', correct: false},
            {text: 'J Cole', correct: false},
        ]
    },
    {
        question: 'When was this made?',
        answers: [
            {text: '2012', correct: false},
            {text: '2020', correct: false},
            {text: '2001', correct: false},
            {text: '2022', correct: true},
        ]
    },
    {
        question: 'What the best country?',
        answers: [
            {text: 'Canada', correct: false},
            {text: 'Pakistan', correct: true},
            {text: 'USA', correct: false},
            {text: 'Russia', correct: false},
        ]
    }
]