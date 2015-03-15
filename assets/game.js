var Game = function() {
  var _display = new ROT.Display({ width: 80, height: 24 });
  var _currentScreen = null;
  var bindEventToScreen = function(event) {
    window.addEventListener(event, function(e) {
      if(_currentScreen !== null) {
        _currentScreen.handleInput(event, e);
      }
    });
  };
  bindEventToScreen('keydown');
  bindEventToScreen('keyup');
  bindEventToScreen('keypress');
  return {
    getDisplay: function() { return _display; },
    switchScreen: function(screen) {
      if(_currentScreen !== null) {
        _currentScreen.exit();
      }
      _display.clear();
      _currentScreen = screen;
      if(_currentScreen !== null) {
        _currentScreen.enter();
        _currentScreen.render(_display);
      }
    }
  };
}();

window.onload = function() {
  if (!ROT.isSupported) {
    alert("The rot.js library isn't supported in your browser");
  } else {
    document.body.appendChild(Game.getDisplay().getContainer());
    Game.switchScreen(Game.Screen.startScreen); 
  }
};
