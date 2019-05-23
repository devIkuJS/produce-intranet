import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/Rx";
import {urlService} from '../urlservice';

@Injectable({
  providedIn: 'root'
})
export class CoordinadorService {

  public domain: String;

  //domain: String = "https://sebasdevapi.azurewebsites.net/";

  constructor(private http: HttpClient , public urlService: urlService) { 

    this.domain = this.urlService.base_url;
  }

  /***********************************/
  obtenerListadeRegistrosCoordinador(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/Listar?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleObstaculoCoordinador(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/Detalle/${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  asignarRegistrosToEvaluador(codigo_registro,id_empleado){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/Asignar?cod_registro=${codigo_registro}&id_empleado=${id_empleado}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListadeEvaluadores(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Empleado?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListadeRegistrosClasificados(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListarClasificado?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListadeRegistrosEvaluados(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListarEvaluado?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  verificarValidez(resultado){
  return this.http.post(`${this.domain}api/Coordinador/VerificarValidez`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  obtenerListadeRegistrosRespuesta(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListarRespuesta?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  registrarRegistroConsultado(codigo_registro){
  return this.http.post(`${this.domain}api/Coordinador/EnvioConsulta`,codigo_registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  obtenerDetalleRespuesta(id_barrera){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/DetalleRespuesta/${id_barrera}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  registrarRegistroRespuestaInterno(registro){
  return this.http.post(`${this.domain}api/Coordinador/EnvioFinal`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  registrarRegistroRespuestaExterno(registro){
    return this.http.post(`${this.domain}api/Coordinador/EnvioFinalExterno`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
    }
  obtenerRegiones(){
  return this.http.get(`${this.domain}api/Regiones`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerActividadEconomica(){
  return this.http.get(`${this.domain}api/ActividadEconomica`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerOrganismos(identidad){
  return this.http.get(`${this.domain}api/Organismo?id_entidad=${identidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerOrganismosBarreras(identidad , direccion){
  return this.http.get(`${this.domain}api/OrganismoBarrera?id_entidad=${identidad}&direccion=${direccion}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  /**PACHAMAMA */
 enviarCorreoPRODUCE(respuesta){
  return this.http.post(`http://pachamama.ourlimm.com/webservices/compra/enviarCorreoPRODUCE`,respuesta,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res);
  }
 obtenerListarConsultadoAdministrado(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListarConsultado?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
 obtenerListarConsultadoOrganismo(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListarBaConsultado?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleCoordinadorAdministrado(cod_registro){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/DetalleConsultadoAdministrado/${cod_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleConsultadoOrganismo(cod_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/DetalleConsultadoOrganismo/${cod_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  
  obtenerlistaCondicionBA(id_entidad){
    return this.http.get<Object[]>(`${this.domain}api/Condicion/Lista?id_entidad=${id_entidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
    }

  enviarConsultaAdministrado(resultado){
  return this.http.post(`${this.domain}api/Coordinador/EnvioConsulta`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
  }
  enviarRespuestaUsuarioCoordinadorToEvaluador(id_barrera){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/RespuestaBarrera?id_barrera=${id_barrera}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  enviarRespuestaAdministradoCoordinadorToEvaluador(codigo_registro){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/RespuestaAdministrado?codigo_registro=${codigo_registro}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  listaRespuestasEnviadas(correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/ListaFinal?correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  DetalleListaRespuestasEnviadas(id_barrera){
  return this.http.get<Object[]>(`${this.domain}api/Coordinador/DetalleFinal/${id_barrera}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleRegistro(id_obstaculo){
  return this.http.get<Object[]>(`${this.domain}api/Evaluador/DetalleRegistro/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerListaSuperacion(bandera,correo_coordinador){
  return this.http.get<Object[]>(`${this.domain}api/Consultado/ListarProcesoSuperacion?bandera=${bandera}&correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
  }
  obtenerDetalleEvaluado(id_obstaculo){
    return this.http.get<Object[]>(`${this.domain}api/Coordinador/DetalleEvaluacion/${id_obstaculo}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
   }
   enviarPrimeraEvaluacion(resultado){
    return this.http.post(`${this.domain}api/Coordinador/PrimeraEvaluacion`,resultado,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
   }
   derivarDGPAR_DGPARPA(id_registro , id_organismo , id_entidad){
    return this.http.get<Object[]>(`${this.domain}api/Coordinador/DerivarRegistro?id_registro=${id_registro}&id_organismo=${id_organismo}&id_entidad=${id_entidad}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
   }

   listaSuperadas(bandera,correo_coordinador){
    return this.http.get<Object[]>(`${this.domain}api/Consultado/ListaSuperadas?bandera=${bandera}&correo_coordinador=${correo_coordinador}`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);

   }
   obtenerEntidades(){
    return this.http.get(`${this.domain}api/Entidad`, {headers: new HttpHeaders({'Content-Type': 'application/json'})}).map(res => res);
    }

    enviarRespuestaAdministrado(registro){
      return this.http.post(`${this.domain}api/Administrado/EnviarRespuesta`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res);   
      }

    enviarRespuestFASE1(registro){
      return this.http.post(`${this.domain}api/Consultado/EnviarRespuesta`,registro,{headers: new HttpHeaders().set('Content-Type', 'application/json'),responseType: 'text'}).map(res => res); 
      } 

      


 

}
