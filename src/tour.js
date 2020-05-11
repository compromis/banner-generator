export const labels = {
  buttonSkip: 'Omet tour',
  buttonPrevious: 'Anterior',
  buttonNext: 'Següent',
  buttonStop: 'Finalitza'
}

export const selectorSteps = [
  {
    target: '.template-selector-header',
    content: `<strong>Hola! Estàs al generador de targes de Compromís</strong>,
    una ferramenta per a crear gràfics per a xarxes socials ràpidament i fàcilment.
    Si vols, et podem fer una curteta visita guiada per l'aplicació.`
  },
  {
    target: '.template-selector-header',
    content: `Aquesta és la pantalla principal. Ací podràs seleccionar entre els diferents models de tarja.`
  },
  {
    target: '.template-item-headline',
    content: `Per exemple, el model de titular serveix per a destacar una notícia publicada a premsa. Fes clic i t'ensenyem com crear-la`,
    params: {
      placement: 'bottom'
    }
  }
]

export const workspaceSteps = [
  {
    target: '.canvas-wrapper',
    content: `<strong>Açò és l'espai de treball</strong>,
    Ací a la dreta veus una vista prèvia de la teua tarja. `,
    params: {
      placement: 'left'
    }
  },
  {
    target: '.banner-aspect .tabs',
    content: `Amb aquest botó pots canviar les dimensions de la tarja. 1:1 fa targes quadrades per xarxes com Facebook, Twitter o Instagram.
    9:16 crea gràfics en format story.`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '.pane',
    content: `Ací a l'esquerra està el panell d'edició. Ací introduirem les dades per emplenar la tarja. Ara mateixa està molt buida, anem a introduir alguna cosa!`,
    params: {
      placement: 'right'
    }
  },
  {
    target: '#source-field',
    content: `Comencem per la font. Selecciona un mitjà de comunicació, per exemple 'À Punt'`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '#headline-field',
    content: `Ara, emplenem el titular. Escriu el que vulgues, per exemple "Les dones prenen els carrers per a declarar l’emergència feminista".`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '#picture-field',
    content: `A continuació, selecciona o arrosega una imatge del teu ordinador.`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '#picture-position-field',
    content: `Amb aquest control pots ajustar si cal la posició de la imatge.`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '#hashtag-field',
    content: `Ací pots escriure un hashtag, si vols.`,
    params: {
      placement: 'bottom'
    }
  },
  {
    target: '#local-label-field',
    content: `També pots afegir el nom del teu col·lectiu local o comarcal.`,
    params: {
      placement: 'top'
    }
  },
  {
    target: '#download-button',
    content: `Revisa que tot estiga bé i descarrega amb aquest botó.`,
    params: {
      placement: 'top'
    }
  },
  {
    target: '#help-button',
    content: `Ja està! Si necessites més informació, teniu algun problema, o suggeriments,
    totes les targes tenen un botó com aquest a la part superior dreta de la pantalla.
    Recomanem que el llegiu abans de crear una tarja.`,
    params: {
      placement: 'bottom'
    }
  }
]
