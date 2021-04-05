import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { Student } from 'src/app/model/student';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  quiz: Quiz = new Quiz();
  allArrived: boolean = false;
  completed: boolean = false;

  studentID: number = 0;
  student: Student = new Student();

  points: number = 0;
  totalPoints: number = 0;

  questions: Array<Number> = [];
  questionArray: Array<Question> = [];
  currentQuestion: number = 0;


  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }
      return this.quizService.get(Number(params.id));
    })
  );

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData(): void {
    this.quiz$.subscribe(item => {
      this.quiz = item;
      this.questions = this.quiz.questions;
      this.getQuestions(this.questions);
    });
    this.activatedRoute.queryParams.subscribe(params => {
      this.studentID = Number(params.studentID)
    });
  }

  getQuestions(questions: Array<Number>): void {
    for (let i = 0; i < questions.length; i++) {
      let question = this.questionService.get(Number(questions[i]));
      question.subscribe(item => {
        this.questionArray.push(item);
        this.totalPoints = this.totalPoints + item.points;
        this.allArrived = true;
      })
    }
  }

  nextQuestion(): void {
    this.checkIfCorrect();
    if (this.currentQuestion === this.questionArray.length - 1) {
      this.completed = true;
    }
    else this.currentQuestion++;
  }

  addPoints(): void {
    this.studentService.get(this.studentID).subscribe(
      item => {
        this.student = item;
        this.student.points = this.student.points + this.points;
        this.studentService.update(this.student).subscribe(student => {
          this.router.navigate([''])
          this.toastr.success(`Your point total has been updated.`, 'COMPLETED');
        }
        );
      }
    );

  }

  checkIfCorrect(): void {
    let answer: number = Number(document.querySelector('input[name=actualQuestion]:checked')?.id);
    if (this.questionArray[this.currentQuestion].answers[answer].correct) {
      this.points = this.points + this.questionArray[this.currentQuestion].points;
    }
  }
}
