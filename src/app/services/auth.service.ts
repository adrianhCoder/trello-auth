import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import {environment} from '@environments/environment'
import { switchMap,tap } from 'rxjs/operators';

import {TokenService} from '@services/token.service'
import {ResponseLogin} from '@models/auth.model'

import { User } from '@models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.API_URL;
  user$ = new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    ) { }

  login (email:string, password:string){
    return this.http.post<ResponseLogin>(`${this.apiUrl}/api/v1/auth/login`,{
      email,
      password
    }).pipe(
      tap(response => {
        this.tokenService.saveToken(response.access_token);
      })
    );

  }


  register(name: string, password: string, email: string ){
    return this.http.post(`${this.apiUrl}/api/v1/auth/register`,{
      name,
      email,
      password
    });
  }

  registerAndLogin(name: string, password: string, email: string ){
    return this.register(name,password,email)
    .pipe(
      switchMap(() => this.login(email,password))
    )
  }

  isAvailable(email: string){
    return this.http.post<{isAvailable : boolean}>(`${this.apiUrl}/api/v1/auth/is-available`,{
      email
    });

  }


  recovery(email: string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/recovery`,{
      email
    });
  }

  changuePassword(token : string, newPassword : string){
    return this.http.post(`${this.apiUrl}/api/v1/auth/change-password`,{newPassword, token});
  }

  getProfile(){
    const token = this.tokenService.getToken();
      return this.http.get<User>(`${this.apiUrl}/api/v1/auth/profile`,{
        headers :{
          Authorization : `Bearer ${token}`
        }
      }).pipe(
          tap(user =>{
            this.user$.next(user);
          })
      );
  }


  logout(){
    this.tokenService.removeToken();
  }
}
