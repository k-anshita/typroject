import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectfourComponent } from './connectfour.component';

describe('ConnectfourComponent', () => {
  let component: ConnectfourComponent;
  let fixture: ComponentFixture<ConnectfourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectfourComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectfourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
