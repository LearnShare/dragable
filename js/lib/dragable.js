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
      step: config.step
          || 1
    };

    self.config.target.addEventListener('dragstart', function(e) {
    }, false);

    self.config.parent.addEventListener('dragover', function(e) {
      e.preventDefault();
    }, false);
    self.config.parent.addEventListener('dragleave', function(e) {
      e.preventDefault();
    }, false);
    self.config.parent.addEventListener('drop', function(e) {
      e.preventDefault();
    }, false);
  }

  return Dragable;
})();
