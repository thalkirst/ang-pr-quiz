import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Quiz } from '../model/quiz';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  dataUrl: string = `http://localhost:3000/quizzes`;
  list$: BehaviorSubject<Quiz[]> = new BehaviorSubject<Quiz[]>([]);

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Quiz[]>(this.dataUrl).subscribe(
      quizzes => this.list$.next(quizzes)
    );
  }

  get(id: number): Observable<Quiz> {
    return Number(id) === 0 ? of(new Quiz()) : this.http.get<Quiz>(`${this.dataUrl}/${Number(id)}`);
  }

  update(quiz: Quiz): Observable<Quiz> {
    return this.http.patch<Quiz>(
      `${this.dataUrl}/${quiz.id}`,
      quiz
    ).pipe(
      tap(() => {
        this.getAll();
      })
    );
  }

  create(quiz: Quiz): void {
    this.http.post<Quiz>(
      `${this.dataUrl}`,
      quiz
    ).subscribe(
      () => this.getAll()
    );

  }

  remove(quiz: Quiz): void {
    this.http.delete<Quiz>(
      `${this.dataUrl}/${quiz.id}`
    ).subscribe(
      () => this.getAll()
    );
    this.toastr.error(`Quiz #${quiz.id}</br>${quiz.title}</br>has been deleted.`, 'DELETED');
  }
  
}

