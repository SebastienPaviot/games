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

  board.move(`${source}-${target}`);

  if (game.game_over()) {
    showGameOverMessage();
    return;
  }

  setTimeout(() => {
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

  const from = move.slice(0, 2);
  const to = move.slice(2, 4);
  board.move(`${from}-${to}`);
}

function showGameOverMessage() {
  if (game.in_checkmate()) {
    alert('Échec et mat !');
  } else if (game.in_stalemate()) {
    alert('Pat !');
  } else if (game.insufficient_material()) {
    alert('Matériel insuffisant !');
  } else if (game.in_draw()) {
    alert('Match nul !');
  } else {
    alert('Partie terminée !');
  }
}
