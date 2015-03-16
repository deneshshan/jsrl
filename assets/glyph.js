Game.Glyph = function(chr, foreground, background) {
  var _char = chr || ' ';
  var _foreground = foreground || 'white';
  var _background = background || 'black';

  return {
    getChar: function() {
      return _char;
    },
    getBackground: function() {
      return _background;
    },
    getForeground: function() {
      return _foreground;
    }
  };
};
