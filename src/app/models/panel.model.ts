/** Interfaccia per il modello dati del panel*/
export interface Panel {
  /** La classe css contenente il backdrop */
  backdropClass: string;
  /** La classe css contenente il panel */
  panelClass: string;
  /** Il tipo del panel da visualizzare: panel | subpanel */
  type: string;
  /** Lista delle componenti da visualizzare */
  components: any[];
  /** Le configurazioni per mostrare le actions del panel */
  actionsConfig?: ActionsConfigModel;
  /** Le configurazioni per mostrare l'header del panel */
  headerConfig: HeaderConfigModel;
}

/** Interfaccia per il modello dati delle configurazioni delle actions da far vedere in alto nel pannello */
export interface ActionsConfigModel {
  /** L'eventuale action per la modifica */
  edit?: ActionModel;
  /** Azioni da svolgere sul menù coi tre puntini */
  threeDotsActions?: ActionModel[];
}

/** Interfaccia per il modello dati delle action */
export interface ActionModel {
  /** Il nome da mostrare nella dropdown */
  name: string;
  /** La callback da effettuare al click sulla option corrispondente */
  callback: any;
}

/** Interfaccia per il modello dati delle configurazioni dell'header nel pannello */
export interface HeaderConfigModel {
  /** Il tipo di header da mostrare */
  type: 'DEFAULT' | 'ICON_TITLE' | 'CHIPS_TITLE';
  /** Il title da mostrare, viene assegnato un model diverso in base al tipo di header */
  title: any;
}

/** Interfaccia per il modello del titolo di default */
export interface DefaultTitleModel {
  /** Il titolo */
  nome: string;
}

/** Interfaccia per il modello del titolo con icona, nome e cognome */
export interface IconTitleModel {
  /** Il nome */
  nome: string;
  /** Il cognome */
  cognome: string;
  /** La tipologia di utente */
  tipologia: 'PROFESSIONISTA' | 'PAZIENTE';
}

/** Interfaccia per il modello del titolo con le chips */
export interface ChipTitleModel {
  /** Il titolo */
  nome: string;
  /** Le chips da mostrare  */
  chips: ChipModel[];
}

/** Interfaccia per il modello delle chips */
export interface ChipModel {
  /** Il nome della chip da mostrare */
  name: string;
  /** La classe da assegnare alla chip */
  class: string;
}

/**
 * ECCO ALCUNI ESEMPI PER LA CONFIGURAZIONE DELLE ACTIONS
 *
 * PANNELLO CON LA SOLA ACTION DI EDIT
 * this.pazientiService.getPazienteById(this.paziente.id).subscribe({
        this.panelService.open(GenericDetailModalComponent, {
          backdropClass: 'small-custom-backdrop',
          panelClass: 'custom-subpanel',
          type: 'subpanel',
          components: [DettagliPazienteComponent],
          actionsConfig: {
            edit: {
              name: 'edit',
              callback: () => this.modifyPaziente()
            }
          },
          headerConfig: {
            type: 'ICON_TITLE',
            title: {
              nome: res.anagrafica.nome,
              cognome: res.anagrafica.cognome,
              tipologia: 'PAZIENTE'
            }
          }
        });
      },

  PANNELLO CON MENU' COI TRE PUNTINI
  this.panelService.open(GenericDetailModalComponent, {
      backdropClass: 'custom-backdrop',
      panelClass: 'custom-panel',
      type: 'panel',
      components: [DettaglioPazienteTerapiaComponent],
      actionsConfig: {
        threeDotsActions: [
          { name: 'Esporta Dati', callback: () => this.esportaDati() },
        ],
      },
      headerConfig: {
        type: 'DEFAULT',
        title: {
          nome: terapiaInCorso.nome,
        }
      }
    });
 */

/**
 * ECCO DEGLI ESEMPI PER LA CONFIGURAZIONE DELL'HEADER
 *
 PANNELLO CON HEADER DI DEFAULT
 this.panelService.open(GenericDetailModalComponent, {
          backdropClass: 'custom-backdrop',
          panelClass: 'custom-panel',
          type: 'panel',
          components: [DettaglioClinicaComponent],
          headerConfig: {
            type: 'DEFAULT',
            title: {
              nome: LABEL_CONSTANT.dettaglio_clinica
            }
          }
        });

  PANNELLO CON HEADER ICON TITLE
  this.panelService.open(GenericDetailModalComponent, {
          backdropClass: 'small-custom-backdrop',
          panelClass: 'custom-subpanel',
          type: 'subpanel',
          components: [DettagliProfessionistaComponent],
          headerConfig: {
            type: 'ICON_TITLE',
            title: {
              nome: res.anagrafica.nome,
              cognome: res.anagrafica.cognome,
              tipologia: 'PROFESSIONISTA'
            }
          }
        });

  PANNELLO CON HEADER CHIPS TITLE
  this.panelService.open(GenericDetailModalComponent, {
          backdropClass: 'small-custom-backdrop',
          panelClass: 'custom-subpanel',
          type: 'subpanel',
          components: [DettagliTerapiaComponent],
          actionsConfig: {
            edit: {
              name: 'edit',
              callback: () => this.modifyTerapia()
            }
          },
          headerConfig: {
            type: 'CHIPS_TITLE',
            title: {
              nome: res.nome,
              chips: this.terapiaService.terapia?.tags?.map((tag: any) => ({
                name: tag,
                class: 'chip-default'
              }))
            }
          }
        });
 */
