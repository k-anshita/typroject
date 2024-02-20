import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RPSComponent } from './rps.component';

describe('RPSComponent', () => {
  let component: RPSComponent;
  let fixture: ComponentFixture<RPSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RPSComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RPSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
