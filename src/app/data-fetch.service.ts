import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataFetchService {
  private DATA_SERVER = "http://localhost:3001/api/dummyCoords";

  constructor(private httpClient: HttpClient) {

  }
  public getData(){
    return this.httpClient.get(this.DATA_SERVER)
  }
}
