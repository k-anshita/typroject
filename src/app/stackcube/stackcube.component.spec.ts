import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StackcubeComponent } from './stackcube.component';

describe('StackcubeComponent', () => {
  let component: StackcubeComponent;
  let fixture: ComponentFixture<StackcubeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StackcubeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StackcubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
