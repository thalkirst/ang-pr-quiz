import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { Quiz } from 'src/app/model/quiz';
import { QuestionService } from 'src/app/service/question.service';
import { QuizService } from 'src/app/service/quiz.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quizeditor',
  templateUrl: './quizeditor.component.html',
  styleUrls: ['./quizeditor.component.scss']
})
export class QuizeditorComponent implements OnInit {

  quiz$: Observable<Quiz> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Quiz());
      }

      return this.quizService.get(Number(params.id));
    })
  );

  questionList$: BehaviorSubject<Question[]> = this.questionService.list$;

  constructor(
    private quizService: QuizService,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.questionService.getAll();
  }

  newQuestion(quiz: Quiz): void {
    this.quizService.update(quiz).subscribe(
      quiz => this.router.navigate([`admin/quiz/${quiz.id}/question/0`])
    );
  }

  editQuestion(quiz: Quiz, question: Question): void {
    this.quizService.update(quiz).subscribe(
      quiz => this.router.navigate([`admin/quiz/${quiz.id}/question/${question.id}`])
    );
  }

  onUpdate(quiz: Quiz): void {
    if (quiz.id === 0) {
      this.quizService.create(quiz);
      this.router.navigate(['admin'])
    } else {
      this.quizService.update(quiz).subscribe(
        quiz => this.router.navigate(['admin'])
      );
    }
  }


  onRemoveQuestion(question: Question, quiz: Quiz): void {
    if (confirm(`Are you sure you want to unlink question#${question.id}?
It will be unassigned from the quiz and deactivated.`)) {
      const index = quiz.questions.indexOf(question.id);
      quiz.questions.splice(index, 1);
      question.active = false; 
      this.questionService.update(question).subscribe(
        question => question
      );
      this.toastr.warning(`Question #${question.id} has been unassigned from the quiz.`, 'UNASSIGNED');
    }
  }

  onAddQuestion(quiz: Quiz, question: Question): void {
    if (confirm(`Are you sure you want to add Question#${question.id} to '${quiz.title}'?`)) {     
      quiz.questions.push(question.id);
      question.active = true; 
      this.questionService.update(question).subscribe(
        question => question
      );
      this.toastr.success(`Question #${question.id} has been assigned to '${quiz.title}'.`, 'ASSIGNED');
    }
  }

  onDeleteQuestion(question: Question): void {
    if (confirm(`Are you sure you want to delete question#${question.id}?
This operation cannot be undone!.`)) {
      this.questionService.remove(question);
      this.toastr.error(`Question #${question.id} has been permanently deleted.`, 'DELETE');
    }
  }


}
