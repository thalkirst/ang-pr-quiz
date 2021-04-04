import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';
import { Quiz } from 'src/app/model/quiz';
import { QuizService } from 'src/app/service/quiz.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  studentList$: BehaviorSubject<Student[]> = this.studentService.list$;
  quizList$: BehaviorSubject<Quiz[]> = this.quizService.list$;

  studentSelected: boolean = false;
  studentID: number = 0;
  studentName: string = '';

  constructor(
    private studentService: StudentService,
    private quizService: QuizService
  ) { }

  ngOnInit(): void {
    this.studentService.getAll();
    this.quizService.getAll();
  }

  onChangeStudent(event: Event): void {
    this.studentID = Number((event.target as HTMLInputElement).value);
    let selectorItem = document.querySelector('.selector');
    selectorItem?.classList.add('hidden');
    this.studentSelected = true;
  }

}
