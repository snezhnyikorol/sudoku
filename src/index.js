module.exports = function solveSudoku(matrix) {
  let available = new Array(9);
  let cells = [];
  function div(val, divider) {
    return (val - val % divider) / divider;
  }
  // function fill(n, m) {
  //   available.fill(true);
  //   for (let i = 0; i < 9; i++) {
  //     if (matrix[i][m] != 0) {
  //       available[matrix[i][m]] =  false;
  //     }
  //     if (matrix[n][i] != 0) {
  //       available[matrix[n][i]] =  false;
  //     }
  //     if (matrix[div(n, 3) * 3 + i % 3][div(m, 3) * 3 + div(i, 3)] != 0) {
  //       available[matrix[div(n, 3) * 3 + i % 3][div(m, 3) * 3 + div(i, 3)]] =  false;
  //     }
  //   }
  // }
  function check(n, m) {
    for (let i = 0; i < 9; i++) {
      if (matrix[n][m] == 0) {
        return false;
      }
      if (matrix[i][m] == matrix[n][m] && i != n) {
        return false;
      }
      if (matrix[n][i] == matrix[n][m] && i != m) {
        return false;
      }
      let k = div(n, 3) * 3 + i % 3;
      let l = div(m, 3) * 3 + div(i, 3);
      if (matrix[k][l] == matrix[n][m] && k != n && l != m) {
        return false;
      }
    }
    return true;
  }
  for (let k = 0; k < 81; k++) {
    let i = div(k, 9);
    let j = k % 9;
    if (matrix[i][j] == 0) {
      cells.push({i, j});
    }
  }
  let index = 0;
  do {
    const cell = cells[index];
    while (matrix[cell.i][cell.j] < 10 && !check(cell.i, cell.j)) {
      matrix[cell.i][cell.j]++;
    }
    if (matrix[cell.i][cell.j] == 10) {
      matrix[cell.i][cell.j] = 0;
      index--;
      matrix[cells[index].i][cells[index].j]++;
    } else {
      index++;
    }
  } while (index < cells.length);
  return matrix;
}
