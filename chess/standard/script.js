const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
  onDrop: onDrop
});

function onDrop(source, target) {
  console.log("onDrop");
   console.log(target);
  if (game.game_over()) return;

  const move = game.move({
    from: source,
    to: target,
    promotion: 'q' // promotion automatique en reine
  });

  if (move === null) return 'snapback';

  // Animation du coup joué par le joueur
  board.move({ from: source, to: target });

  if (game.game_over()) {
    showGameOverMessage();
    return;
  }

  window.setTimeout(() => {
    makeRandomMove();

    if (game.game_over()) {
      showGameOverMessage();
    }
  }, 250);
}

function makeRandomMove() {
  console.log("makeRandomMove");
  const moves = game.moves();
  console.log("Available moves:", moves);

  if (moves.length === 0) return;

  const move = moves[Math.floor(Math.random() * moves.length)];
  console.log("Chosen move:", move);

  const moveObj = game.move(move, { verbose: true });
  console.log("Result moveObj:", moveObj);

  if (!moveObj) return;

  board.move({ from: moveObj.from, to: moveObj.to });

  window.setTimeout(() => {
    board.position(game.fen());
  }, 300);
}

function showGameOverMessage() {
  if (game.in_checkmate()) {
    alert('Échec et mat !');
  } else if (game.in_stalemate()) {
    alert('Pat !');
  } else if (game.insufficient_material()) {
    alert('Matériel insuffisant pour mater !');
  } else if (game.in_draw()) {
    alert('Match nul !');
  } else {
    alert('Partie terminée !');
  }
}
