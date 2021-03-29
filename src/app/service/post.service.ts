import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor() { }

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    location: new FormControl(''),
    rating: new FormControl(''),
    keyword: new FormControl(''),
    post: new FormControl(''),
  })

  getDataSource(): string {
    return 'http://localhost:3001/api/dummyCoords';
  }
}
