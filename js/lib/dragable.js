var Dragable = (function() {
  function Dragable(config) {
    var self = this;

    if(!config
        || !config.target) {
      return;
    }

    self.config = {
      target: config.target,
      parent: config.parent
          || config.target.parentNode,
      direction: config.direction
          || ''
    };

    self.mousedown = false;
    self.point = {
      x: 0,
      y: 0
    };

    self.addEventListeners();
  }

  Dragable.prototype.addEventListeners = function() {
    var self = this;

    // mousedown
    self.config.target.addEventListener('mousedown', function(e) {
      // console.log('mousedown');
      self.mousedown = true;
      self.point = {
        x: e.screenX,
        y: e.screenY
      };
      // console.log(self.point);
    }, false);
    // mousemove
    self.config.target.addEventListener('mousemove', function(e) {
      if(self.mousedown) {
        // console.log('mousemove');
        // console.log(e);
        var dx = e.screenX - self.point.x,
            dy = e.screenY - self.point.y;

        // self.move(dx, dy);
        self.move(e.movementX, e.movementY);

        self.point = {
          x: e.screenX,
          y: e.screenY
        };
        // console.log(self.point);
      }
    }, false);
    // mouseup
    self.config.target.addEventListener('mouseup', function(e) {
      // console.log('mouseup');

      self.mousedown = false;
    }, false);
    // mouseout
    self.config.target.addEventListener('mouseout', function(e) {
      // console.log('mouseout');

      self.mousedown = false;
    }, false);
  };

  Dragable.prototype.move = function(dx, dy) {
    var self = this;

    var x = dx,
        y = dy;

    if(self.config.direction == 'x') {
      y = 0;
    }else if(self.config.direction == 'y') {
      x = 0;
    }

    console.log('move', x, y);

    var left = self.config.target.offsetLeft
        || 0,
        top = self.config.target.offsetTop
        || 0;
    console.log(left, top);
    self.config.target.style.left = (left + x) + 'px';
    self.config.target.style.top = (top + y) + 'px';
  };

  return Dragable;
})();
