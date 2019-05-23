import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private cookieService: CookieService,private router: Router) { }
  ngOnInit() {
    this.loadViewData();
  }
  public loadViewData(){
    var dataAux = this.cookieService.get('produce_tipo');
    if(dataAux == "" || dataAux == undefined){
      this.router.navigate(['/no-autenticado']);
      return false;    
    }else{
      if(dataAux == "1"){
        this.router.navigate(['/evaluador']);
        return false;
      }else if(dataAux == "2"){
        this.router.navigate(['/coordinador']);
        return false;
      }else if(dataAux == "3"){
        this.router.navigate(['/representante']);
        return false;
      }else if(dataAux == "4"){
        this.router.navigate(['/administrativo']);
        return false;
      }else{
        this.router.navigate(['/no-autenticado']);
        return false;    
      }
    }   
  }
}
