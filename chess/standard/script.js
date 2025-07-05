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
    promotion: 'q' // promotion automatique en reine
  });

  if (move === null) return 'snapback';

  board.position(game.fen());

  // Vérifie si le jeu est terminé après le coup du joueur
  if (game.game_over()) {
    showGameOverMessage();
    return;
  }

  // Laisser un petit délai avant que l'IA ne joue
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
