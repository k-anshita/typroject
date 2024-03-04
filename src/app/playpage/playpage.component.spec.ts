import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaypageComponent } from './playpage.component';

describe('PlaypageComponent', () => {
  let component: PlaypageComponent;
  let fixture: ComponentFixture<PlaypageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaypageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
