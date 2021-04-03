import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  quizList$: BehaviorSubject<Quiz[]> = this.quizService.list$;

  constructor(
    private quizService: QuizService,
  ) { }

  ngOnInit(): void {
    this.quizService.getAll();
  }

  onDelete(quiz: Quiz): void {
    if (confirm(`Are you sure you want to delete ${quiz.title}?`)) {
      this.quizService.remove(quiz);
    }
  }

  phrase: string = '';

  onChangePhrase(event: Event): void {
    this.phrase = (event.target as HTMLInputElement).value;
  }

  sorterKey: string = '';

  filterKey: string = 'title';

  onColumnSelect(key: string): void {
    this.sorterKey = key;
  }


}