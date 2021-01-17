import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:string;
  clave:string;
  mensaje:string;
  error:string;

  constructor(
  private loginService: LoginService,
  private router: Router
  ) { }

  ngOnInit(): void {
  }
  iniciarSecion(){
    this.loginService.login(this.usuario,this.clave).subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN_NAME,data.access_token);

      this.router.navigate(['entidad']);
    });
  }
}
