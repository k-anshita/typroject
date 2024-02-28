import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillthebirdsComponent } from './killthebirds.component';

describe('KillthebirdsComponent', () => {
  let component: KillthebirdsComponent;
  let fixture: ComponentFixture<KillthebirdsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KillthebirdsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KillthebirdsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
