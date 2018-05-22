import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {

  // Inject HttpClient module into service so can make Rest API calls
  constructor(public http: HttpClient) { }

  // This function takes the user's login input values as a parameter (username and password)
  // and then checks to see if an account with those credentials exist
  login(user) {
    return this.http.post<any>('https://ec2-35-168-103-149.compute-1.amazonaws.com/login', user, { withCredentials: true });
  }
}
