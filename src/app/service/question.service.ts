import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  dataUrl: string = `http://localhost:3000/questions`;
  list$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Question[]>(this.dataUrl).subscribe(
      questions => this.list$.next(questions)
    );
  }

  get(id: number): Observable<Question> {
    return Number(id) === 0 ? of(new Question()) : this.http.get<Question>(`${this.dataUrl}/${Number(id)}`);
  }

  update(question: Question): Observable<Question> {
    return this.http.patch<Question>(
      `${this.dataUrl}/${question.id}`,
      question
    ).pipe(
      tap(() => {
        this.getAll();
      })
    );

  }

  create(question: Question): void {
    this.http.post<Question>(
      `${this.dataUrl}`,
      question
    ).subscribe(
      () => this.getAll()
    );

  }

  remove(question: Question): void {
    this.http.delete<Question>(
      `${this.dataUrl}/${question.id}`
    ).subscribe(
      () => this.getAll()
    );
  }
  
}
