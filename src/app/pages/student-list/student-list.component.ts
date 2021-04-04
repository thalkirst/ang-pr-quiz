import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Student } from 'src/app/model/student';
import { StudentService } from 'src/app/service/student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  studentList$: BehaviorSubject<Student[]> = this.studentService.list$;

  constructor(
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    this.studentService.getAll();
  }

  onDelete(student: Student): void {
    if (confirm(`Are you sure you want to delete ${student.name}?`)) {
      this.studentService.remove(student);
    }
  }

  sorterKey: string = '';

  onColumnSelect(key: string): void {
    this.sorterKey = key;
  }

}
