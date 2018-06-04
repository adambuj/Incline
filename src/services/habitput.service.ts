import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HabitPutService {

  public apiUrl = 'https://goals.digitalstudio.io/habitaction';
  // Inject HttpClient module into service so can make Rest API calls
  constructor(public http: HttpClient) { }

  // This function takes the user's updated password and does a post operation
  habitput(habit) {
    return this.http.put<any>(`${this.apiUrl}/${habit._id}`, habit, {withCredentials: true}).map((res:Response) => res);
  }

}
