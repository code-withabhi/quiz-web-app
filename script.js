
const quizQuestions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language"
        ],
        correctAnswer: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        options: [
            "text-color",
            "font-color",
            "color",
            "text-style"
        ],
        correctAnswer: 2
    },
    {
        question: "What is the correct syntax for referring to an external JavaScript file?",
        options: [
            "&lt;script href='app.js'&gt;",
            "&lt;script name='app.js'&gt;",
            "&lt;script src='app.js'&gt;",
            "&lt;script file='app.js'&gt;"
        ],
        correctAnswer: 2
    },
    {
        question: "Which company developed JavaScript?",
        options: [
            "Microsoft",
            "Netscape",
            "Google",
            "Mozilla"
        ],
        correctAnswer: 1
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Colorful Style Sheets"
        ],
        correctAnswer: 1
    }
];


let currentQuestionIndex = 0;
let userAnswers = [];
let score = 0;


function startQuiz() {
    document.getElementById('startScreen').classList.add('hidden');
    document.getElementById('quizScreen').classList.remove('hidden');
    currentQuestionIndex = 0;
    userAnswers = new Array(quizQuestions.length).fill(null);
    score = 0;
    displayQuestion();
}


function displayQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    const questionText = document.getElementById('questionText');
    const optionsContainer = document.getElementById('optionsContainer');
    const currentQuestionNum = document.getElementById('currentQuestionNum');
    const totalQuestions = document.getElementById('totalQuestions');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    
    
    currentQuestionNum.textContent = currentQuestionIndex + 1;
    totalQuestions.textContent = quizQuestions.length;
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBar.style.width = progress + '%';
    progressPercent.textContent = Math.round(progress);
    
    
    questionText.textContent = question.question;
    
    
    optionsContainer.innerHTML = '';
    
    
    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option-hover';
        
        const isSelected = userAnswers[currentQuestionIndex] === index;
        
        optionDiv.innerHTML = `
            <button 
                onclick="selectAnswer(${index})" 
                class="w-full text-left p-4 rounded-lg border-2 transition-all duration-300 ${
                    isSelected 
                        ? 'border-indigo-600 bg-indigo-50 font-semibold' 
                        : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
                }"
                id="option-${index}"
            >
                <span class="inline-flex items-center">
                    <span class="w-8 h-8 rounded-full ${
                        isSelected 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-gray-200 text-gray-600'
                    } flex items-center justify-center mr-3 font-semibold">
                        ${String.fromCharCode(65 + index)}
                    </span>
                    <span class="${isSelected ? 'text-indigo-900' : 'text-gray-800'}">${option}</span>
                </span>
            </button>
        `;
        
        optionsContainer.appendChild(optionDiv);
    });
    
    
    updateNavigationButtons();
}


function selectAnswer(optionIndex) {
    userAnswers[currentQuestionIndex] = optionIndex;
    displayQuestion();
}


function updateNavigationButtons() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    
 
    prevBtn.disabled = currentQuestionIndex === 0;
    
    
    if (currentQuestionIndex === quizQuestions.length - 1) {
        nextBtn.classList.add('hidden');
        submitBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.remove('hidden');
        submitBtn.classList.add('hidden');
    }
}


function nextQuestion() {
    if (currentQuestionIndex < quizQuestions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    }
}


function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}


function calculateScore() {
    score = 0;
    quizQuestions.forEach((question, index) => {
        if (userAnswers[index] === question.correctAnswer) {
            score++;
        }
    });
    return score;
}


function submitQuiz() {
    
    const unansweredQuestions = userAnswers.filter(answer => answer === null).length;
    
    if (unansweredQuestions > 0) {
        const confirmSubmit = confirm(`You have ${unansweredQuestions} unanswered question(s). Do you want to submit anyway?`);
        if (!confirmSubmit) {
            return;
        }
    }
    
    calculateScore();
    displayResults();
}


function displayResults() {
    document.getElementById('quizScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    
    const finalScore = document.getElementById('finalScore');
    const scorePercentage = document.getElementById('scorePercentage');
    const resultMessage = document.getElementById('resultMessage');
    const resultIcon = document.getElementById('resultIcon');
    
    const percentage = (score / quizQuestions.length) * 100;
    
    finalScore.textContent = `${score}/${quizQuestions.length}`;
    scorePercentage.textContent = `${Math.round(percentage)}%`;
    
    
    let message = '';
    let icon = '';
    
    if (percentage === 100) {
        message = "Perfect score! You're a quiz master! 🎉";
        icon = '<svg class="w-32 h-32 mx-auto text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>';
    } else if (percentage >= 80) {
        message = "Excellent work! You really know your stuff! 🌟";
        icon = '<svg class="w-32 h-32 mx-auto text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>';
    } else if (percentage >= 60) {
        message = "Good job! Keep practicing to improve! 👍";
        icon = '<svg class="w-32 h-32 mx-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>';
    } else if (percentage >= 40) {
        message = "Not bad! There's room for improvement. 📚";
        icon = '<svg class="w-32 h-32 mx-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>';
    } else {
        message = "Keep learning! Practice makes perfect! 💪";
        icon = '<svg class="w-32 h-32 mx-auto text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path></svg>';
    }
    
    resultIcon.innerHTML = icon;
    resultMessage.textContent = message;
}


function restartQuiz() {
    document.getElementById('resultScreen').classList.add('hidden');
    document.getElementById('startScreen').classList.remove('hidden');
}
