import { CommonModule } from '@angular/common';
import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions';
import { taskActions } from '../../store/actions';
import { combineLatest, map } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { selectSelectedTask, selectTasks } from '../../store/reducer';

@Component({
  selector: 'app-landing-page-todo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './landing-page-todo.component.html',
  styleUrl: './landing-page-todo.component.css'
})
export class LandingPageTodoComponent implements OnChanges {

  formStatus: string = 'Add New';
  isFormVisible: boolean = false;

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

  ngOnChanges(): void {

  }

  onSubmit(formStatus: string) {
    if (formStatus === 'Add New') {
      this.store.dispatch(taskActions.addTask(this.taskForm.getRawValue()));
    }
    if (formStatus === 'Edit') {
      this.data$
        .pipe(map(data => data.selectedTask?.id))
        .subscribe(id => {
          if (id) {
            this.store.dispatch(
              taskActions.updateTask({
                id: id,
                task: this.taskForm.getRawValue()
              })
            );
          }
        });
    }
    this.closeModal();
  }

  deleteTask(id: number) {
    console.log(id);
    this.store.dispatch(taskActions.deleteTask({ id }));
  }
  onEdit() {
    this.formStatus = 'Edit';
  }

  openModal(formStatus: string) {
    this.taskForm.reset({ title: '', description: '', status: 'pending' });
    this.formStatus = formStatus;
    this.isFormVisible = true;
  }

  closeModal() {
    this.taskForm.reset();
    this.isFormVisible = false;
  }

}


