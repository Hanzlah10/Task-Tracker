import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions';
import { taskActions } from '../../store/actions';
import { combineLatest, map, take } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { selectSelectedTask, selectTasks } from '../../store/reducer';
import { TaskInterface } from '../../types/task.interface';

@Component({
  selector: 'app-landing-page-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page-todo.component.html',
  styleUrl: './landing-page-todo.component.css'
})
export class LandingPageTodoComponent {

  formStatus: string = 'Add New';
  isFormVisible: boolean = false;
  editTask: TaskInterface | null = null;

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', Validators.required],
    status: ['pending', Validators.required]
  });

  data$ = combineLatest({
    user: this.store.select(selectCurrentUser),
    tasks: this.store.select(selectTasks),
    selectedTask: this.store.select(selectSelectedTask)
  })

  constructor(private fb: FormBuilder, private store: Store) {
    this.store.dispatch(AuthActions.getCurrentUser())
    this.store.dispatch(taskActions.getAllTasks())
  }


  onSubmit(formStatus: string) {
    if (formStatus === 'Add New') {
      this.store.dispatch(taskActions.addTask(this.taskForm.getRawValue()));
    }
    if (formStatus === 'Edit') {
      if (this.editTask) {
        this.store.dispatch(taskActions.updateTask({ id: this.editTask.id, task: this.taskForm.getRawValue() }));
      }
    }
    this.closeModal();
  }

  deleteTask(id: number) {
    console.log(id);
    this.store.dispatch(taskActions.deleteTask({ id }));
  }


  openModal(formStatus: string, id?: number) {
    this.formStatus = formStatus;
    if (formStatus === 'Add New') {
      this.taskForm.reset();
    }

    if (formStatus === 'Edit' && id) {
      this.store.dispatch(taskActions.getSingleTask({ id }));
      this.store.select(selectSelectedTask).pipe(take(1)).subscribe((task) => {
        if (task) {
          this.taskForm.patchValue(task);
          this.editTask = task;
        }
      });
    }
    this.isFormVisible = true;
  }


  closeModal() {
    this.taskForm.reset();
    this.isFormVisible = false;
  }

}


