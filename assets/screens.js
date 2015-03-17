Game.Screen = (function() {
  return {
    startScreen: {
      enter: function() { console.log("Entered start screen"); },
      exit: function() { console.log("Exited start screen"); },
      render: function(display) {
        display.drawText(1,1, "%c{yellow}JavaScript Roguelike");
        display.drawText(1,2, "Press [Enter] to start!");
      },
      handleInput: function(inputType, inputData) {
        if (inputType === 'keydown') {
          if (inputData.keyCode === ROT.VK_RETURN) {
            Game.switchScreen(Game.Screen.playScreen);
          }
        }
      }
    },
    playScreen: (function() {
      var map = [];
      var _game_map = [];

      return { 
        enter: function() { 
          console.log("Entered play screen"); 
          for(var x = 0; x < 80; x++) {
            map.push([]);
            for(var y = 0; y < 24; y++) {
              map[x].push(Game.TileMap.map());
            }
          }
          var generator = new ROT.Map.Cellular(80, 24);
          generator.randomize(0.5);
          var _totalIterations = 3;
          for(var i = 0; i < _totalIterations -1; i++) {
            generator.create();
          }
          generator.create(function(x, y, v) {
            if(v === 1) {
              map[x][y] = Game.TileMap.map('.');
            } else {
              map[x][y] = Game.TileMap.map('#');
            }
          });
          _game_map = new Game.Map(map);
        },
        exit: function() { console.log("Exited play screen"); },
        render: function(display) {
          for(var x = 0; x < _game_map.getWidth(); x++) {
            for(var y = 0; y < _game_map.getHeight(); y++) {
              var glyph = _game_map.getTile(x, y).getGlyph();
              display.draw(x, y, glyph.getChar(), glyph.getForeground(), glyph.getBackground());
            }
          }
          console.log("hi");
        },
        handleInput: function(inputType, inputData) {
        }
      };

    })()
  };
})();
