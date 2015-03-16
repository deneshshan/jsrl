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
              map[x].push(Game.Tile.nullTile);
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
              map[x][y] = Game.Tile.floorTile;
            } else {
              map[x][y] = Game.Tile.wallTile;
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
          if (inputType === 'keydown') {
            // If enter is pressed, go to the win screen
            // If escape is pressed, go to lose screen
            if (inputData.keyCode === ROT.VK_RETURN) {
              Game.switchScreen(Game.Screen.winScreen);
            } else if (inputData.keyCode === ROT.VK_ESCAPE) {
              Game.switchScreen(Game.Screen.loseScreen);
            }
          }  
        }
      };

    })(),
    winScreen: {
      enter: function() {    console.log("Entered win screen."); },
      exit: function() { console.log("Exited win screen."); },
      render: function(display) {
          // Render our prompt to the screen
          for (var i = 0; i < 22; i++) {
              // Generate random background colors
              var r = Math.round(Math.random() * 255);
              var g = Math.round(Math.random() * 255);
              var b = Math.round(Math.random() * 255);
              var background = ROT.Color.toRGB([r, g, b]);
              display.drawText(2, i + 1, "%b{" + background + "}You win!");
          }
      },
      handleInput: function(inputType, inputData) {
          // Nothing to do here      
      }
    },
    loseScreen: {
      enter: function() {    console.log("Entered lose screen."); },
      exit: function() { console.log("Exited lose screen."); },
      render: function(display) {
          // Render our prompt to the screen
          for (var i = 0; i < 22; i++) {
              display.drawText(2, i + 1, "%b{red}You lose! :(");
          }
      },
      handleInput: function(inputType, inputData) {
          // Nothing to do here      
      }
    }
  };
})();
