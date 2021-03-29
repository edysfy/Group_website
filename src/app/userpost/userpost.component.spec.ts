import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserpostComponent } from './userpost.component';

describe('UserpostComponent', () => {
  let component: UserpostComponent;
  let fixture: ComponentFixture<UserpostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserpostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
