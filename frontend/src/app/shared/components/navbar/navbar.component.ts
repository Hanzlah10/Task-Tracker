import { Component } from '@angular/core';
import { PersistenceService } from '../../services/persistence.service';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/store/actions';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(private persistence: PersistenceService, private store: Store) { }

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
