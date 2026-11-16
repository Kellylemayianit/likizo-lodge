// Rates copied from amboselilikizolodge.com. Each plan: [single, double] (or [per house]).
export const PLANS = ['Full Board', 'Half Board', 'Bed & Breakfast', 'Bed Only'];

export const ROOMS = [
  {
    id: 'std', name: 'Standard Room', img: 'bed',
    info: '5×6 bed, coffee table, spacious bathroom',
    features: ['A 5×6 bed', 'Coffee table', 'Spacious bathroom'],
    rates: {
      r: [[6500, 8500], [5500, 6500], [4000, 5000], [3500, 4000]],
      n: [[70, 80], [60, 70], [50, 60], [40]]
    },
    note: 'Rates are per person.'
  },
  {
    id: 'ste', name: 'Executive Suite / Cabin', img: 'cabin',
    info: 'Two 5×6 beds, bathtub, airy room',
    features: ['Two 5×6 beds', 'Bathtub', 'Airy, light-filled room', 'Coffee table'],
    rates: {
      r: [[10000, 15000], [8000, 13000], [5000, 10000], [6000, 8000]],
      n: [[80, 150], [70, 130], [60, 100], [50]]
    },
    note: 'Per person. Extra bed KSh 2,500 per child.'
  },
  {
    id: 'vip', name: 'VIP Family House', img: 'cottage', house: true,
    info: 'Own living room, separate master bedroom, kitchen',
    features: ['Two beds', 'Own living room', 'Separate master bedroom', 'Kitchen', 'Coffee table'],
    rates: { r: [[18000], [16000], [14000], [12000]], n: [[250], [200], [160], [100]] },
    note: 'Per house. Extra bed USD 25 per child.'
  }
];

export const EXTRAS = [
  ['Pool day pass, adults', 'KSh 500'],
  ['Pool day pass, kids', 'KSh 350'],
  ['Conference package, per person', 'KSh 2,500'],
  ['Extra bed, per child (suite / cabin)', 'KSh 2,500'],
  ['Extra bed, per child (VIP house)', 'USD 25']
];
