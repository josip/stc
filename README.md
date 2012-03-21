# Simple, tiny & cute.js

A charting library for JavaScript.
_Please visit [http://josip.github.com/stc](http://josip.github.com/stc) for more details._

## Usage
To use STC, just initialise the class and call the `plot` method once you get a hold on the data.

    var chart = new STC(canvasElement.getContext('2d'), {
      w: width,
      h: height
    });

The data should be an array consisting of X and Y coordinates and an optional label (currently only shown when `point` chart is in use).

    chart.plot([
      [0, 0, '0'],
      [0, 1, '1'],
      [1, 0, '2'],
      [1, 1, '3']
    ], {
      type: 'area'
    });

### Options
Class constructor takes the following options:

  * `w`: width of the canvas element (required)
  * `h`: height of the element (required)
  * `padding`: padding from all the sides (defaults to 20)
  * `axes` | `grid` | `background`: canvas gradient or a colour in which the axes/grid/background should be drawn. `false` if you don't want them.

### Using with QML
STC was primarily built for [qmlcanvas](http://qt.gitorious.org/qt-labs/qmlcanvas) and use on mobile phones. Using it with QML should be as simple as with HTML.

    import "stc.qml.js" as STC

    Canvas {
      id: canvas

      onPaint: {
        var c = new STC.STC(getContext(), {
          w: width,
          h: height
        });

        fetchDataFromSQLiteDB(function (data) {
          c.plot(d, {axes: false})
        });
      }
    }

To enable interactivity on the graph, you can create a `MouseArea` over the canvas and combine two helper methods:

  * `closestPtX([x, y])`: returns the point closes to the given (absolute) coordinates
  * `ptToCoords([x, y])`: returns absolute coordinates (for use with QML) of the given point (relative)

Please note that saving the `STC` object into a QML property will not work because QML destroys object's prototype chain.
