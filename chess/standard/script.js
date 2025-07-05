const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
  onDrop: onDrop
});

function onDrop(source, target) {
  if (game.game_over()) return;

  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  board.position(game.fen());

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
  const moves = game.moves();
  if (moves.length === 0) return;

  const move = moves[Math.floor(Math.random() * moves.length)];
  game.move(move);

  board.position(game.fen());
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
