import { environment } from './../../environments/environment';
import { LoginService } from './login.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private loginService: LoginService,
  ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    //1. verificar si esta logueado
    let rpta = this.loginService.estaLogueado();
    if(!rpta){
      this.loginService.cerrarSesion();
      return false;
    }else{
      const helper = new JwtHelperService();
      let token = sessionStorage.getItem(environment.TOKEN_NAME);
      if(!helper.isTokenExpired(token)){
        return true;
      }else{
        this.loginService.cerrarSesion();
        return false;
      }
    }
    //2. verificar si el token no ha expirado


    return false;
  }
}
