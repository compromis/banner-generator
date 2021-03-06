export default [
  {
    id: 'Headline',
    name: 'Titular de premsa',
    aspects: ['11', '916', '169'],
    icon: 'newspaper',
    components: {
      pane: () => import(/* webpackChunkName: "headline" */ './headline/HeadlinePane'),
      canvas: () => import(/* webpackChunkName: "headline" */ './headline/HeadlineCanvas'),
      help: () => import(/* webpackChunkName: "headline" */ './headline/HeadlineHelp')
    }
  },
  {
    id: 'Generic',
    name: 'Frase',
    aspects: ['11', '916', '169'],
    supports: ['multicolor-blobs'],
    icon: 'font',
    components: {
      pane: () => import(/* webpackChunkName: "generic" */ './generic/GenericPane'),
      canvas: () => import(/* webpackChunkName: "generic" */ './generic/GenericCanvas'),
      help: () => import(/* webpackChunkName: "generic" */ './generic/GenericHelp')
    }
  },
  {
    id: 'Text',
    name: 'Text lliure',
    aspects: ['11', '916', '169'],
    supports: ['multicolor-blobs'],
    icon: 'align-left',
    components: {
      pane: () => import(/* webpackChunkName: "text" */ './text/TextPane'),
      canvas: () => import(/* webpackChunkName: "text" */ './text/TextCanvas'),
      help: () => import(/* webpackChunkName: "text" */ './text/TextHelp')
    }
  },
  {
    id: 'Quote',
    name: 'Cita',
    aspects: ['11', '916', '169'],
    supports: ['multicolor-blobs'],
    icon: 'quote-left',
    components: {
      pane: () => import(/* webpackChunkName: "quote" */ './quote/QuotePane'),
      canvas: () => import(/* webpackChunkName: "quote" */ './quote/QuoteCanvas'),
      help: () => import(/* webpackChunkName: "quote" */ './quote/QuoteHelp')
    }
  },
  {
    id: 'Chart',
    name: 'Gràfica',
    aspects: ['11', '169'],
    label: '✨Nou',
    icon: 'chart-bar',
    components: {
      pane: () => import(/* webpackChunkName: "chart" */ './chart/ChartPane'),
      canvas: () => import(/* webpackChunkName: "chart" */ './chart/ChartCanvas'),
      help: () => import(/* webpackChunkName: "chart" */ './chart/ChartHelp')
    }
  },
  {
    id: 'CompareParty',
    name: 'Compara partits',
    aspects: ['11'],
    icon: 'columns',
    components: {
      pane: () => import(/* webpackChunkName: "compare-party" */ './compare-party/ComparePartyPane'),
      canvas: () => import(/* webpackChunkName: "compare-party" */ './compare-party/ComparePartyCanvas'),
      help: () => import(/* webpackChunkName: "compare-party" */ './compare-party/ComparePartyHelp')
    }
  },
  {
    id: 'CompareHeadline',
    name: 'Compara titulars',
    aspects: ['11'],
    icon: 'table-rows',
    components: {
      pane: () => import(/* webpackChunkName: "compare-headline" */ './compare-headline/CompareHeadlinePane'),
      canvas: () => import(/* webpackChunkName: "compare-headline" */ './compare-headline/CompareHeadlineCanvas'),
      help: () => import(/* webpackChunkName: "compare-headline" */ './compare-headline/CompareHeadlineHelp')
    }
  },
  {
    id: 'Cards',
    name: 'Graella',
    aspects: ['11'],
    label: '✨Nou',
    icon: 'grip-horizontal',
    components: {
      pane: () => import(/* webpackChunkName: "cards" */ './cards/CardsPane'),
      canvas: () => import(/* webpackChunkName: "cards" */ './cards/CardsCanvas'),
      help: () => import(/* webpackChunkName: "cards" */ './cards/CardsHelp')
    }
  },
  {
    id: 'FakeNews',
    name: 'Bulo',
    aspects: ['11', '916'],
    icon: 'ban',
    components: {
      pane: () => import(/* webpackChunkName: "fakenews" */ './fakenews/FakeNewsPane'),
      canvas: () => import(/* webpackChunkName: "fakenews" */ './fakenews/FakeNewsCanvas'),
      help: () => import(/* webpackChunkName: "fakenews" */ './fakenews/FakeNewsHelp')
    }
  },
  {
    id: 'Milestone',
    name: 'Aconseguiment',
    aspects: ['11', '916'],
    icon: 'check-circle',
    components: {
      pane: () => import(/* webpackChunkName: "milestone" */ './milestone/MilestonePane'),
      canvas: () => import(/* webpackChunkName: "milestone" */ './milestone/MilestoneCanvas'),
      help: () => import(/* webpackChunkName: "milestone" */ './milestone/MilestoneHelp')
    }
  },
  {
    id: 'Tweet',
    name: 'Tweet',
    aspects: ['11'],
    icon: 'twitter',
    iconPack: 'fab',
    components: {
      pane: () => import(/* webpackChunkName: "tweet" */ './tweet/TweetPane'),
      canvas: () => import(/* webpackChunkName: "tweet" */ './tweet/TweetCanvas'),
      help: () => import(/* webpackChunkName: "tweet" */ './tweet/TweetHelp')
    }
  },
  {
    id: 'Media',
    name: 'Mitjans',
    aspects: ['11', '916'],
    icon: 'broadcast-tower',
    components: {
      pane: () => import(/* webpackChunkName: "media" */ './media/MediaPane'),
      canvas: () => import(/* webpackChunkName: "media" */ './media/MediaCanvas'),
      help: () => import(/* webpackChunkName: "media" */ './media/MediaHelp')
    }
  },
  {
    id: 'Event',
    name: 'Acte amb foto',
    aspects: ['11', '916', 'event'],
    supports: ['multicolor-blobs'],
    icon: 'portrait',
    components: {
      pane: () => import(/* webpackChunkName: "event" */ './event/EventPane'),
      canvas: () => import(/* webpackChunkName: "event" */ './event/EventCanvas'),
      help: () => import(/* webpackChunkName: "event" */ './event/EventHelp')
    }
  },
  {
    id: 'Speakers',
    name: 'Acte amb ponents',
    aspects: ['11', '916', 'event'],
    supports: ['multicolor-blobs'],
    icon: 'keynote',
    components: {
      pane: () => import(/* webpackChunkName: "speakers" */ './speakers/SpeakersPane'),
      canvas: () => import(/* webpackChunkName: "speakers" */ './speakers/SpeakersCanvas'),
      help: () => import(/* webpackChunkName: "speakers" */ './speakers/SpeakersHelp')
    }
  },
  {
    id: 'Social',
    name: 'Icona per a Xarxes',
    aspects: ['11'],
    icon: 'user-circle',
    components: {
      pane: () => import(/* webpackChunkName: "social" */ './social/SocialPane'),
      canvas: () => import(/* webpackChunkName: "social" */ './social/SocialCanvas'),
      help: () => import(/* webpackChunkName: "social" */ './social/SocialHelp')
    }
  },
  {
    id: 'Video',
    name: 'Miniatura de vídeo',
    aspects: ['11', '916', 'event'],
    icon: 'play',
    components: {
      pane: () => import(/* webpackChunkName: "videocover" */ './videocover/VideoCoverPane'),
      canvas: () => import(/* webpackChunkName: "videocover" */ './videocover/VideoCoverCanvas'),
      help: () => import(/* webpackChunkName: "videocover" */ './videocover/VideoCoverHelp')
    }
  },
  {
    id: 'Ivace',
    name: 'IVACE',
    aspects: ['11'],
    archived: true,
    icon: 'euro-sign',
    components: {
      pane: () => import(/* webpackChunkName: "ivace" */ './ivace/IvacePane'),
      canvas: () => import(/* webpackChunkName: "ivace" */ './ivace/IvaceCanvas'),
      help: () => import(/* webpackChunkName: "ivace" */ './ivace/IvaceHelp')
    }
  },
  {
    id: 'Resisteix',
    name: 'Pla Resisteix',
    aspects: ['11'],
    icon: 'euro-sign',
    label: '🦠Covid-19',
    archived: true,
    components: {
      pane: () => import(/* webpackChunkName: "resisteix" */ './resisteix/ResisteixPane'),
      canvas: () => import(/* webpackChunkName: "resisteix" */ './resisteix/ResisteixCanvas'),
      help: () => import(/* webpackChunkName: "resisteix" */ './resisteix/ResisteixHelp')
    }
  },
  {
    id: 'Labora',
    name: 'Labora ECOVID',
    aspects: ['11'],
    icon: 'euro-sign',
    label: '🦠Covid-19',
    archived: true,
    components: {
      pane: () => import(/* webpackChunkName: "labora" */ './archived/labora/LaboraPane'),
      canvas: () => import(/* webpackChunkName: "labora" */ './archived/labora/LaboraCanvas'),
      help: () => import(/* webpackChunkName: "labora" */ './archived/labora/LaboraHelp')
    }
  },
  {
    id: 'Superavit',
    name: 'Superàvit local',
    aspects: ['11'],
    icon: 'euro-sign',
    label: '🦠Covid-19',
    archived: true,
    components: {
      pane: () => import(/* webpackChunkName: "archived" */ './archived/superavit/SuperavitPane'),
      canvas: () => import(/* webpackChunkName: "archived" */ './archived/superavit/SuperavitCanvas'),
      help: () => import(/* webpackChunkName: "archived" */ './archived/superavit/SuperavitHelp')
    }
  },
  {
    id: 'ChristmasGreetings',
    name: 'Felicitació',
    aspects: ['11', '916'],
    icon: 'hat-santa',
    label: '🎄Nadal',
    archived: true,
    components: {
      pane: () => import(/* webpackChunkName: "christmas" */ './archived/christmas-greetings/ChristmasGreetingsPane'),
      canvas: () => import(/* webpackChunkName: "christmas" */ './archived/christmas-greetings/ChristmasGreetingsCanvas'),
      help: () => import(/* webpackChunkName: "christmas" */ './archived/christmas-greetings/ChristmasGreetingsHelp')
    }
  },
  {
    id: 'Christmas',
    name: 'Comerç Local',
    aspects: ['11', '916'],
    icon: 'gifts',
    label: '🎄Nadal',
    archived: true,
    components: {
      pane: () => import(/* webpackChunkName: "christmas" */ './archived/christmas/ChristmasPane'),
      canvas: () => import(/* webpackChunkName: "christmas" */ './archived/christmas/ChristmasCanvas'),
      help: () => import(/* webpackChunkName: "christmas" */ './archived/christmas/ChristmasHelp')
    }
  }
]
