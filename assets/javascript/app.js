
// Give function to click action on chosen answer. 
// This code will run as soon as the page loads.
// window.onload = function() {
//     $("#start").on("click", function(quiz) {
//         $('#quizBox').prepend('<h2>Time Remaining: <span id="timeCount">30</span> Seconds</h2>');
//         quiz.loadQuiz;
//     });
//     $(".answer-button").on("click", quiz.chooseAnswer);
//     $("#start-over").on("click", quiz.restart);
// };

$(document).on('click', '#start-over', function(q) {
    quiz.restart();
});
      
$(document).on('click', '.answer-button', function(q) {
    quiz.chooseAnswer(q);
});
      
$(document).on('click', '#start', function(q) {
    $('#quizBox').prepend('<h2>Time Remaining: <span id="timeCount">30</span> Seconds</h2>');
    quiz.loadQuiz();
});    


//Quiz set:

var questions = [{
    question: "Who was the first man to fly around the earth with a spaceship?",
    answers: ["Neil Alden Armstrong ", "Valentina Vladimirovna Tereshkova", "Yuri Alekseyevich Gagarin", "John Herschel Glenn"],
    correctAnswer: "Yuri Alekseyevich Gagarin",
    image:"assets/images/gagarin.jpg"
}, {
    question: "On which hemisphere were the most dinosaur skeletons found?",
    answers: ["The northern hemisphere", "The southern hemisphere"],
    correctAnswer: "The northern hemisphere",
    image:"assets/images/dinosaur-skeletons.jpg"
}, {
    question: "What color is cobalt?",
    answers: ["Green", "Blue", "Purple", "Brown"],
    correctAnswer: "Blue",
    image:"assets/images/blue.jpeg"
}, {
    question: "Who invented vulcanized rubber?",
    answers: ["Frank Seiberling", "Charles Goodyear", "Thomas Hancock", "William Henry Goodyear"],
    correctAnswer: "Charles Goodyear",
    image:"assets/images/Charles-Goodyear.png"
}, {
    question: "What is the organ that is affected when one is suffering from hepatitis?",
    answers: ["Heart", "Stomach", "Kidneys", "Liver"],
    correctAnswer: "Liver",
    image:"assets/images/liver.jpeg"
}, {
    question: "Which device do we use to look at the stars?",
    answers: ["Telescope", "Mirror", "Binoculars", "Microscope"],
    correctAnswer: "Telescope",
    image:"assets/images/Telescope.jpg"
}, {
    question: "Which planet is nearest the sun?",
    answers: ["Earth", "Mercury", "Venus", "Mars"],
    correctAnswer: "Mercury",
    image:"assets/images/Mercuryorbitsolarsystem.gif"
}, {
    question: "Who is the father of the atomic bomb?",
    answers: ["Robert Oppenheimer", "Werner Heisenberg", "Edward Teller", "Albert Einstein"],
    correctAnswer: "Robert Oppenheimer",
    image:"assets/images/Robert-Oppenheimer.jpg"
}, {
    question: "Who was the inventor of the steam engine?",
    answers: ["Matthew Boulton", "James Watt", "Adam Smith", "Thomas Savery"],
    correctAnswer: "James Watt",
    image:"assets/images/Watt_James_von_Breda.jpg"
}, {
    question: "Who discoved one of the first antibiotics: penicillin?",
    answers: ["Louis Pasteur", "Howard Florey", "Selman Waksman", "Alexander Fleming"],
    correctAnswer: "Alexander Fleming",
    image:"assets/images/Alexander-Fleming.jpg"
}];

// Display variable
var quizArea = $('#quiz-area');
var timeRemaining= 30; // set 30 seconds for each time show question and answer.

