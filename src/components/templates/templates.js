const templates = [
  {
    id: 'CampaignHeadline',
    name: 'Titular de premsa',
    aspects: ['11', '916'],
    icon: 'newspaper',
    isCampaign: true,
    components: {
      pane: () => import(/* webpackChunkName: "headline" */ './campaign-headline/CampaignHeadlinePane'),
      canvas: () => import(/* webpackChunkName: "headline" */ './campaign-headline/CampaignHeadlineCanvas'),
      help: () => import(/* webpackChunkName: "headline" */ './campaign-headline/CampaignHeadlineHelp')
    }
  },
  {
    id: 'CampaignGeneric',
    name: 'Frase',
    aspects: ['11', '916'],
    icon: 'font',
    isCampaign: true,
    components: {
      pane: () => import(/* webpackChunkName: "campaign-generic" */ './campaign-generic/CampaignGenericPane'),
      canvas: () => import(/* webpackChunkName: "campaign-generic" */ './campaign-generic/CampaignGenericCanvas'),
      help: () => import(/* webpackChunkName: "campaign-generic" */ './campaign-generic/CampaignGenericHelp')
    }
  },
  {
    id: 'CampaignQuote',
    name: 'Cita',
    aspects: ['11', '916'],
    icon: 'quote-left',
    isCampaign: true,
    components: {
      pane: () => import(/* webpackChunkName: "campaign-quote" */ './campaign-quote/CampaignQuotePane'),
      canvas: () => import(/* webpackChunkName: "campaign-quote" */ './campaign-quote/CampaignQuoteCanvas'),
      help: () => import(/* webpackChunkName: "campaign-quote" */ './campaign-quote/CampaignQuoteHelp')
    }
  },
  {
    id: 'CampaignEvent',
    name: 'Acte de campanya',
    aspects: ['11', '916', 'event'],
    icon: 'portrait',
    isCampaign: true,
    components: {
      pane: () => import(/* webpackChunkName: "campaign-event" */ './campaign-event/CampaignEventPane'),
      canvas: () => import(/* webpackChunkName: "campaign-event" */ './campaign-event/CampaignEventCanvas'),
      help: () => import(/* webpackChunkName: "campaign-event" */ './campaign-event/CampaignEventHelp')
    }
  },
  {
    id: 'CampaignSpeakers',
    name: 'Acte amb ponents',
    aspects: ['11', '916', 'event'],
    icon: 'keynote',
    isCampaign: true,
    components: {
      pane: () => import(/* webpackChunkName: "campaign-speakers" */ './campaign-speakers/CampaignSpeakersPane'),
      canvas: () => import(/* webpackChunkName: "campaign-speakers" */ './campaign-speakers/CampaignSpeakersCanvas'),
      help: () => import(/* webpackChunkName: "campaign-speakers" */ './campaign-speakers/CampaignSpeakersHelp')
    }
  },
  {
    id: 'Headline',
    name: 'Titular de premsa',
    aspects: ['11', '916'],
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
    aspects: ['11', '916'],
    icon: 'font',
    components: {
      pane: () => import(/* webpackChunkName: "generic" */ './generic/GenericPane'),
      canvas: () => import(/* webpackChunkName: "generic" */ './generic/GenericCanvas'),
      help: () => import(/* webpackChunkName: "generic" */ './generic/GenericHelp')
    }
  },
  {
    id: 'Quote',
    name: 'Cita',
    aspects: ['11', '916'],
    icon: 'quote-left',
    components: {
      pane: () => import(/* webpackChunkName: "quote" */ './quote/QuotePane'),
      canvas: () => import(/* webpackChunkName: "quote" */ './quote/QuoteCanvas'),
      help: () => import(/* webpackChunkName: "quote" */ './quote/QuoteHelp')
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
  }
]

export default templates
