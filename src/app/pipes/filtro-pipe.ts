import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(lista:any[], texto: string, columna: string): any[] {
    //si el texto recibido esta vacio se muestra todoo, como si no se hubiera escrito nada
    if (texto === '') {
      return lista;
    }
    //lo pasamos a minusculas
    texto = texto.toLowerCase();
    return lista.filter(/*La lista es como una caja de juguetes, el texto es el nombre del juguete y la columna es la
    etiqueta del juguete donde se mira el texto que quieres buscar, algo asi como "Voy a buscar en la caja de juguetes
    y voy ver si en la etiqueta de este juguete incluye el texto que estoy buscando.*/
      item =>item[columna].toLowerCase().includes(texto)
    );
  }

}
