import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardreportComponent } from './cardreport.component';

describe('CardreportComponent', () => {
  let component: CardreportComponent;
  let fixture: ComponentFixture<CardreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardreportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
