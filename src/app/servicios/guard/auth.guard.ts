import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

Injectable({
  providedIn: 'root'
})

export const authGuard: CanActivateFn = (route, state) => {
  const router = new Router;
  if (localStorage.getItem('token')) {
    return true;
  } else {
    router.navigate(['/'])
    return false
  }
};
