import { Injectable } from '@angular/core';
import jwt_decode, { JwtPayload } from 'jwt-decode';
import {getCookie, setCookie , removeCookie} from 'typescript-cookie'


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  token_name: string = 'token-trello';

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

  isValidToken(){

    const token = this.getToken();

    if (!token){
      return false;
    }
    const decodeToken = jwt_decode<JwtPayload>(token);
    if ( decodeToken && decodeToken?.exp){
        const tokenDate = new Date(0);
        tokenDate.setUTCSeconds(decodeToken.exp);
        const today = new Date();

        return tokenDate.getTime() > today.getTime();
    }
    return false;
  }
}
