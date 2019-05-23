import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx";
import {urlService} from '../urlservice';


@Injectable({
  providedIn: 'root'
})
export class RepresentanteService {

  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

  constructor(private http: HttpClient , public urlService: urlService) { 

    this.domain = this.urlService.base_url;
  }

  obtenerListadeRegistrosConsultadoFASE1(){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/Lista`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleFASE1(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/DetalleConsultado/${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  enviarRespuestFASE1(registro){
  return this.http.post(`${this.domain}api/Consultado/EnviarRespuesta`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  } 
  obtenerListadeRegistrosConsultadoFASE2(){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/ListaRespuesta`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleFASE2(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/DetalleRespuesta/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleRegistro(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleRegistro/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaSuperacion(bandera,correo_consultado){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/ListarProcesoSuperacion?bandera=${bandera}&correo_coordinador=${correo_consultado}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  listaSuperadas(bandera,correo_consultado){
    return this.http.get<Object[]>(`${this.domain}api/Consultado/ListaSuperadas?bandera=${bandera}&correo_coordinador=${correo_consultado}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);

   }


 


}
