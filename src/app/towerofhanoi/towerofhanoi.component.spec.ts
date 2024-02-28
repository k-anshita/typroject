import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TowerofhanoiComponent } from './towerofhanoi.component';

describe('TowerofhanoiComponent', () => {
  let component: TowerofhanoiComponent;
  let fixture: ComponentFixture<TowerofhanoiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TowerofhanoiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TowerofhanoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
