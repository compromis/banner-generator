import twitter from './logos/channels/twitter.svg'
import facebook from './logos/channels/facebook.svg'
import youtube from './logos/channels/youtube.svg'
import instagram from './logos/channels/instagram.svg'
import twitch from './logos/channels/twitch.svg'

const xarxes =
  {
    name: 'Xarxes Socials',
    channels: [
      {
        id: 'twitter',
        name: 'Twitter',
        logo: twitter,
        color: '#1da1f2',
        programmes: []
      },
      {
        id: 'instagram',
        name: 'Instagram',
        logo: instagram,
        color: 'linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)',
        programmes: []
      },
      {
        id: 'youtube',
        name: 'Youtube',
        logo: youtube,
        color: 'red',
        programmes: []
      },
      {
        id: 'facebook',
        name: 'Facebook',
        logo: facebook,
        color: '#1778F2',
        programmes: []
      },
      {
        id: 'twitch',
        name: 'Twitch',
        logo: twitch,
        color: '#673b8f',
        programmes: []
      }
    ]
  }

export default xarxes
