import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css']
})
export class CookiesComponent implements OnInit {
  
  public cookieEmail:String;
  public cookieNombre:String;
  public cookieTipo:String;

  constructor( private cookieService: CookieService ) {
    
    this.cookieEmail = "";
    this.cookieNombre = "";
    this.cookieTipo = "";

    var tempCookie = this.cookieService.get('produce_tipo');

    if(tempCookie){
      this.cookieEmail = this.cookieService.get('produce_email');
      this.cookieNombre = this.cookieService.get('produce_nombre');
      this.cookieTipo = this.cookieService.get('produce_tipo');
    }


  }

  ngOnInit() {
  }

  public evaluador(){
 /* this.cookieService.set('produce_email', "evaluador_uno@produce.com");
    this.cookieService.set('produce_nombre', "Evaluador 1"); */
 this.cookieService.set('produce_email', "evaluador_dos@produce.com");
    this.cookieService.set('produce_nombre', "Evaluador 2");  
    this.cookieService.set('produce_tipo', "1");
    this.cookieEmail = this.cookieService.get('produce_email');
    this.cookieNombre = this.cookieService.get('produce_nombre');
    this.cookieTipo = this.cookieService.get('produce_tipo');
  }
  public coordinador(){
//this.cookieService.set('produce_email', "coordinador_dgpar@produce.com");
 this.cookieService.set('produce_email', "coordinador_dgparpa@produce.com");
    this.cookieService.set('produce_nombre', "Coordinador");
    this.cookieService.set('produce_tipo', "2");
    this.cookieEmail = this.cookieService.get('produce_email');
    this.cookieNombre = this.cookieService.get('produce_nombre');
    this.cookieTipo = this.cookieService.get('produce_tipo');
  }
  public representante(){
    this.cookieService.set('produce_email', "consultado_cuatro@produce.com");
    this.cookieService.set('produce_nombre', "Consultado");
    this.cookieService.set('produce_tipo', "3");
    this.cookieEmail = this.cookieService.get('produce_email');
    this.cookieNombre = this.cookieService.get('produce_nombre');
    this.cookieTipo = this.cookieService.get('produce_tipo');
  }
  public administrativo(){
    this.cookieService.set('produce_email', "administrativo_cinco@produce.com");
    this.cookieService.set('produce_nombre', "Administrativo");
    this.cookieService.set('produce_tipo', "4");
    this.cookieEmail = this.cookieService.get('produce_email');
    this.cookieNombre = this.cookieService.get('produce_nombre');
    this.cookieTipo = this.cookieService.get('produce_tipo');
  }

  public logout(){
    this.cookieService.delete('produce_email');
    this.cookieService.delete('produce_nombre');
    this.cookieService.delete('produce_tipo');
    this.cookieEmail = "";
    this.cookieNombre = "";
    this.cookieTipo = "";
  }


}
