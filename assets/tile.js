Game.Tile = function(glyph) {
  var _glyph = glyph;
  return {
    getGlyph: function() {
      return _glyph;
    }
  };
};

Game.Tile.nullTile = new Game.Tile(new Game.Glyph());
Game.Tile.floorTile = new Game.Tile(new Game.Glyph('.'));
Game.Tile.wallTile = new Game.Tile(new Game.Glyph('#', 'goldenrod'));
