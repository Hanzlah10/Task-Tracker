import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { PersistenceService } from '../shared/services/persistence.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private persistenceService: PersistenceService) { }

  canActivate(): boolean {
    const token = this.persistenceService.get('token');
    if (token) {
      return true; // Allow access
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
