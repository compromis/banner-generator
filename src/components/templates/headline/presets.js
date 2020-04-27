import LaVanguardiaSVG from './logos/lavanguardia.svg'
import AbcSVG from './logos/abc.svg'
import Antena3SVG from './logos/antena3.svg'
import EldiarioSVG from './logos/eldiario.svg'
import LevanteSVG from './logos/levante.svg'
import LasprovinciasSVG from './logos/lasprovincias.svg'
import ElpaisSVG from './logos/elpais.svg'
import LasextaSVG from './logos/lasexta.svg'
import ApuntSVG from './logos/apunt.svg'
import SerSVG from './logos/ser.svg'
import ValenciaplazaSVG from './logos/valenciaplaza.svg'
import InformacionSVG from './logos/informacion.svg'
import VeinteMinutosSVG from './logos/20_minutos.svg'
import VeinteMinutosCardSVG from './logos/20_minutos_card.svg'
import LaVeuSVG from './logos/laveu.svg'
import EuropaPressSVG from './logos/europapress.svg'
import InfoLibreSVG from './logos/infolibre.svg'
import ElPeriodicoDeAquiPNG from './logos/elperiodicodeaqui.png'
import ValenciaExtraPNG from './logos/valencia-extra.png'
import ElPeriodicSVG from './logos/elperiodic.svg'
import ElConfidencialSVG from './logos/elconfidencial.svg'
import LaMarinaPlazaSVG from './logos/marinaplaza.svg'
import ElMundoSVG from './logos/elmundo.svg'
import NouHortaSVG from './logos/nou-horta.svg'
import CSInfoPNG from './logos/csinfo.png'
import CastellonPlazaPNG from './logos/castellon-plaza.png'
import AlicantePlazaPNG from './logos/alicante-plaza.png'
import CastelloTVPNG from './logos/castello-tv.png'
import MediterraneoCsPNG from './logos/mediterraneo-cs.png'
import ElMeridianoPNG from './logos/el-meridiano.png'

