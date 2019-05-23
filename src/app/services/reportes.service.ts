import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx";
import {urlService} from '../urlservice';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

  constructor(private http: HttpClient , public urlService: urlService) { 

    this.domain = this.urlService.base_url;
  }

  obtenerDependenciasEntidadesPublicas(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/DependenciasEntidadesPublicas`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDependenciasSectorProduccion(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/DependenciasSectorProduccion`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDependenciasSectorProduccionRecurrencia(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/DependenciasSectorProduccionRecurrencia`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerSectorProduccionSinRespuesta(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/SectorProduccionSinRespuesta`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRemisionIndecopi(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionIndecopi`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRemisionIndecopiRecurrencia(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionIndecopiRecurrencia`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRemisionOtrasEntidades(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionOtrasEntidades`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRemisionRegistro(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionRegistro`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerRemisionRegistroValidos(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionRegistroValidos`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerReporteGeneral(){
  return this.http.get<Object[]>(`${this.domain}api/Reporte/General`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerSectorProduccionSinRecurrencia(){
    return this.http.get<Object[]>(`${this.domain}api/Reporte/SectorProduccionSinRespuestaRecurrencia`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerEntidadesRecurrencia(){
    return this.http.get<Object[]>(`${this.domain}api/Reporte/RemisionOtrasEntidadesRecurrencia`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }

}
