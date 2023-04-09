/* Función que me permite calcular un número aleatorio entre 2 valores */
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function isReflexive(A, R) {
  let counter = 0;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < R.length; j++) {
      if (A[i] == R[j][0] && A[i] == R[j][1]) {
        counter++;
      }

      if (counter === A.length) return true;
    }
  }

  return false;
}
  
function isIrreflexive(A, R) {
  let counter = 0;
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < R.length; j++) {
      if (R[j][0] == R[j][1]) return false;
      if (R[j][0] != R[j][1]) {
        counter++;
      }

      if (counter === R.length) return true;
    }
  }

  return false;
}
  
function isSymmetric(R) {
  for (let i = 0; i < R.length; i++) {
    for (let j = 0; j < R.length; j++) {
      if (R[i][0] == R[j]) {

      }
    }
  } 
}

function isAsymmetric(R) {

}

function isAntiSymmetric(R) {

}

function isTransitive(R) {

}

function isEquivalence(R) {

}

function isPartialOrder(R) {

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