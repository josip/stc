(function () {
var header = document.getElementById('chart'),
    hctx = header.getContext('2d'),
    hc = new STC(hctx, {
      w: 800,
      h: 140,
      padding: 0.0001,
      axes: false,
      background: false, //'#DEDFDE',
      grid: false// '#c5d6ee'
    }),
    m = 2,
    charts = {};
charts.heart = [
  [3.7, 6,   '2'],
  [4,   7.5, '3'],
  [5,   1,   '1'],
  [5,   6,   '4'],
  [6,   7.5, '5'],
  [6.3, 6,   '6'],
  [10,  9,   '<3']
];
charts.waves = [
  [0,   4, '1'],
  [0.5, 2.5, '2'],
  [1,   4, '3'],
  [1.5, 2.6, '4'],
  [2,   4, '5'],
  [2.5, 2.7, '6'],
  [3,   4, '7'],
  [3.5, 2.8, '8'],
  [4,   4, '9'],
  [4.5, 2.9, '10'],
  [5,   4, '11'],
  [5.5, 3, '12'],
  [6,   4, '13'],
  [6.5, 3, '14'],
  [7,   4, '15'],
  [7.5, 3, '16'],
  [8,   4, '17'],
  [8.5, 3, '18'],
  [9,   2, '19'],
  [9.5, 3, '20'],
  [9.78, 5, '21'],
  [9.5,  7, '22'],
  [9.25, 5, '23'],
  [9.15, 6.5, '24'],
  [9.35, 9, '25'],
  [9.78, 8, '26'],
  [10, 10, '<3']
];
charts.hai = [
  // H
  [m + 1,  1,  '2'],
  [m + 1,  9,  '1'],
  [m + 1,  5,  '3'],
  [m + 2,  5,  '4'],
  [m + 2,  9,  '5'],
  [m + 2,  1,  '6.'],

  // A
  [m + 3,     1,  '7'],
  [m + 3.5,   9,  '8'],
  [m + 4,     1,  '9'],
  [m + 3.75,  5,  '10'],
  [m + 3.25,  5,  '11.'],

  // I
  [m + 5,  1, '13.'],
  [m + 5,  8, '12'],
  [m + 5,  9, '14.'],


  [10,  10,   '<3']
];
charts.triglav = [
  [0.1, 0.5, '1'],
  [4.2, 4, '2'],
  [4.5, 3.5, '3/5'],
  [5, 2.5, '4.'],
  [5, 6, '6'],
  [5.3, 5, '7.'],
  [5.1, 4, '8'],
  [5.5, 5.5, '9'],
  [6, 3.5, '10'],
  [9.75, 0.5, '11'],
  [10, 7, '<3']
];
var chartsN = ['heart', 'waves', 'hai', 'triglav'];
hc.plot(charts[chartsN[Math.floor(Math.random() * chartsN.length)]]);

var _header_down = false,
    last_pos = [],
    _last_pos = [],
    hi;
header.onmousedown = function (e) {
  _header_down = true;
  _last_pos = [];
  hi = setInterval(mouseTracker, 20);
  e.preventDefault();
};
header.onmouseup = header.onmouseout = function () {
  clearInterval(hi);
  _header_down = false;
  _last_pos = [];
};
header.onmousemove = function (e) {
  if(!_header_down) return;
  last_pos = [e.offsetX, e.offsetY];
};
var mouseTracker = function () {
  if(!last_pos) return;

  hctx.strokeStyle = '#000';
  hctx.lineWidth = 2;
  hctx.beginPath();
  hctx.moveTo(_last_pos[0] || last_pos[0], _last_pos[1] || last_pos[1]);
  hctx.lineTo(last_pos[0], last_pos[1]);
  _last_pos = last_pos;
  last_pos = null;
  hctx.stroke();
};

var footer = document.getElementById('triglav'),
    fc = new STC(footer.getContext('2d'), {
      w: 800,
      h: 140,
      padding: 0.0001,
      axes: false,
      background: false, //'#DEDFDE',
      grid: false
    });
fc.plot([
      [0, 0],
      [4.2, 4],
      [4.5, 3.5],
      [5, 6],
      [5.3, 5],
      [5.5, 5.5],
      [10, 0]
  ], {
  type: 'area',
  fill: '#fff'
});

document.getElementById('save').onclick = function () {
  window.open(header.toDataURL(), '_blank', 'width=800,height=140');
}
})();
