import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx";
import {urlService} from '../urlservice';

@Injectable({
  providedIn: 'root'
})
export class AdministrativoService {

  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

  constructor(private http: HttpClient , public urlService: urlService) { 

    this.domain = this.urlService.base_url;
  }


  /**ADMINISTRATIVO RECIBIDO */
  obtenerRegiones(){
    return this.http.get(`${this.domain}api/Regiones`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaEntidadRecibido(){
    return this.http.get<Object[]>(`${this.domain}api/Administrativo/EntidadRecibido`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListadeRegistrosAdministrativos(id_entidad){
    return this.http.get<Object[]>(`${this.domain}api/Administrativo/ListarRecibido?id_entidad=${id_entidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerTiposDocumento(){
    return this.http.get<Object[]>(`${this.domain}api/Tipodoc/Listar`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  guardarSitradoc(resultado){
    return this.http.post(`${this.domain}api/Administrativo/GuardarSitradoc`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }

  /**ADMINISTRATIVO RESPUESTA */

  obtenerListarRespuestaAdministrativos(){
    return this.http.get<Object[]>(`${this.domain}api/Administrativo/ListarRespuesta`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  detalleAdministrativoRecibido(id_obstaculo){
    return this.http.get<Object[]>(`${this.domain}api/Administrativo/DetalleRespuesta/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  guardarRespuesta(resultado){
    return this.http.post(`${this.domain}api/Administrativo/GuardarRespuesta`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  obtenerlistaCondicionBA(id_entidad){
    return this.http.get<Object[]>(`${this.domain}api/Condicion/Lista?id_entidad=${id_entidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
    }
    /*ADMINISTRATIVO HISTORIAL*/

    obtenerListaHistorial(){
      return this.http.get<Object[]>(`${this.domain}api/Administrativo/ListarHistorial`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
      }

      detalleAdministrativoHistorial(id_obstaculo){
        return this.http.get<Object[]>(`${this.domain}api/Administrativo/DetalleHistorial/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
      }

  


  
}
