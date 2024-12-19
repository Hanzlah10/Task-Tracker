import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-landing-page-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page-todo.component.html',
  styleUrl: './landing-page-todo.component.css'
})
export class LandingPageTodoComponent {

  isFromVisible: boolean = false;
  constructor(private fb: FormBuilder) { }

  formStatus: string = 'Add New';

  todoForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  onSubmit() {
    console.log(this.todoForm.value);
  }

  onEdit() {
    this.formStatus = 'Edit';
  }

  openModal(formStatus: string) {
    this.formStatus = formStatus;
    this.isFromVisible = true;
  }
  closeModal() {
    this.isFromVisible = false;
  }

}
