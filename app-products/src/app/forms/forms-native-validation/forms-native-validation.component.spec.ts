import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsNativeValidationComponent } from './forms-native-validation.component';

describe('FormsNativeValidationComponent', () => {
  let component: FormsNativeValidationComponent;
  let fixture: ComponentFixture<FormsNativeValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormsNativeValidationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsNativeValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
