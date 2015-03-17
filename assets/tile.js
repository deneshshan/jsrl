Game.Tile = function(glyph) {
  var _glyph = glyph;
  return {
    getGlyph: function() {
      return _glyph;
    }
  };
};

Game.TileMap = (function() {
  var _map = { };
  var _null = new Game.Tile(new Game.Glyph());
  _map['.'] = new Game.Tile(new Game.Glyph('.'));
  _map['#'] = new Game.Tile(new Game.Glyph('#', 'goldenrod'));
  return {
    map: function(code) {
      if(code) {
        return _map[code];
      } else {
        return _null;
      }
    }
  };
})();
