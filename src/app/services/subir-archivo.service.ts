import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';


@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: any, token: string) {

    return new Promise((resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append('archivo', archivo, archivo.name);

      xhr.onreadystatechange = function () {

        if (xhr.readyState === 4) {

          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('fallo la subida');
            reject(xhr.response);
          }

        }

      };

      let url = URL_SERVICIOS + '/uploads/' + tipo + '/' + id;

      xhr.open('PUT', url, true);
      console.log(token);
      // xhr.setRequestHeader('auth', token);
      // xhr.withCredentials = false;
      xhr.setRequestHeader('auth', token);
      xhr.send(formData);

    });

  }

}
