import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class NavigationHistoryService {
  private history: string[] = [];

  constructor(private router: Router, private location: Location) {
    this.router.events.subscribe((event) => {
      if (
        event instanceof NavigationEnd &&
        this.history[0] !== event.urlAfterRedirects
      ) {
        this.history.push(event.urlAfterRedirects);
      }
    });
  }

  back(): void {
    this.history.pop();
    if (this.history.length > 0) {
      this.location.back();
    } else {
      this.router.navigateByUrl('/');
    }
  }

  getPreviousUrl(): string {
    if (this.history.length > 0) {
      return this.history[this.history.length - 2];
    }
    return '';
  }

  getHistory = (): string[] => this.history;
}
