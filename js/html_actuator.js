function HTMLActuator() {
  this.tileContainer    = document.querySelector(".tile-container");
  this.csContainer   = document.querySelector(".score-container");
  this.tsContainer   = document.querySelector(".tile-score-container")
  this.bestContainer    = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.cs = 0;
  this.ts = 0;
}

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    self.clearContainer(self.tileContainer);

    grid.cells.forEach(function (column) {
      column.forEach(function (cell) {
        if (cell) {
          self.addTile(cell);
        }
      });
    });

    self.updateScore(metadata);
    self.updateBestScore(metadata.bestScore);

    if (metadata.terminated) {
      if (metadata.over) {
        self.message(false); // You lose
      } else if (metadata.won) {
        self.message(true); // You win!
      }
    }

  });
};

HTMLActuator.prototype.renderCollection = function (collection) {
  var dollListP = document.getElementById('doll-list');
  
  var htmlBuild = []
  for (var name in collection) {
    if (collection[name]) {
      htmlBuild.push('<strong>' + name + '</strong>');
    } else {
      htmlBuild.push(name);
    }
  }
  dollListP.innerHTML = '<strong>Collected</strong>: ' + htmlBuild.join(', ');
}

// Continues the game (both restart and keep playing)
HTMLActuator.prototype.continueGame = function () {
  this.clearMessage();
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

HTMLActuator.prototype.addTile = function (tile) {
  var self = this;

  var wrapper   = document.createElement("div");
  var inner     = document.createElement("div");
  var position  = tile.previousPosition || { x: tile.x, y: tile.y };
  var positionClass = this.positionClass(position);

  // We can't use classlist because it somehow glitches when replacing classes
  var classes = ["tile", "tile-" + tile.value, positionClass];
  if (tile.value > 2048) classes.push("tile-super");

  this.applyClasses(wrapper, classes);

  inner.classList.add("tile-inner");
  inner.textContent = tile.value;

  if (tile.previousPosition) {
    // Make sure that the tile gets rendered in the previous position first
    window.requestAnimationFrame(function () {
      classes[2] = self.positionClass({ x: tile.x, y: tile.y });
      self.applyClasses(wrapper, classes); // Update the position
    });
  } else if (tile.mergedFrom) {
    classes.push("tile-merged");
    this.applyClasses(wrapper, classes);

    // Render the tiles that merged
    tile.mergedFrom.forEach(function (merged) {
      self.addTile(merged);
    });
  } else {
    classes.push("tile-new");
    this.applyClasses(wrapper, classes);
  }

  // Add the inner part of the tile to the wrapper
  wrapper.appendChild(inner);
  this.setBackground(inner, tile.getFileName());

  // Put the tile on the board
  this.tileContainer.appendChild(wrapper);
};

HTMLActuator.prototype.setBackground = function (element, fileName) {
  element.style.backgroundImage = "url('style/static/" + fileName + "')";
};

HTMLActuator.prototype.applyClasses = function (element, classes) {
  element.setAttribute("class", classes.join(" "));
};

HTMLActuator.prototype.normalizePosition = function (position) {
  return { x: position.x + 1, y: position.y + 1 };
};

HTMLActuator.prototype.positionClass = function (position) {
  position = this.normalizePosition(position);
  return "tile-position-" + position.x + "-" + position.y;
};

HTMLActuator.prototype.updateScoreContainer = function (container, difference, score) {
  this.clearContainer(container);
  container.textContent = score;


  if (difference > 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = "+" + difference;

    container.appendChild(addition);
  } else if (difference < 0) {
    var addition = document.createElement("div");
    addition.classList.add("score-addition");
    addition.textContent = difference;

    container.appendChild(addition);
  }
}

HTMLActuator.prototype.updateScore = function (metadata) {
  var cs = metadata.collectScore;
  var csDiff = cs - this.cs;
  this.cs = cs;
  this.updateScoreContainer(this.csContainer, csDiff, cs);

  var ts = metadata.tileScore;
  var tsDiff = ts - this.ts;
  this.ts = ts;
  this.updateScoreContainer(this.tsContainer, tsDiff, ts);

  this.updateBestScore(metadata.bestScore);
};


HTMLActuator.prototype.updateBestScore = function (bestScore) {
  this.bestContainer.textContent = bestScore;
};

HTMLActuator.prototype.message = function (won) {
  var type    = won ? "game-won" : "game-over";
  var message = won ? "You win!" : "Game over!";

  this.messageContainer.classList.add(type);
  this.messageContainer.getElementsByTagName("p")[0].textContent = message;
};

HTMLActuator.prototype.clearMessage = function () {
  // IE only takes one value to remove at a time.
  this.messageContainer.classList.remove("game-won");
  this.messageContainer.classList.remove("game-over");
};
