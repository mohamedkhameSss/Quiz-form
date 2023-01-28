/// <reference path="../typings/globals/jquery/index.d.ts" />
export class Quiz {
    constructor(response) {
        this.response = response;
        this.numOfQues = response.length;
        this.currentQuest = 0;
        this.nextBtn = document.getElementById('next');
        this.nextBtn.addEventListener('click', this.nextQuest.bind(this));
        this.answerElement = document.getElementsByName('answer');
        this.score = 0;
        console.log(this.numOfQues);
        this.showQuestion();
    }
    showQuestion() {
        document.getElementById('question').innerHTML = this.response[this.currentQuest].question;
        document.getElementById('currentQuestion').innerHTML = this.currentQuest + 1;
        document.getElementById('totalNumberOfQuestions').innerHTML = this.numOfQues;

        let answers = [this.response[this.currentQuest].correct_answer, ...this.response[this.currentQuest].incorrect_answers];
        console.log(answers);

        function shuffle(answers) {
            let currentIndex = answers.length;
            while (currentIndex != 0) {
                let randomIndex = Math.floor(Math.random() * answers.length);
                currentIndex -= 1;
                let temp = answers[currentIndex];
                answers[currentIndex] = answers[randomIndex];
                answers[randomIndex] = temp;
            }
            return answers;
        }
        let answersArr = shuffle(answers);
        console.log(answersArr);

        let temp = ``;
        for (let i = 0; i < answersArr.length; i++) {
            temp += `
                <div class="form-check">
                <label class="form-check-label">
                    <input type="radio" class="form-check-input" name="answer" value="${answersArr[i]}" >
                   ${answersArr[i]}
                </label>
               </div>
                `;
        }
        document.getElementById('rowAnswer').innerHTML = temp;

    }
    nextQuest() {
        let userAnswer = [...this.answerElement].filter(el => el.checked);
        if (userAnswer.length === 1) {
            $('#alert').fadeOut(200);
            this.checkAnswer();
            this.currentQuest++;
            if (this.currentQuest === this.numOfQues) {
                $('#quiz').fadeOut(200, function () {
                    $('#finish').fadeIn(200);
                })
                document.getElementById('score').innerHTML = this.score;
                document.getElementById('tryBtn').addEventListener('click', function () {
                    $('#finish').fadeOut(200, function () {
                        $('#setting').fadeIn(200);
                    })
                })
            }
            else {
                console.log(this.currentQuest);
                this.showQuestion();
            }
        }
        else
        {
            $('#alert').fadeIn(200);
        }


    }
    checkAnswer() {
        let userAnswer = [...this.answerElement].filter(el => el.checked)[0].value;
        let correct_answer = this.response[this.currentQuest].correct_answer;
        if (userAnswer === correct_answer) {
            this.score++;
            $('#Correct').fadeIn(200, function () {
                $('#Correct').fadeOut(200);
            })
        }
        else {
            $('#inCorrect').fadeIn(200, function () {
                $('#inCorrect').fadeOut(200);
            })
        }
        console.log([...this.answerElement].filter(el => el.checked)[0].value);
    }

}