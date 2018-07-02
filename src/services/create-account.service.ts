
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// This specifies what the client expects to recieve back (json)
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class CreateAccountService {
<<<<<<< HEAD
  // public apiUrl = 'http://localhost:7000/addUser';
=======
  //public apiUrl = 'http://localhost:7000/addUser';
>>>>>>> dd59ad5e2302eff616e6cc210b4ae83ac859e9d5
  public apiUrl = 'https://goals.digitalstudio.io/addUser';
  // Inject HttpClient module into service so can make Rest API calls
  constructor(public http: HttpClient) { }

  // This function takes the user's login input values as a parameter (username and password)
  // and then checks to see if an account with those credentials exist
  createaccount(user) {
    let body = JSON.stringify(user);
    console.log(body);
    return this.http.post(this.apiUrl, body, httpOptions);
  }
}
