import LaVanguardiaSVG from './logos/lavanguardia.svg'
import AbcSVG from './logos/abc.svg'
import Antena3SVG from './logos/antena3.svg'
import EldiarioSVG from './logos/eldiario.svg'
import LevanteSVG from './logos/levante.svg'
import LasprovinciasSVG from './logos/lasprovincias.svg'
import ElpaisSVG from './logos/elpais.svg'
import PublicoPNG from './logos/publico.png'
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
import ActualitatValencianaPNG from './logos/actualitat-valenciana.png'

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
    logo: EldiarioSVG,
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#235690'
  },
  {
    id: 'lavanguardia',
    name: 'La Vanguardia',
    logo: LaVanguardiaSVG,
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#071C49'
  },
  {
    id: 'antena3',
    name: 'Antena 3',
    logo: Antena3SVG,
    logoHeight: 22,
    font: fonts.roboto,
    color: '#ED7B38'
  },
  {
    id: 'abc',
    name: 'ABC',
    logo: AbcSVG,
    logoHeight: 20,
    font: fonts.tiemposHeadline,
    color: '#000'
  },
  {
    id: 'lasprovincias',
    name: 'Las Provincias',
    logo: LasprovinciasSVG,
    logoHeight: 18,
    font: fonts.roboto,
    color: '#000'
  },
  {
    id: 'levante',
    name: 'Levante',
    logo: LevanteSVG,
    logoHeight: 20,
    font: fonts.gotham,
    color: '#386998'
  },
  {
    id: 'apunt',
    name: 'À punt',
    logo: ApuntSVG,
    logoHeight: 28,
    font: fonts.gotham,
    color: '#000'
  },
  {
    id: 'elpais',
    name: 'El País',
    logo: ElpaisSVG,
    logoHeight: 22,
    font: fonts.tiemposHeadline,
    color: '#1F4D80'
  },
  {
    id: 'publico',
    name: 'Público',
    logo: PublicoPNG,
    logoHeight: 22,
    font: fonts.tiemposHeadline,
    color: '#d11031'
  },
  {
    id: 'lasexta',
    name: 'La Sexta',
    logo: LasextaSVG,
    logoHeight: 26,
    font: fonts.roboto,
    color: '#63AB54'
  },
  {
    id: 'ser',
    name: 'Cadena Ser',
    logo: SerSVG,
    logoHeight: 20,
    font: fonts.gotham,
    color: '#000'
  },
  {
    id: 'valenciaplaza',
    name: 'Valencia Plaza',
    logo: ValenciaplazaSVG,
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'informacion',
    name: 'Diario Información',
    logo: InformacionSVG,
    logoHeight: 24,
    font: fonts.tiemposHeadline,
    color: '#306E9B'
  },
  {
    id: '20minutos',
    name: '20 Minutos',
    logo: VeinteMinutosSVG,
    logoCard: VeinteMinutosCardSVG,
    logoHeight: 34,
    font: fonts.helvetica,
    color: '#1C4295'
  },
  {
    id: 'laveu',
    name: 'La Veu',
    logo: LaVeuSVG,
    logoHeight: 24,
    font: fonts.gotham,
    color: '#E83334'
  },
  {
    id: 'europapress',
    name: 'EuropaPress',
    logo: EuropaPressSVG,
    logoHeight: 18,
    font: fonts.roboto,
    color: '#BA261A'
  },
  {
    id: 'elmundo',
    name: 'El Mundo',
    logo: ElMundoSVG,
    logoHeight: 18,
    font: fonts.tiemposHeadline,
    color: '#6887A6'
  },
  {
    id: 'infolibre',
    name: 'InfoLibre',
    logo: InfoLibreSVG,
    logoHeight: 22,
    font: fonts.georgia,
    color: '#B22726'
  },
  {
    id: 'elperiodicodeaqui',
    name: 'El Periódico de Aquí',
    logo: ElPeriodicoDeAquiPNG,
    logoHeight: 28,
    font: fonts.tiemposHeadline,
    color: '#AA3D3A'
  },
  {
    id: 'lamarinaplaza',
    name: 'La Marina Plaça',
    logo: LaMarinaPlazaSVG,
    logoHeight: 28,
    font: fonts.tiemposHeadline,
    color: '#146f9C'
  },
  {
    id: 'elconfidencial',
    name: 'El Confidencial',
    logo: ElConfidencialSVG,
    logoHeight: 24,
    font: fonts.tiemposHeadline,
    color: '#163A4D'
  },
  {
    id: 'elperiodic',
    name: 'elperiòdic.com',
    logo: ElPeriodicSVG,
    logoHeight: 24,
    font: fonts.roboto,
    color: '#364E79'
  },
  {
    id: 'valenciaextra',
    name: 'València Extra',
    logo: ValenciaExtraPNG,
    logoHeight: 24,
    font: fonts.titillium,
    color: '#E3803B'
  },
  {
    id: 'castelloninformacion',
    name: 'Castellón Información',
    logo: CSInfoPNG,
    logoHeight: 28,
    font: fonts.gotham,
    color: '#ED9A3E'
  },
  {
    id: 'castellotv',
    name: 'Televisó de Castelló',
    logo: CastelloTVPNG,
    logoHeight: 28,
    font: fonts.gotham,
    color: '#0d8a50'
  },
  {
    id: 'alicanteplaza',
    name: 'Alicante Plaza',
    logo: AlicantePlazaPNG,
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'castellonplaza',
    name: 'Castellón Plaza',
    logo: CastellonPlazaPNG,
    logoHeight: 26,
    font: fonts.tiemposHeadline,
    color: '#5881B4'
  },
  {
    id: 'mediterraneoperiodico',
    name: 'El Periódico Mediterráneo',
    logo: MediterraneoCsPNG,
    logoHeight: 22,
    font: fonts.roboto,
    color: '#104277'
  },
  {
    id: 'nouhorta',
    name: 'Nou Horta',
    logo: NouHortaSVG,
    logoHeight: 28,
    font: fonts.roboto,
    color: '#1D1D1B'
  },
  {
    id: 'elmeridiano',
    name: 'El Meridiano Horta',
    logo: ElMeridianoPNG,
    logoHeight: 20,
    font: fonts.roboto,
    color: '#00849e'
  },
  {
    id: 'actualitatvalenciana',
    name: 'Actualitat Valenciana',
    logo: ActualitatValencianaPNG,
    logoHeight: 20,
    font: fonts.roboto,
    color: '#d60b52'
  }
]

export default sources
