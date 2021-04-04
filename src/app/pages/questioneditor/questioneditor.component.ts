import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Question } from 'src/app/model/question';
import { QuestionService } from 'src/app/service/question.service';

@Component({
  selector: 'app-questioneditor',
  templateUrl: './questioneditor.component.html',
  styleUrls: ['./questioneditor.component.scss']
})
export class QuestioneditorComponent implements OnInit {

  quizID: number = 0;

  question$: Observable<Question> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Question());
      }
      return this.questionService.get(Number(params.id));
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.quizID = Number(this.activatedRoute.snapshot.url[2]);
  }

  onUpdate(question: Question): void {
    if (question.id === 0) {
      this.questionService.create(question);
      this.router.navigate([`admin/quiz/${this.quizID}`])
    } else {
      this.questionService.update(question).subscribe(
        question => this.router.navigate([`admin/quiz/${this.quizID}`])
      );
    }
  }

}
