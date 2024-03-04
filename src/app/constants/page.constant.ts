export const SIDENAV_MENU_CONSTANT = [
  /** sidenav in comune per tutti gli utenti che accedono al sito*/
  {
    name: "Il tuo profilo",
    icon: "person",
    path: "/gestionale/profilo",
  },
  {
    name: "Gestione Utenti",
    path: "/gestionale/utenti/lista",
  },
  {
    wip: false,
    name: "Gestione Piste",
    icon: "pistes",
    path: "/gestionale/piste",
  },

  {
    wip: false,
    name: "Gestione Attrezzature",
    path: "/gestionale/attrezzatura/getall",
  },

  {
    name: "Gestione Impianti",
    path: "/gestionale/impianti/getall",
  },
  {
    name: "Gestione Prenotazioni",
    path: "/gestionale/prenotazioni/getall",
  },
  {
    name: "Gestione Anagrafiche",
    path: "/gestionale/anagrafica",
  },
  {
    name: "Gestione Noleggio",
    path: "/gestionale/noleggi/getall",
  },
];

export const SIDENAV_MENU_CONSTANT_ADMIN = [
  /** sidenav disponibile solo per gli admin  */
  {
    name: "Il tuo profilo",
    icon: "person",
    path: "/admin/profilo",
  },
  {
    name: "Gestione Piste",
    path: "/admin/piste/getAllPersonalizzata",
  },
  {
    name: 'Gestione Impianti',
    path: '/admin/impianti/getAllPersonalizzata',
  },
];

export const SIDENAV_MENU_CONSTANT_USER = [
  /** sidenav disponibile solo per gli user */
  {
    name: "Il tuo profilo",
    icon: "person",
    path: "/user/profilo",
  },
  {
    name: "Nuova Prenotazione",
    path: "/user/nuovaPrenotazione",
  },
  {
    wip: false,
    name: "Storico Prenotazione",
    path: "user/storico",
  },
  {
    wip: false,
    name: "Noleggio Attrezzatura",

    path: "user/noleggio/getallPersonalizzata",
  },
];
