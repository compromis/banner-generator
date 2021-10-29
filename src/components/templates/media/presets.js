import xarxes from './presets-xarxes.js'

const sources = [
  {
    name: 'Apunt',
    channels: [
      {
        id: 'apunt',
        name: 'À Punt',
        logo: require('./logos/channels/apunt.png'),
        color: 'black',
        programmes: [
          {
            id: 'docs',
            name: 'Docs',
            logo: require('./logos/programme/docs.jpg'),
            color: 'white'
          },
          {
            id: 'apuntntc',
            name: 'Notícies',
            logo: require('./logos/programme/apuntntc.png'),
            width: '105px',
            color: 'white'
          }
        ]
      }
    ]
  },
  {
    name: 'Televisions Estatals',
    channels: [
      {
        id: 'la1',
        name: 'La 1',
        logo: require('./logos/channels/tve.jpg'),
        color: 'white',
        programmes: [
          {
            id: 'desayunos',
            name: 'Los desayunos de TVE',
            logo: require('./logos/programme/desayunos.jpeg'),
            color: 'white',
            width: '90px'
          }
        ]
      },
      {
        id: 'la2',
        name: 'La 2',
        logo: require('./logos/channels/la2.png'),
        color: 'white',
        programmes: []
      },
      {
        id: 'antena3',
        name: 'Antena 3',
        logo: require('./logos/channels/antena3.jpg'),
        color: '#ff7328',
        programmes: [
          {
            id: 'espejopublico',
            name: 'Espejo Público',
            logo: require('./logos/programme/espejopublico.svg'),
            color: 'white',
            padding: '5px'
          }
        ]
      },
      {
        id: 'cuatro',
        name: 'Cuatro',
        logo: require('./logos/channels/cuatro.png'),
        programmes: [],
        color: '#ff0000'
      },
      {
        id: 'telecinco',
        name: 'Telecinco',
        logo: require('./logos/channels/telecinco.jpg'),
        color: '#00a5db',
        programmes: []
      },
      {
        id: 'lasexta',
        name: 'laSexta',
        logo: require('./logos/channels/lasexta.jpg'),
        color: '#293b47',
        programmes: [
          {
            id: 'noche',
            name: 'La Sexta Noche',
            logo: require('./logos/programme/lasextanoche.jpg'),
            color: 'black'
          },
          {
            id: 'alrojovivo',
            name: 'Al Rojo Vivo',
            logo: require('./logos/programme/alrojovivo.svg'),
            color: '#d4001f',
            padding: '5px'
          }
        ]
      },
      {
        id: '24h',
        name: '24h tve',
        logo: require('./logos/channels/24h.jpg'),
        color: 'white',
        programmes: []
      }
    ]
  },

  // radios
  {
    name: 'Ràdios Estatals',
    channels: [
      {
        id: 'cadenaser',
        name: 'Cadena SER',
        logo: require('../headline/logos/ser.svg'),
        padding: '5px',
        color: '#293b47',
        programmes: []
      },
      {
        id: 'ondacero',
        name: 'Onda Cero',
        logo: require('./logos/channels/ondacero.png'),
        color: '#293b47',
        programmes: []
      },
      {
        id: 'rne',
        name: 'Ràdio Nacional',
        logo: require('./logos/channels/rne.svg'),
        color: 'linear-gradient(45deg, #97233f 0%, #ff0000 100%)',
        programmes: []
      },
      {
        id: 'cope',
        name: 'Cadena Cope',
        logo: require('./logos/channels/cope.svg'),
        color: '#2e72b8',
        programmes: []
      }
    ]
  },

  // radios valencianes
  {
    name: 'Radios valencianes',
    channels: [
      {
        id: 'plazaradio',
        name: 'Plaza Radio',
        logo: require('./logos/channels/plazaradio.png'),
        color: '#000',
        programmes: []
      }
    ]
  },

  // xarxes socials
  xarxes,

  // televisions locals
  {
    name: 'Televisions Locals',
    channels: [
      {
        id: 'alacantitv',
        name: 'Alacantí Tv',
        logo: require('./logos/channels/alacantitv.jpg'),
        color: 'white',
        programmes: []
      },
      {
        id: 'la8mediterraneo',
        name: 'la8 Mediterráneo',
        logo: require('./logos/channels/la8mediterraneo.jpg'),
        color: 'white',
        programmes: []
      },
      {
        id: 'lapoblatv',
        name: 'La Pobla TV',
        logo: require('./logos/channels/lapoblatv.jpg'),
        color: 'white',
        programmes: []
      },
      {
        id: 'levantetv',
        name: 'Levante TV',
        logo: require('./logos/channels/levantetv.jpg'),
        color: 'white',
        programmes: []
      },
      {
        id: 'riberatv',
        name: 'Ribera TV',
        logo: require('./logos/channels/riberatv.png'),
        programmes: [],
        color: 'white'
      },
      {
        id: 'tele7',
        name: 'Tele 7 València',
        logo: require('./logos/channels/tele7.jpg'),
        color: '#eb7201',
        programmes: []
      },
      {
        id: 'teleelx',
        name: 'TeleElx',
        logo: require('./logos/channels/teleelx.png'),
        color: '#d13138',
        programmes: []
      },
      {
        id: 'teleorihuela',
        name: 'Tele Orihuela',
        logo: require('./logos/channels/teleorihuela.jpg'),
        color: 'black',
        programmes: []
      },
      {
        id: 'telesafor',
        name: 'TeleSafor',
        logo: require('./logos/channels/telesafor.jpg'),
        color: '#51209e',
        programmes: []
      },
      {
        id: 'telesagunto',
        name: 'Tele Sagunt',
        logo: require('./logos/channels/telesagunto.jpg'),
        color: 'white',
        programmes: []
      },
      {
        id: 'castellotv',
        name: 'Castelló TV',
        logo: require('./logos/channels/castello-tv.png'),
        color: 'white',
        programmes: []
      }
    ]
  },
  {
    name: 'Radios Locals',
    channels: [
      {
        id: 'radiopego',
        name: 'Radio Pego',
        logo: require('./logos/channels/radiopego.png'),
        color: 'white',
        programmes: []
      }
    ]
  }
]

export default sources