const sources = [
  {
    id: 'eldiario',
    name: 'eldiario.es',
    logo: EldiarioSVG,
    logoHeight: 24,
    fontFamily: 'Roboto Slab',
    color: '#235690'
  },
  {
    id: 'lavanguardia',
    name: 'La Vanguardia',
    logo: LaVanguardiaSVG,
    logoHeight: 18,
    fontFamily: 'Tiempos Headline',
    color: '#071C49'
  },
  {
    id: 'antena3',
    name: 'Antena 3',
    logo: Antena3SVG,
    logoHeight: 22,
    fontFamily: 'Roboto',
    color: '#ED7B38'
  },
  {
    id: 'abc',
    name: 'ABC',
    logo: AbcSVG,
    logoHeight: 20,
    fontFamily: 'Tiempos Headline',
    color: '#000'
  },
  {
    id: 'lasprovincias',
    name: 'Las Provincias',
    logo: LasprovinciasSVG,
    logoHeight: 18,
    fontFamily: 'Roboto',
    color: '#000'
  },
  {
    id: 'levante',
    name: 'Levante',
    logo: LevanteSVG,
    logoHeight: 20,
    fontFamily: 'Roboto Condensed',
    color: '#386998'
  },
  {
    id: 'apunt',
    name: 'À punt',
    logo: ApuntSVG,
    logoHeight: 28,
    fontFamily: 'Gotham',
    letterSpacing: '-0.5px',
    color: '#000'
  },
  {
    id: 'elpais',
    name: 'El País',
    logo: ElpaisSVG,
    logoHeight: 22,
    fontFamily: 'Tiempos Headline',
    color: '#1F4D80'
  },
  {
    id: 'lasexta',
    name: 'La Sexta',
    logo: LasextaSVG,
    logoHeight: 26,
    fontFamily: 'Roboto',
    color: '#63AB54'
  },
  {
    id: 'ser',
    name: 'Cadena Ser',
    logo: SerSVG,
    logoHeight: 24,
    fontFamily: 'Gotham',
    letterSpacing: '-0.5px',
    color: '#000'
  },
  {
    id: 'valenciaplaza',
    name: 'Valencia Plaza',
    logo: ValenciaplazaSVG,
    logoHeight: 26,
    fontFamily: 'Tiempos Headline',
    color: '#5881B4'
  },
  {
    id: 'informacion',
    name: 'Diario Información',
    logo: InformacionSVG,
    logoHeight: 24,
    fontFamily: 'Tiempos Headline',
    color: '#306E9B'
  },
  {
    id: '20minutos',
    name: '20 Minutos',
    logo: VeinteMinutosSVG,
    logoCard: VeinteMinutosCardSVG,
    logoHeight: 34,
    fontFamily: 'Helvetica, Arial',
    color: '#1C4295'
  },
  {
    id: 'laveu',
    name: 'La Veu',
    logo: LaVeuSVG,
    logoHeight: 24,
    fontFamily: 'Gotham',
    color: '#E83334'
  },
  {
    id: 'europapress',
    name: 'EuropaPress',
    logo: EuropaPressSVG,
    logoHeight: 18,
    fontFamily: 'Roboto Slab',
    color: '#BA261A'
  },
  {
    id: 'elmundo',
    name: 'El Mundo',
    logo: ElMundoSVG,
    logoHeight: 18,
    fontFamily: 'Tiempos Headline',
    color: '#6887A6'
  },
  {
    id: 'infolibre',
    name: 'InfoLibre',
    logo: InfoLibreSVG,
    logoHeight: 22,
    fontFamily: 'Georgia',
    color: '#B22726'
  },
  {
    id: 'elperiodicodeaqui',
    name: 'El Periódico de Aquí',
    logo: ElPeriodicoDeAquiPNG,
    logoHeight: 28,
    fontFamily: 'Tiempos Headline',
    color: '#AA3D3A'
  },
  {
    id: 'lamarinaplaza',
    name: 'La Marina Plaça',
    logo: LaMarinaPlazaSVG,
    logoHeight: 28,
    fontFamily: 'Tiempos Headline',
    color: '#146f9C'
  },
  {
    id: 'elconfidencial',
    name: 'El Confidencial',
    logo: ElConfidencialSVG,
    logoHeight: 24,
    fontFamily: 'Tiempos Headline',
    color: '#163A4D'
  },
  {
    id: 'elperiodic',
    name: 'elperiòdic.com',
    logo: ElPeriodicSVG,
    logoHeight: 24,
    fontFamily: 'Roboto Slab',
    color: '#364E79'
  },
  {
    id: 'valenciaextra',
    name: 'València Extra',
    logo: ValenciaExtraPNG,
    logoHeight: 24,
    fontFamily: 'Titillium Web',
    color: '#E3803B'
  },
  {
    id: 'castelloninformacion',
    name: 'Castellón Información',
    logo: CSInfoPNG,
    logoHeight: 28,
    fontFamily: 'Gotham',
    color: '#ED9A3E'
  },
  {
    id: 'castellotv',
    name: 'Televisó de Castelló',
    logo: CastelloTVPNG,
    logoHeight: 28,
    fontFamily: 'Gotham',
    color: '#0d8a50'
  },
  {
    id: 'alicanteplaza',
    name: 'Alicante Plaza',
    logo: AlicantePlazaPNG,
    logoHeight: 26,
    fontFamily: 'Tiempos Headline',
    color: '#5881B4'
  },
  {
    id: 'castellonplaza',
    name: 'Castellón Plaza',
    logo: CastellonPlazaPNG,
    logoHeight: 26,
    fontFamily: 'Tiempos Headline',
    color: '#5881B4'
  },
  {
    id: 'mediterraneoperiodico',
    name: 'El Periódico Mediterráneo',
    logo: MediterraneoCsPNG,
    logoHeight: 22,
    fontFamily: 'Roboto',
    color: '#104277'
  },
  {
    id: 'nouhorta',
    name: 'Nou Horta',
    logo: NouHortaSVG,
    logoHeight: 28,
    fontFamily: 'Roboto',
    color: '#1D1D1B'
  },
  {
    id: 'elmeridiano',
    name: 'El Meridiano Horta',
    logo: ElMeridianoPNG,
    logoHeight: 20,
    fontFamily: 'Roboto',
    color: '#00849e'
  }
]

export default sources
