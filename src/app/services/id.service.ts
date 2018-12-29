import { Injectable } from '@angular/core';

@Injectable()
export class IdService {

  constructor() { }

  generate() {
    return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxxxx'.replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
