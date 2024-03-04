/**
 * Oggetto con chiave-valore uguale un path come chiave e valore oggetto di tipo { title: title, subtitle: subtile}
 * Costante in cui sono presenti i testi dei titoli
 */
export const TITLE_CONSTANT = {
  gestione_profilo: "Gestione Profilo",
  profilo: "Profilo",
  modifica_profilo: "Modifica profilo",
}

/**
 * Oggetto con chiave-valore uguale un path come chiave e valore oggetto di tipo { title: title, subtitle: subtile}
 * Costante in cui sono presenti in base al path in cui si è i valori del titolo e il sottotitolo da mostrare nella sezione del sub header
 */
export const DASHBOARD_HEADER = {
  "/gestionale/utenti/lista": {
    title: "Tutti gli utenti",
  },
  '/gestionale/impianti/getall':{
    title: 'Tutti gli Impianti'
  },
  "/gestionale/prenotazioni/getall": {
    title: "Tutte le prenotazioni",
  },


  '/gestionale/noleggio/getall':{
    title: 'Tutti i noleggi'

  }
  };
