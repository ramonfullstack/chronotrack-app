import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputReadOnlyComponent } from './input-read-only.component';

describe('InputReadOnlyComponent', () => {
  let component: InputReadOnlyComponent;
  let fixture: ComponentFixture<InputReadOnlyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputReadOnlyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputReadOnlyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
