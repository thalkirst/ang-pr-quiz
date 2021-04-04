import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-studenteditor',
  templateUrl: './studenteditor.component.html',
  styleUrls: ['./studenteditor.component.scss']
})
export class StudenteditorComponent implements OnInit {

  student$: Observable<Student> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new Student());
      }
      return this.studentService.get(Number(params.id));
    })
  );

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onUpdate(student: Student): void {
    if (student.id === 0) {
      this.studentService.create(student);
      this.router.navigate([`students`])
    } else {
      this.studentService.update(student).subscribe(
        question => this.router.navigate([`students`])
      );
    }
  }

  emailpattern = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

}