var quiz = {

    questions: questions, 
    currentQuestion: 0,
    countDown: timeRemaining, // set count down time remaining to answer each question
    correct: 0,
    incorrect: 0,

    countDownTime: function() {
        quiz.countDown--; // start to count down
        $('#timeCount').html(quiz.countDown); // show count down time on timeCount area
        if (quiz.countDown === 0){  // until count down to 0 second.
        console.log("TIME UP!");
        quiz.timeUp();
        }
    },
    
    loadQuiz: function() {
        timer = setInterval(quiz.countDownTime, 1000); // set each count down equal 1 second, it means we have 30 count down number for 30 seconds of time remaining.
        quizArea.html('<h2>' + questions[quiz.currentQuestion].question + '</h2>' ); // show question on quiz area in html.
        console.log(questions[quiz.currentQuestion].question);
        for (var i = 0; i < questions[quiz.currentQuestion].answers.length; i++) {
            console.log(questions[quiz.currentQuestion].answers[i]);
            // add all answers in quiz area in html as buttons.
            quizArea.append('<button class="answer-button" id="button"' + 'data-name="' + questions[quiz.currentQuestion].answers[i] + '">' + questions[quiz.currentQuestion].answers[i]+ '</button>');
        }
        console.log("Correct answer: " + questions[quiz.currentQuestion].correctAnswer);
    },

    timeUp: function() {  
        clearInterval(timer); // if the player can not choose answer for the quiz question, and count down time now is 0 second.
        $('#timeCount').html(quiz.countDown); // show count down time on timeCount area.
        quizArea.html('<h2>Out of Time!</h2>');
        quizArea.append('<h3>The Correct Answer is: ' + questions[quiz.currentQuestion].correctAnswer); // show the correct answer.
        quizArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />'); // show pic of the right option.
        if (quiz.currentQuestion === questions.length - 1) {
        setTimeout(quiz.results, 2000); // show result in 2 seconds.
        } else {
        setTimeout(quiz.nextQuestion, 2000); // After 2 seconds, display the next question
        }
    },

    nextQuestion: function() {
        quiz.countDown = timeRemaining; // set count down time remaining back to 30 seconds again.
        $('#timeCount').html(quiz.countDown);
        quiz.currentQuestion++;
        quiz.loadQuiz();
    },
  
    results: function() {
        clearInterval(timer);
        quizArea.html('<h2>All Done!</h2>');
        $('#timeCount').html(quiz.countDown);
        quizArea.append('<h3>Correct Answers: ' + quiz.correct + '</h3>'); // count how many correct choses.
        quizArea.append('<h3>Incorrect Answers: ' + quiz.incorrect + '</h3>'); // count how many incorrect choses.
        quizArea.append('<h3>Unanswered: ' + (questions.length - (quiz.incorrect + quiz.correct)) + '</h3>'); // count how many question misses answer.
        quizArea.append('<br><button id="start-over">Start Over?</button>');
    },

    chooseAnswer: function(q) {
        clearInterval(timer);
        if ($(q.target).data("name") === questions[quiz.currentQuestion].correctAnswer) {
        quiz.answeredCorrectly();
        } else {
        quiz.answeredIncorrectly();
        }
    },

    // If the player selects the correct answer:
    answeredCorrectly: function(){
        clearInterval(timer);
        quiz.correct++;
        quizArea.html('<h2>Correct!</h2>'); // show a screen let player know this is the right chose.
        quizArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />'); // show show pic of the right option.
        if (quiz.currentQuestion === questions.length - 1) {
        setTimeout(quiz.results, 2000); // show result in 2 seconds.
        } else {
        setTimeout(quiz.nextQuestion, 2000); // After 2 seconds, display the next question
        }
    },

    answeredIncorrectly: function() {
        quiz.incorrect++;
        clearInterval(timer);
        quizArea.html('<h2>Incorrect!</h2>'); // show a screen let player know this is the wrong chose.
        quizArea.append('<h3>The Correct Answer is: ' + questions[quiz.currentQuestion].correctAnswer + '</h3>'); // show the correct answer.
        quizArea.append('<img src="' + questions[quiz.currentQuestion].image + '" />'); // show pic of the right option.
        if (quiz.currentQuestion === questions.length - 1) {
        setTimeout(quiz.results, 2000); // show result in 2 seconds.
        } else {
        setTimeout(quiz.nextQuestion, 2000); // After 2 seconds, display the next question
        }
    },

    // restart game: set all count to 0, then load quiz again.
    restart: function(){ 
        quiz.currentQuestion = 0;
        quiz.countDown = timeRemaining;
        quiz.correct = 0;
        quiz.incorrect = 0;
        quiz.loadQuiz();
    }
};




