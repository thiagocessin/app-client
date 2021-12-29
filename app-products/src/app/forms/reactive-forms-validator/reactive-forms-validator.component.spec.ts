import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReactiveFormsValidatorComponent } from './reactive-forms-validator.component';

describe('ReactiveFormsValidatorComponent', () => {
  let component: ReactiveFormsValidatorComponent;
  let fixture: ComponentFixture<ReactiveFormsValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReactiveFormsValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReactiveFormsValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
