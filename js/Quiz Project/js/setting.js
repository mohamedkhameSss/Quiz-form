/// <reference path="../typings/globals/jquery/index.d.ts" />
import { Quiz } from './quiz.js'
export class Setting{
    constructor()
    {
        this.categoryInput=document.getElementById('category');
        this.difficultyInput=document.getElementsByName('difficulty');
        this.numberOfQuestionsInput=document.getElementById('numberOfQuestions');
        this.startBtn=document.getElementById('startBtn');
        this.startBtn.addEventListener('click',this.startQuiz.bind(this))

        console.log(this.numberOfQuestions);
    }
    async startQuiz()
    {
        let category=this.categoryInput.value;
        let numberOfQues=this.numberOfQuestionsInput.value;
        let difficulty=Array.from(this.difficultyInput).filter(el => el.checked)[0].value;
        //[...this.difficultyInput].filter(el => el.checked)[0].value
        let Api=`https://opentdb.com/api.php?amount=${numberOfQues}&category=${category}&difficulty=${difficulty}`
        // console.log(difficulty);
       let response=await this.fetchApi(Api);
    //    console.log(response);
       if(response.length >0)
       {
        $('#setting').fadeOut(300,function(){
            $('#quiz').fadeIn(300);
        })
       }
       let quiz=new Quiz(response);
    }
    async fetchApi(Api)
    {
        let response=await fetch(Api);
        let result=await response.json();
        return result.results;
    }
}