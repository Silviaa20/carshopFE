/** Costante con i testi da usare negli input */
export const INPUT_CONSTANT = {
  nome: "Nome",
  cognome: "Cognome",
  dataNascita: "Data di nascita",
  luogoNascita: "Luogo di nascita",
  email: "Email",
  telefono: "Telefono",
  note: "Note",
  password: "Password",
  elimina: "Elimina",
  azioni_di_gruppo: "Azioni di gruppo",
  ruolo: "Ruolo",
  nome_cognome: "Nome o Cognome",
  stato: "Stato",
  ricerca: "Ricerca",
 
  pageNumber: 0,
  pageSize: 10,
  tags: "Tags",
  tag: "Tag",
  descrizione: "Descrizione",
  data_inizio: "Data inizio",
  data_fine: "Data fine",
  nome_e_cognome: "Nome e cognome",
  email_recupero: "Email di recupero",
  campi_obbligatori: "* Campi obbligatori",
  quantita: "Quantità",
  indirizzo: 'Indirizzo',
  username: 'Username'
};

/** Costante con i testi da usare negli input di una tabella*/
export const TABLE_INPUT_CONSTANT = {
  username: 'Username',
  usertype: 'Ruolo',
  id: 'ID',
  idnoleggio : 'idnoleggio',
  idattrezzatura : 'idattrezzatura',
  data_inizio : 'data_inizio',
  data_fine : 'data_fine',
  nome: 'Nome',
  descrizione: 'Descrizione',
  difficolta: "difficolta",

  luogo: "Luogo",
  prenotazioniMax: "Prenotazioni Massime",
  amministratore: "Amministratore",
  nomeUtente: "Nome Utente", //"Nome Utente" e quello che visualizzi nell'html e quindi nello schermo
  nomePista: "Nome Pista",
  DataInizio: "Data Inizio",
  DataFine: "Data Fine",
  user: 'User',
  cognome: 'Cognome',
  dataNascita: "Data di nascita",
  luogoNascita: "Luogo di nascita",
  indirizzo: 'Indirizzo',
  idImpianto: "Impianto",
  idAttrezzatura: "idAttrezzatura",
  Prezzo:"Prezzo",
  prezzo:"Prezzo"
};

/** Costante con i testi da usare nella select della azioni di gruppo */
export const TABLE_GROUP_ACTIONS_CONSTANT = [
  {
    icon: "delete",
    value: "Elimina",
  },
];

export const TABLE_COLUMNS = {
  utenti: ['username', 'usertype', 'action'],
  impianti:['nome', 'descrizione','luogo','amministratore','action'],
  impiantiUser:['nome', 'descrizione','luogo','action'],
  anagrafica:['nome', 'cognome', 'indirizzo', 'dataNascita', 'luogoNascita', 'user', 'action'],
  pista: [
    "select",
    "nome",
    "difficolta",
    "prezzo",
    "prenotazioniMax",
    "action",
  ],
  prenotazioni: [
    "select",
    "nomePista", //questo nome qui deve essere uguale a quello in blu in export const TABLE_INPUT_CONSTANT
    "DataInizio",
    "DataFine",
    "nomeUtente",
    "action",
  ],

  noleggio: [
  'select',
  'idnoleggio', 
  'username', 
  'idattrezzatura', 
  'data_inizio',
  'data_fine',
  'action',
],
   
  attrezzatura: [
    "select",
    "nome",
    "descrizione",
    "prezzo",
    "idImpianto",
    "action",
  ],
  
};
