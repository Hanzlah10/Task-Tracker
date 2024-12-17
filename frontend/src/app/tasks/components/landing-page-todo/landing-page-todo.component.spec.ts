import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageTodoComponent } from './landing-page-todo.component';

describe('LandingPageTodoComponent', () => {
  let component: LandingPageTodoComponent;
  let fixture: ComponentFixture<LandingPageTodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageTodoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
