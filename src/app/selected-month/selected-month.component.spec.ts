import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedMonthComponent } from './selected-month.component';

describe('SelectedMonthComponent', () => {
  let component: SelectedMonthComponent;
  let fixture: ComponentFixture<SelectedMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectedMonthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
