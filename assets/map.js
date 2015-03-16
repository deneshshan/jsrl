Game.Map = function(tiles) {
  var _tiles = tiles;
  var _width = tiles.length;
  var _height = tiles[0].length;
  return {
    getWidth: function() {
      return _width;
    },
    getHeight: function() {
      return _height;
    },
    getTile: function(x, y) {
      if(x < 0 || x >= _width || y < 0 || y>= _height)
        return Game.Tile.nullTile;
      else
        return _tiles[x][y] || Game.Tile.nullTile;
    }
  };
}
