import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  dataUrl: string = `http://localhost:3000/students`;
  list$: BehaviorSubject<Student[]> = new BehaviorSubject<Student[]>([]);

  constructor(private http: HttpClient) { }

  getAll(): void {
    this.list$.next([]);
    this.http.get<Student[]>(this.dataUrl).subscribe(
      students => this.list$.next(students)
    );
  }

  get(id: number): Observable<Student> {
    return Number(id) === 0 ? of(new Student()) : this.http.get<Student>(`${this.dataUrl}/${Number(id)}`);
  }

  update(student: Student): Observable<Student> {
    return this.http.patch<Student>(
      `${this.dataUrl}/${student.id}`,
      student
    ).pipe(
      tap(() => {
        this.getAll();
      })
    );
  }

  create(student: Student): void {
    this.http.post<Student>(
      `${this.dataUrl}`,
      student
    ).subscribe(
      () => this.getAll()
    );

  }

  remove(student: Student): void {
    this.http.delete<Student>(
      `${this.dataUrl}/${student.id}`
    ).subscribe(
      () => this.getAll()
    );
  }
  
}
