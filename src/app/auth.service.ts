import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // apiUrl = "https://jsonplaceholder.typicode.com";
  apiUrl = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }



  register(obj: any) {
    const userdetail = localStorage.getItem('userdetail')
    return this.http.post<any>(
      this.apiUrl + '/user/register',
      obj,

    );
  }

  login(username: string, password: string) {
    // const loginuser = localStorage.getItem('loginuser');
    return this.http.post<any>(
      this.apiUrl + '/user/login',
      {
        username,
        password,
      },

    );
  }

  updateProfile(model: any) {
    return this.http.put<any>(this.apiUrl + '/user/profile', model);
  }

  deleteProfile(id: number) {
    return this.http.delete<any>(this.apiUrl + `/user/profile/${id}`);

  }

  cardgamehistory(obj: any) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.post<any>(
      this.apiUrl + '/cardwinner/cardgamehistory',
      obj,
    );
  }
  getcardgamehistory(userId: string | undefined) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.get<any>(`${this.apiUrl}/cardwinner/cardgamehistory?userId=${userId}`);
  }


  numbergames(obj: any) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.post<any>(
      this.apiUrl + '/numberwinner/numbergames',
      obj,
    );
  }
  getnumbergamehistory(userId: string | undefined) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.get<any>(`${this.apiUrl}/numberwinner/numbergames?userId=${userId}`);
  }

  ticgamehistory(obj: any) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.post<any>(
      this.apiUrl + '/ticwinner/ticgamehistory',
      obj,
    );
  }

  getTicgamehistory(userId: string | undefined) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.get<any>(`${this.apiUrl}/ticwinner/ticgamehistory?userId=${userId}`);
  }

  review(obj: any) {
    // const ticwinner = localStorage.getItem('tic-toe winner');
    return this.http.post<any>(
      this.apiUrl + '/userreview/review',
      obj,
    );
  }

  email(obj: any) {
    return this.http.post<any>(
      this.apiUrl + '/otp/otp',
      obj
    )
  }

  payment(obj: any) {
    return this.http.post<any>(
      this.apiUrl + '/payment/payment',
      obj
    )
  }
}
