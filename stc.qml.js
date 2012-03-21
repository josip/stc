.pragma library

var __extend = function (a, b) { for(var p in b) a[p] = b[p]; return a; },
    __min = Math.min,
    __max = Math.max;

function STC (ctx, options) {
  this.ctx = ctx;
  this.options = options;
  this.__W = options.w;
  this.__H = options.h;
  this.__chartPadding = options.padding || 20;

  if(options.background !== false) this.__drawBackground();
  if(options.grid       !== false) this.__drawGrid();
  if(options.axes       !== false) this.__drawAxes();

  return this;
}

__extend(STC.prototype, {
  __drawBackground: function () {
    var c = this.ctx;
    c.fillStyle = this.options.background || '#fff';
    c.fillRect(0, 0, this.__W, this.__H);
  },
  __drawAxes: function () {
    var c = this.ctx,
        p = this.__chartPadding;
    c.strokeStyle = this.options.axes || "#585858";
    c.lineWidth = 2;

    c.beginPath();
    c.moveTo(p, p);
    c.lineTo(p, this.__H - p);
    c.lineTo(this.__W - p, this.__H - p);
    c.stroke();
    c.closePath();
  },
  __drawGrid: function () {
    var c = this.ctx,
        w = this.__W,
        h = this.__H,
        p = this.__chartPadding,
        d = this.options.gridSpacing || 20,
        n;

    c.strokeStyle = this.options.grid || '#c0c0c0';
    n = Math.ceil(w/d); // -1 for the padding
    while(n--) {
      c.beginPath();
      c.moveTo(d * n + 0.5, p);
      c.lineTo(d * n + 0.5, h - p);
      c.stroke();
      c.closePath();
    }

    n = Math.ceil(h/d);
    while(n--) {
      c.beginPath();
      c.moveTo(p,     d * n + 0.5);
      c.lineTo(w - p, d * n + 0.5);
      c.stroke();
      c.closePath();
    }
  },
  __distance: function (pt1, pt2) {
    return Math.sqrt(Math.pow(pt1[0] - pt2[0], 2) + Math.pow(pt1[1] - pt2[1], 2));
  },
  __translatePoint: function (pt) {
    var w = this.__W,
        h = this.__H,
        p = this.__chartPadding;

    return [__min(p + pt[0], w - p), __max(h - p - pt[1], p)];
  },
  __draw_point: function (pt, lbl, options) {
    var c = this.ctx,
        r = 10/2,
        x, y;

    pt = this.__translatePoint(pt);

    c.save();
    c.beginPath();
    c.fillStyle = options.fill;
    c.strokeStyle = options.stroke;
    c.lineWidth = 2;
    c.arc(x = pt[0], y = pt[1], r, 0, 2 * Math.PI, true);
    c.fill();

    if(lbl) {
      c.fillStyle = options.text;
      c.fillText(lbl, x + r + 2, y + 4);
    }

    c.restore();
  },
  __draw_area: function (pt, lbl, options) {
    var c = this.ctx,
        w = this.__W,
        h = this.__H,
        p = this.__chartPadding,
        o = this.__area_lastPt || [p, h - p];

    pt = this.__translatePoint(pt);

    c.save();
    c.beginPath();
    c.fillStyle = options.fill;
    c.strokeStyle = options.fill;

    c.moveTo(o[0], h-p);
    c.lineTo(o[0], o[1]);
    c.lineTo(pt[0], pt[1]);
    c.lineTo(pt[0], h-p);
    c.closePath();
    c.fill();
    c.restore();

    this.__area_lastPt = pt;
  },
  __draw_line: function (pt, lbl, options) {
    var c = this.ctx,
        w = this.__W,
        h = this.__H,
        p = this.__chartPadding,
        o = this.__line_lastPt;

    pt = this.__translatePoint(pt);
    if(!o) o = pt;

    c.save();
    c.beginPath();

    c.strokeStyle = options.fill;
    c.lineWidth = options.strokeWidth;
    c.moveTo(o[0], o[1]);
    c.lineTo(pt[0], pt[1]);
    c.stroke()

    c.restore();
    this.__line_lastPt = pt;
  },
  __ptSorter: function (a, b) {
    a = a[0];
    b = b[0];
    if(a > b) return -1;
    if(a < b) return  1;
              return  0;
  },

  plot: function (d, options) {
    if(!d.length) return;

    options = __extend({
      type:   'point',
      fill:   '#d93b3b',
      stroke: '#f00',
      text:   '#585858',
      strokeWidth: 2
    }, options || {});

    this.__data = d;
    var n = d.length,
        p = this.__chartPadding,
        ds = new Array(n),
        xs = new Array(n),
        ys = new Array(n),
        drawFn = '__draw_' + options.type,
        sx, sy, i;

    d.sort(this.__ptSorter);

    while(n--) {
      xs[n] = d[n][0];
      ys[n] = d[n][1];
    }

    this.__sx = sx = (this.__W - p)/(max.apply(null, xs) || 1);
    this.__sy = sy = (this.__H - p)/(max.apply(null, ys) || 1);

    n = d.length;
    while(n--) {
      i = d[n];
      this[drawFn]([sx * i[0], sy * i[1]], i[2], options);
    }
  },

  ptToCoords: function (pt) {
    var p = this.__chartPadding;
    return [__min(pt[0] * this.__sx + p, this.__W - p), __max(this.__H - p - pt[1] * this.__sy, p)];
  },
  closestPtX: function (x) {
    x = (x - this.__chartPadding)/this.__sx;
    var d = this.__data,
        n = d.length,
        ds = new Array(n);

    while(n--) ds[n] = Math.abs(x - d[n][0]);

    return d[ds.indexOf(min.apply(null, ds))];
  }
});
