import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostbuttonComponent } from './postbutton.component';

describe('PostbuttonComponent', () => {
  let component: PostbuttonComponent;
  let fixture: ComponentFixture<PostbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
