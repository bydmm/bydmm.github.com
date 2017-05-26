(function(){
  var QuantumCloud = {
    collapseCount: 0,
    canvas: document.getElementById("js-canvas"),
    now: function() {
      var d = new Date();
      return d.getTime() / 1000;
    },
    collapse: function() {
      var r = Math.sqrt(-2.0 * Math.log(Math.random()));
      var theta = 2.0 * Math.PI * Math.random();
      var point = {
        x: r * Math.cos(theta),
        y: r * Math.sin(theta)
      }
      return point;
    },
    canvasContext: function() {
      if (this.canvas.getContext) {
        return this.canvas.getContext("2d");
      } else {
        throw 'Could not get Canvas context';
      }
    },
    drawElectron: function(x, y, radius) {
      var ctx = this.canvasContext();
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI*2, true);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.01)';
      ctx.fill();
    },
    draw: function() {
      var point = this.collapse();
      var centerX = this.canvas.offsetWidth / 2;
      var centerY = this.canvas.offsetHeight / 2;
      var x = centerX + (centerX * point.x) / 4;
      var y = centerY + (centerY * point.y) / 4;
      this.drawElectron(x, y , 1);
    },
    animloop: function() {
      if(this.frame > this.frameLimit) return;
      this.collapseCount++;
      this.animloop();
      this.draw();
    },
    showStatistics: function() {
      var dom = document.getElementById("js-statistics");
      var cost = (this.now() - this.start).toFixed(2);
      dom.innerText = 'Collapse: ' + this.collapseCount.toLocaleString() + ' times, Cost: ' + cost + 's';
    },
    run: function(collapseLimit) {
      var self = this;
      self.start = this.now();
      // setInterval(function () {
      //   self.collapseCount++;
      //   self.draw();
      //   self.showStatistics();
      // }, 0);
      // booom...
      setTimeout(function () {
        for (var i = 0; i < collapseLimit; i++) {
          self.collapseCount++;
          self.draw();
        }
        self.showStatistics();
      }, 10);
    },
    init: function() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var size = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
      this.canvas.width = size * 0.8;
      this.canvas.height = this.canvas.width;
      var container = document.getElementById("js-canvas-container");
      container.style.paddingTop = (window.innerHeight - container.offsetHeight) / 2 + 'px';
    }
  }

  QuantumCloud.init();
  QuantumCloud.run(500000);
})()
