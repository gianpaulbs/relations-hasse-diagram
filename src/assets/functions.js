import { column, row, transpose } from "mathjs";

/* Función que me permite calcular un número aleatorio entre 2 valores */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isReflexive(matrix) {
  let diagonal = matrix.diagonal();
  let dlength = diagonal._data.length;
  let response = false;
  let count = 0;

  for (let i = 0; i < dlength; i++) {
    if (diagonal._data[i] == 1)
      count++;
  }

  if (count === dlength)
    response = true;

  return response;
}

function isIrreflexive(matrix) {
  let diagonal = matrix.diagonal();
  let dlength = diagonal._data.length;
  let response = false;
  let count = 0;

  for (let i = 0; i < dlength; i++) {
    if (diagonal._data[i] == 0)
      count++;
  }

  if (count === dlength)
    response = true;

  return response;
}
  
function isSymmetric(matrix) {
  let mt = transpose(matrix);

  for (let i = 0; i < mt._data.length; i++) {
    for(let j = 0; j < matrix._data.length; j++) {
      if (mt._data[i][j] != matrix._data[i][j])
        return false;
    }
  }

  return true;
}

function isAsymmetric(matrix) {
  /* Verificamos si la diagonal está formado por ceros */
  let diagonal = matrix.diagonal();
  for (let i = 0; i < diagonal._data.length; i++) {
    if (diagonal._data[i] != 0)
      return false;
  }

  /* Verificamos si las posiciones simétricas a la diagonal
     están formadas por 1 y 0
  */
  for (let i = 0; i < matrix._data.length; i++) {
    for (let j = 0; j < matrix._data.length; j++) {
      if (i == j) continue;

      if (matrix._data[i][j] == matrix._data[j][i] && matrix._data[i][j] == 1)
        return false;
    }
  }

  return true;
}

function isAntiSymmetric(matrix) {
  for (let i = 0; i < matrix._data.length; i++) {
    for (let j = 0; j < matrix._data.length; j++) {
      if (i == j) continue;

      if (matrix._data[i][j] == matrix._data[j][i] && matrix._data[i][j] == 1)
        return false;
    }
  }

  return true;
}

function isTransitive(matrix) {
  let r = [], c = [];
  let line = [], rcuadrado = [];
  let mlength = matrix.size()[0];
  let value = 0, count = 0, total = 0;
  let response = false;

  /* Calcular matriz R * R */
  for (let i = 0; i < mlength; i++) {
    r = row(matrix, i)._data;

    for (let j = 0; j < mlength; j++) {
      c = column(matrix, j)._data;

      for (let k = 0; k < mlength; k++) {
        value = r[0][k] * c[k][0];
        if (value) {
          break;
        }
      }
      
      line.push(value);
      value = 0;
    }

    rcuadrado.push(line);
    line = [];
  }

  /* Comprobamos si la matriz R al cuadrado presenta los 1 en la misma
     posición que la matriz R original
  */
  for (let i = 0; i < rcuadrado.length; i++) {
    for (let j = 0; j < mlength; j++) {
      if (rcuadrado[i][j]) count++;
      
      if (matrix._data[i][j] == 1 && rcuadrado[i][j] == 1 && matrix._data[i][j] == rcuadrado[i][j])
        total++;
    }
  }

  if (count == total && count != 0 && total != 0)
    response = true;

  return response;
}

function isEquivalence(checkEquivalence) {
  if (checkEquivalence != 3) 
    return false;

  return true;
}

function isPartialOrder(checkPartialOrder) {
  if (checkPartialOrder != 3)
    return false;
  
  return true;
}

export {
  getRandom,
  isReflexive,
  isIrreflexive,
  isSymmetric,
  isAsymmetric,
  isAntiSymmetric,
  isTransitive,
  isEquivalence,
  isPartialOrder
};