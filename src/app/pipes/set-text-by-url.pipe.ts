import { Pipe, PipeTransform } from '@angular/core';

/** Pipe che imposta il titolo della pagina dall'url */
@Pipe({
  standalone: true,
  name: 'setTextByUrl',
  pure: false,
})
export class SetTextByUrlPipe implements PipeTransform {
  /**
   * Ritorna il titolo della pagina usando il path o una string vuota se non trovato
   * @param {string} value Non usato ma necessario per l'interfaccia
   * @param {any} array L'Array da usare per recupare la string da usare nel titolo
   * @param {string} key La chiave da usare nell'Array
   * @returns {string} Il titolo
   */
  transform(value: string, array: any, key: string): string {
    return array[location.pathname] ? array[location.pathname][key] ?? '' : '';
  }
}
