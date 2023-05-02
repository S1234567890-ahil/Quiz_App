const quizSelector = document.getElementById("quiz-selector");
const quizContainer = document.getElementById("quiz-container");
const resultsContainer = document.getElementById("results-container");
const questionContainer = document.getElementById("question");
const answerButtonsContainer = document.getElementById("answer-buttons-container");

class Quiz {
    constructor(questions) { //data ly kay aahta hai jo kay inilization kay time kaam aahta hai 
    this.questions =Quiz.shuffleArray(questions);
    this.currentQuestionIndex= 0; // current question jo aahai wo 0 hona chayiee
    this.score = 0;

}
    displayQuestion () { // method hai yeh
        answerButtonsContainer.innerHTML = "";
   const currentQuestion = this.questions[this.currentQuestionIndex];
   questionContainer.textContent = currentQuestion.question;
   const answers = Quiz.shuffleArray(currentQuestion.answers);
   answers.forEach(answer => {
       const button = document.createElement("button");
       button.classList = ["answer-button"];
       button.textContent = answer;
       button.addEventListener("click" , this.chechAnswer.bind(this)); // this.checkanswer ek or alag method ho kah us ko call kar dy kah
       answerButtonsContainer.appendChild(button);
   })
    }
    chechAnswer(event) { // event by default milta hai or yeh kisi kah text show kar wahta hai khud he parameter kah event call karta hai
        const selectedAnswer = event.target.textContent; // target.value input filed par required hai
        const currentQuestion = this.questions[this.currentQuestionIndex]; // kisi be function ko ap addeventlistner mai rakhty hoo toh uske boundry or scope change ho jahta hai ab kisi be function ke boundry change hoti hai toh us kay this kah koi pta nahi hota
        if(selectedAnswer === currentQuestion.correctAnswer) {
            this.score++;
        }
        this.currentQuestionIndex++;

        if(this.currentQuestionIndex < this.questions.length) {
            this.displayQuestion();
        }else{
            this.showResult();
        }
    }

    showResult () {
        quizContainer.style.display = "none";
        resultsContainer.style.display = "block";
        resultsContainer.innerHTML = `
        <h2>Quiz Result </h2>
        <p> You scored ${this.score} out of ${this.questions.length} questions</p>
        <button id="reload-quiz">Reload All quiz </button>
    `;

    document.getElementById("reload-quiz").addEventListener("click", ()=> {
        quizContainer.style.display = "none";
        resultsContainer.style.display= "none";
        quizSelector.style.display = "flex";

    })
    }


    static shuffleArray(arr) {  // yeh shuffle har dafa question of change kary kah 
        return [...arr].sort(() => Math.random() -0.5);   
    }
}





const loadQuiz =  (questions) => {
    const quiz = new Quiz (questions);
    quiz.displayQuestion();
    quizContainer.style.display="block"; // jo cheez css mai hum ny none ke hwi hai us ko show karny kay lehaii 
    quizSelector.style.display="none"; // jo cheez show ho rhe hai us ko hide karny kay lehai
   } 

const loadAllQuiz = async () => {
    const response = await fetch("./quizzes.json");
    const quizzes = await response.json();
// console.log(quizzes)
// jb be app foreach chalty hoo toh phly waly mai ap ko ek ek kar kay wo element ap ko dy rha hota hai or dusry wlay mai apko us kah current index bata rha hota hai hai
    quizzes.forEach ((quiz,index) => { 
     const quizCard = document.createElement("div"); // apply css 
     quizCard.classList=["quiz-card"];  // (humary class hain kise  be element kay andr us ko add kar rha hai)ek he array kay oper ap multiple classes rakh sakhty hoo
     quizCard.innerText = "Quiz " + (index + 1); // innertext mai quiz rakha or index mai 0123 aarha hota hai or mujia show karna hai quiz 1 quiz2 toh index + 1 use kiya jis mai akr 0 ho kah to 1 ho jahai kah 1 ho kah toh 2 ho jahai kah
     quizCard.addEventListener("click", () => loadQuiz(quiz)); // function banya addEventListner kah jis mai ny ek loadQuiz kah function call ho rha hai or yeh button jb koi quizz start ho kah tb yeh call kar wahai kah
     quizSelector.appendChild(quizCard); // appendChild kar wah kar us ko dom kay andr rakh wah dy kay

  })
}
loadAllQuiz();









