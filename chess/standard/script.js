const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  pieceTheme: 'https://chessboardjs.com/img/chesspieces/wikipedia/{piece}.png',
  onDrop: onDrop
});

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  // Coup invalide => annuler
  if (move === null) return 'snapback';

  // Coup valide => attendre un peu et jouer les noirs
  window.setTimeout(makeRandomMove, 250);
}

function makeRandomMove() {
  if (game.game_over()) return;

  const moves = game.moves();
  const move = moves[Math.floor(Math.random() * moves.length)];

  game.move(move);
  board.position(game.fen());
}
