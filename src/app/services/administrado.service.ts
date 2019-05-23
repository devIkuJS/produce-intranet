import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx";
import {urlService} from '../urlservice';

@Injectable({
  providedIn: 'root'
})
export class AdministradoService {

  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

  constructor(private http: HttpClient , public urlService: urlService) { 

    this.domain = this.urlService.base_url;
  }

  obtenerAdministradoDetalleConsultado(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Administrado/DetalleConsultado/${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  envioCorreoAdministrado(correo: string , hash: string) {
  let bodyString = JSON.stringify({correo,hash});
  return this.http.post(`http://pachamama.ourlimm.com/webservices/compra/detalleObstaculoAdministrado`,bodyString,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res);  
  }
  enviarRespuestaAdministrado(registro){
  return this.http.post(`${this.domain}api/Administrado/EnviarRespuesta`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res);   
  }
  recuperarCodigo(correo_persona){
  return this.http.get(`${this.domain}api/Administrado/RecuperarCodigo?correo_persona=${correo_persona}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }


}
