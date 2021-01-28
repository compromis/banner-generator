export default {
  availableColors: [
    '#FF6720', '#f79226', '#ffd10f', '#ef404d',
    '#c0382b', '#55a4db', '#2980b9', '#a14a9c',
    '#27af60', '#7fc347', '#1ca085', '#3d556e',
    '#222f3d', '#BDC3C8'
  ],
  colorDefaults: ['#FF6720', '#2980b9', '#7fc347', '#a14a9c', '#ffd10f', '#1ca085'],
  maxSets: {
    'bar-vertical': 4,
    'bar-horizontal': 4,
    'lines': 6,
    'pie': 1,
    'doughnut': 1,
    'farto': 1
  },
  maxRows: {
    'bar-vertical': 10,
    'bar-horizontal': 10,
    'lines': 40,
    'pie': 10,
    'doughnut': 10,
    'farto': 8
  },
  rowColorDisabled: {
    in: ['lines'],
    except: ['pie', 'doughnut', 'farto']
  },
  setColorDisabled: {
    in: ['pie', 'doughnut', 'farto']
  }
}
