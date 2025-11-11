const fonts = {
  tiemposHeadline: {
    fontFamily: 'Tiempos Headline',
    lineHeight: 1,
    padding: '15px 12px 6px'
  },
  robotoSlab: {
    fontFamily: 'Roboto Slab',
    lineHeight: 1.25,
    padding: '10px 10px 4px'
  },
  roboto: {
    fontFamily: 'Roboto',
    padding: '10px 10px 4px'
  },
  robotoCondensed: {
    fontFamily: 'Roboto Condensed',
    padding: '10px 10px 4px'
  },
  gotham: {
    fontFamily: 'Gotham',
    letterSpacing: '-0.5px',
    padding: '10px 10px 4px'
  },
  helvetica: {
    fontFamily: 'Helvetica, Arial',
    padding: '10px 10px 4px'
  },
  georgia: {
    fontFamily: 'Georgia',
    padding: '10px 10px 4px'
  },
  titillium: {
    fontFamily: 'Titillium Web',
    padding: '1px 10px 4px'
  }
}

const sources = [
  {
    id: 'eldiario',
    name: 'eldiario.es',
    logo: require('./logos/eldiario.svg'),
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#235690'
  },
  {
    id: 'elsalto',
    name: 'El Salto',
    logo: require('./logos/elsalto.png'),
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#000'
  },
  {
    id: 'lavanguardia',
    name: 'La Vanguardia',
    logo: require('./logos/lavanguardia.svg'),
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#071C49'
  },
  {
    id: 'antena3',
    name: 'Antena 3',
    logo: require('./logos/antena3.svg'),
    logoHeight: 22,
    font: fonts.roboto,
    color: '#ED7B38'
  },
  {
    id: 'abc',
    name: 'ABC',
    logo: require('./logos/abc.svg'),
    logoHeight: 20,
    font: fonts.tiemposHeadline,
    color: '#000'
  },
  {
    id: 'lasprovincias',
    name: 'Las Provincias',
    logo: require('./logos/lasprovincias.svg'),
    logoHeight: 20,
    font: fonts.roboto,
    color: '#000'
  },
  {
    id: 'levante',
    name: 'Levante',
    logo: require('./logos/levante.svg'),
    logoHeight: 22,
    font: fonts.gotham,
    color: '#386998'
  },
  {
    id: 'apunt',
    name: 'À punt',
    logo: require('./logos/apunt.svg'),
    logoHeight: 28,
    font: fonts.gotham,
    color: '#000'
  },
  {
    id: 'elpais',
    name: 'El País',
    logo: require('./logos/elpais.svg'),
    logoHeight: 22,
    font: fonts.tiemposHeadline,
    color: '#1F4D80'
  },
  {
    id: 'publico',
    name: 'Público',
    logo: require('./logos/publico.png'),
    logoHeight: 22,
    font: fonts.tiemposHeadline,
    color: '#d11031'
  },
  {
    id: 'lasexta',
    name: 'La Sexta',
    logo: require('./logos/lasexta.svg'),
    logoHeight: 26,
    font: fonts.roboto,
    color: '#63AB54'
  },
  {
    id: 'ser',
    name: 'Cadena Ser',
    logo: require('./logos/ser.svg'),
    logoHeight: 20,
    font: fonts.gotham,
    color: '#000'
  },
  {
    id: 'valenciaplaza',
    name: 'Valencia Plaza',
    logo: require('./logos/valenciaplaza.svg'),
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'informacion',
    name: 'Diario Información',
    logo: require('./logos/informacion.svg'),
    logoHeight: 24,
    font: fonts.tiemposHeadline,
    color: '#306E9B'
  },
  {
    id: '20minutos',
    name: '20 Minutos',
    logo: require('./logos/20_minutos.svg'),
    logoCard: require('./logos/20_minutos_card.svg'),
    logoHeight: 34,
    font: fonts.helvetica,
    color: '#1C4295'
  },
  {
    id: 'laveu',
    name: 'La Veu',
    logo: require('./logos/laveu.svg'),
    logoHeight: 24,
    font: fonts.gotham,
    color: '#E83334'
  },
  {
    id: 'europapress',
    name: 'EuropaPress',
    logo: require('./logos/europapress.svg'),
    logoHeight: 18,
    font: fonts.roboto,
    color: '#BA261A'
  },
  {
    id: 'elmundo',
    name: 'El Mundo',
    logo: require('./logos/elmundo.svg'),
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#6887A6'
  },
  {
    id: 'infolibre',
    name: 'InfoLibre',
    logo: require('./logos/infolibre.svg'),
    logoHeight: 22,
    font: fonts.georgia,
    color: '#B22726'
  },
  {
    id: 'elperiodicodeaqui',
    name: 'El Periódico de Aquí',
    logo: require('./logos/elperiodicodeaqui.png'),
    logoHeight: 28,
    font: fonts.tiemposHeadline,
    color: '#AA3D3A'
  },
  {
    id: 'lamarinaplaza',
    name: 'La Marina Plaça',
    logo: require('./logos/marinaplaza.svg'),
    logoHeight: 28,
    font: fonts.tiemposHeadline,
    color: '#146f9C'
  },
  {
    id: 'elconfidencial',
    name: 'El Confidencial',
    logo: require('./logos/elconfidencial.svg'),
    logoHeight: 24,
    font: fonts.tiemposHeadline,
    color: '#163A4D'
  },
  {
    id: 'elperiodic',
    name: 'elperiòdic.com',
    logo: require('./logos/elperiodic.svg'),
    logoHeight: 24,
    font: fonts.roboto,
    color: '#364E79'
  },
  {
    id: 'valenciaextra',
    name: 'València Extra',
    logo: require('./logos/valenciaextra.svg'),
    logoHeight: 24,
    font: fonts.titillium,
    color: '#E3803B'
  },
  {
    id: 'castelloninformacion',
    name: 'Castellón Información',
    logo: require('./logos/csinfo.png'),
    logoHeight: 28,
    font: fonts.gotham,
    color: '#ED9A3E'
  },
  {
    id: 'castellotv',
    name: 'Televisó de Castelló',
    logo: require('./logos/castello-tv.png'),
    logoHeight: 28,
    font: fonts.gotham,
    color: '#0d8a50'
  },
  {
    id: 'alicanteplaza',
    name: 'Alicante Plaza',
    logo: require('./logos/alicante-plaza.png'),
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'castellonplaza',
    name: 'Castellón Plaza',
    logo: require('./logos/castellon-plaza.png'),
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'mediterraneoperiodico',
    name: 'El Periódico Mediterráneo',
    logo: require('./logos/mediterraneo-cs.png'),
    logoHeight: 22,
    font: fonts.roboto,
    color: '#104277'
  },
  {
    id: 'nouhorta',
    name: 'Nou Horta',
    logo: require('./logos/nou-horta.svg'),
    logoHeight: 28,
    font: fonts.roboto,
    color: '#1D1D1B'
  },
  {
    id: 'elmeridiano',
    name: 'El Meridiano Horta',
    logo: require('./logos/el-meridiano.png'),
    logoHeight: 20,
    font: fonts.roboto,
    color: '#00849e'
  },
  {
    id: 'actualitatvalenciana',
    name: 'Actualitat Valenciana',
    logo: require('./logos/actualitat-valenciana.png'),
    logoHeight: 20,
    font: fonts.roboto,
    color: '#d60b52'
  },
  {
    id: 'aramultimedia',
    name: 'Ara Multimedia',
    logo: require('./logos/aramultimedia.png'),
    logoHeight: 20,
    font: fonts.roboto,
    color: '#000'
  },
  {
    id: 'plazaradio',
    name: 'Plaza Radio',
    logo: require('./logos/plazaradio.png'),
    logoHeight: 28,
    font: fonts.tiemposHeadline,
    color: '#000'
  },
  {
    id: 'hortanoticias',
    name: 'Horta Noticias',
    logo: require('./logos/hortanoticias.png'),
    logoHeight: 28,
    font: fonts.roboto,
    color: '#679c27'
  },
  {
    id: 'huffpost',
    name: 'Huffington Post',
    logo: require('./logos/huffpost.svg'),
    logoHeight: 20,
    font: fonts.roboto,
    color: '#0dbe98'
  }
]

export default sources
