import { Injectable } from '@angular/core';
import {getCookie, setCookie , removeCookie} from 'typescript-cookie'


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token_name: string = 'token_name';

  constructor() { }

  saveToken(token: string) {
    setCookie(this.token_name , token, {expires: 365, path: '/'})
  }

  getToken() {
    const token = getCookie(this.token_name)
    return token;
  }

  removeToken() {
    removeCookie(this.token_name);
  }
}
