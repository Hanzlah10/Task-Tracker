import { Component } from '@angular/core';
import { PersistenceService } from '../../services/persistence.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private persistence: PersistenceService, private store: Store) { }

  data$ = combineLatest({
    user: this.store.select(selectCurrentUser),
  })


  ngOnInit(): void {
    if (this.persistence.get('theme') === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

  }

  toggleDarkMode(): void {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
      this.persistence.set('theme', 'dark');
    } else {
      this.persistence.set('theme', 'light');
    }
  }

  logout() {
    this.store.dispatch(AuthActions.logout())
  }

}
