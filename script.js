const questions = [
    {
        question: "What is the capital of India?",
        answer: [
            { text: "Delhi", correct: true },
            { text: "Goa", correct: false },
            { text: "Paris", correct: false },
            { text: "Chennai", correct: false },
        ]
    },
    {
        question: "Who is known as the 'Father of the Nation' of India?",
        answer: [
            { text: "Nehru Ji", correct: false },
            { text: "V. O. Chidambaram Pillai", correct: false },
            { text: "Mahatma Gandhi", correct: true },
            { text: "Ganga", correct: false },
        ]
    },
    {
        question: "Which river is considered the holiest in India?",
        answer: [
            { text: "Godavari", correct: false },
            { text: "Gir", correct: false },
            { text: "Krishna", correct: false },
            { text: "Ganga", correct: true },
        ]
    },
    {
        question: "What is the national animal of India?",
        answer: [
            { text: "Lion", correct: false },
            { text: "Donkey", correct: false },
            { text: "Monkey", correct: false },
            { text: "Bengal Tiger", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart";
    nextButton.style.display = "block";
    nextButton.addEventListener("click", startQuiz);
}

startQuiz();
