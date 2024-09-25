'use strict'
function hitungAkarJumlahKolomKuadrat(matrix) {
  const columnSumsSquared = []
  for (let j = 0; j < matrix._size[1]; j++) {
    let sumSquared = 0
    for (let i = 0; i < matrix._size[0]; i++) {
      sumSquared += matrix._data[i][j] * matrix._data[i][j]
    }
    columnSumsSquared.push(Math.sqrt(sumSquared))
  }
  return columnSumsSquared
}

function normalisasiMatriks(matrix, columnSumsSquared) {
  return matrix._data.map(row => {
    return row.map((value, columnIndex) => {
      if (columnSumsSquared[columnIndex] === 0) {
        return 0
      } else {
        return value / columnSumsSquared[columnIndex]
      }
    })
  })
}

function matriksNormalisasiTertimbang(normalizedMatrix, weights) {
  return normalizedMatrix.map(row => {
    return row.map((value, columnIndex) => {
      return value * weights[columnIndex]
    })
  })
}

function solusiPositif(weightedMatrix, ia) {
  const idealSolutions = new Array(weightedMatrix[0].length).fill(0)
  for (let columnIndex = 0; columnIndex < weightedMatrix[0].length; columnIndex++) {
    let values = weightedMatrix.map(row => row[columnIndex])
    if (ia[columnIndex] === 'max') {
      idealSolutions[columnIndex] = Math.max(...values)
    } else {
      idealSolutions[columnIndex] = Math.min(...values)
    }
  }
  return idealSolutions
}

function solusiNegatif(weightedMatrix, ia) {
  const aidealSolutions = new Array(weightedMatrix[0].length).fill(0)
  for (let columnIndex = 0; columnIndex < weightedMatrix[0].length; columnIndex++) {
    let values = weightedMatrix.map(row => row[columnIndex])
    if (ia[columnIndex] === 'max') {
      aidealSolutions[columnIndex] = Math.min(...values)
    } else {
      aidealSolutions[columnIndex] = Math.max(...values)
    }
  }
  return aidealSolutions
}

function hitungJarak(weightedMatrix, idealSolutions, aidealSolutions) {
  const idistances = []
  const aidistances = []
  for (let row of weightedMatrix) {
    let idistance = 0
    let aidistance = 0
    for (let columnIndex = 0; columnIndex < row.length; columnIndex++) {
      idistance += Math.pow(row[columnIndex] - idealSolutions[columnIndex], 2)
      aidistance += Math.pow(row[columnIndex] - aidealSolutions[columnIndex], 2)
    }
    idistance = Math.sqrt(idistance)
    idistances.push(idistance)
    aidistance = Math.sqrt(aidistance)
    aidistances.push(aidistance)
  }
  return { idistances, aidistances }
}

function hitungCi(idistances, aidistances) {
  return idistances.map((positiveDistance, i) => {
    const negativeDistance = aidistances[i]
    const proximityScore = negativeDistance / (positiveDistance + negativeDistance)
    return isNaN(proximityScore) ? 1 : proximityScore
  })
}

function bebanKerja(proximityScores, ids) {
  return proximityScores
    .map((ps, i) => ({
      index: i + 1,
      petugasId: ids[i],
      ps: 1 - ps
    }))
    .sort((a, b) => a.index - b.index)
}

function getBest(matrix, weights, ia, ids) {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const normalizedMatrix = normalisasiMatriks(matrix, columnSumsSquared)
  const weightedMatrix = matriksNormalisasiTertimbang(normalizedMatrix, weights)
  const idealSolutions = solusiPositif(weightedMatrix, ia)
  const aidealSolutions = solusiNegatif(weightedMatrix, ia)
  const { idistances, aidistances } = hitungJarak(weightedMatrix, idealSolutions, aidealSolutions)
  const proximityScores = hitungCi(idistances, aidistances)

  console.log(columnSumsSquared)
  console.log(normalizedMatrix)
  console.log(weightedMatrix)
  console.log(idealSolutions)
  console.log(aidealSolutions)
  console.log(idistances)
  console.log(aidistances)
  console.log(proximityScores)
  return bebanKerja(proximityScores, ids)
}

export {
  getBest,
  hitungAkarJumlahKolomKuadrat,
  normalisasiMatriks,
  matriksNormalisasiTertimbang,
  solusiPositif,
  solusiNegatif,
  hitungJarak,
  hitungCi,
  bebanKerja
}
