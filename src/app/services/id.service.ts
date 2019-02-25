import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {

  constructor() { }

  generate() {
    return (Date.now() + Math.random()).toString()
  }
}
