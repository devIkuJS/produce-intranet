import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEvaluadorGuard implements CanActivate{

    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(){
         if(this.authService.loggedInEvaluador()){
            return true;
        }else{
            this.router.navigate(['/no-autenticado']);
            return false;
        }
    }

}