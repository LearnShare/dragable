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
          || '',
      inRect: config.inRect
          || false
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

    self.targetRect = self.config.target.getBoundingClientRect();
    self.parentRect = self.config.parent.getBoundingClientRect();

    var x = dx,
        y = dy;

    if(self.config.direction == 'x') {
      y = 0;
    }else if(self.config.direction == 'y') {
      x = 0;
    }

    var left = self.config.target.offsetLeft
        || 0,
        top = self.config.target.offsetTop
        || 0;

    left = left + x;
    top = top + y;

    // rect check
    if(self.config.inRect) {
      // left
      if(self.targetRect.width
          + left
          > self.parentRect.width) {
        left = self.parentRect.width
            - self.targetRect.width;
      }
      if(left < 0) {
        left = 0;
      }
      // top
      // left
      if(self.targetRect.height
          + top
          > self.parentRect.height) {
        top = self.parentRect.height
            - self.targetRect.height;
      }
      if(top < 0) {
        top = 0;
      }
    }

    self.config.target.style.left = left + 'px';
    self.config.target.style.top = top + 'px';
  };

  return Dragable;
})();
