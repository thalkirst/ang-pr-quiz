import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizeditorComponent } from './quizeditor.component';

describe('QuizeditorComponent', () => {
  let component: QuizeditorComponent;
  let fixture: ComponentFixture<QuizeditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizeditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizeditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
