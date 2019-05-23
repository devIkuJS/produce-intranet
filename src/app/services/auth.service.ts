import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public cookieValue;

  constructor(private cookieService: CookieService) {
    this.cookieValue = "";
  }

  loggedInEvaluador(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined || dataAux != "1"){
      return false;
    }else{
      return true;
    }    
  }

  loggedInCoordinador(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined || dataAux != "2"){
      return false;
    }else{
      return true;
    }    
    
  }
  
  loggedInRepresentate(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined || dataAux != "3"){
      return false;
    }else{
      return true;
    }    
    
  }

  loggedInAdministrativo(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined || dataAux != "4"){
      return false;
    }else{
      return true;
    }    
    
  }

  loggedIn(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined){
      return false;
    }else{
      return true;
    }
  }


}
