import {
  hitungAkarJumlahKolomKuadrat,
  normalisasiMatriks,
  matriksNormalisasiTertimbang,
  solusiPositif,
  solusiNegatif,
  hitungJarak,
  hitungCi,
  bebanKerja,
  getBest
} from './index'

// topsis
import { create, all } from 'mathjs'

// topsis
const config = {}
const math = create(all, config)

const m = [
  [4, 5],
  [3, 6],
  [3, 7]
]

// pegawai
const matrix = math.matrix(m)

const weights = [0.7, 0.3]
const ia = ['min', 'min']
const ids = [1, 2, 3]

test('Menghitung akar jumlah kolom kuadrat', () => {
  const result = hitungAkarJumlahKolomKuadrat(matrix)
  expect(result[0]).toBeCloseTo(5.83095)
  expect(result[1]).toBeCloseTo(10.4881)
})

test('Menormalisasi matriks', () => {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const result = normalisasiMatriks(matrix, columnSumsSquared)
  expect(result[0][0]).toBeCloseTo(0.68599)
  expect(result[0][1]).toBeCloseTo(0.47673)
  expect(result[1][0]).toBeCloseTo(0.5145)
  expect(result[1][1]).toBeCloseTo(0.57208)
  expect(result[2][0]).toBeCloseTo(0.5145)
  expect(result[2][1]).toBeCloseTo(0.66742)
})

test('Mengalikan matriks ternormalisasi dengan penimbang', () => {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const normalizedMatrix = normalisasiMatriks(matrix, columnSumsSquared)
  const result = matriksNormalisasiTertimbang(normalizedMatrix, weights)
  expect(result[0][0]).toBeCloseTo(0.4802)
  expect(result[0][1]).toBeCloseTo(0.14302)
  expect(result[1][0]).toBeCloseTo(0.36015)
  expect(result[1][1]).toBeCloseTo(0.17162)
  expect(result[2][0]).toBeCloseTo(0.36015)
  expect(result[2][1]).toBeCloseTo(0.20023)
})

test('Mencari solusi positif', () => {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const normalizedMatrix = normalisasiMatriks(matrix, columnSumsSquared)
  const weightedMatrix = matriksNormalisasiTertimbang(normalizedMatrix, weights)
  const result = solusiPositif(weightedMatrix, ia)
  expect(result[0]).toBeCloseTo(0.36015)
  expect(result[1]).toBeCloseTo(0.14302)
})

test('Mencari solusi negatif', () => {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const normalizedMatrix = normalisasiMatriks(matrix, columnSumsSquared)
  const weightedMatrix = matriksNormalisasiTertimbang(normalizedMatrix, weights)
  const result = solusiNegatif(weightedMatrix, ia)
  expect(result[0]).toBeCloseTo(0.4802)
  expect(result[1]).toBeCloseTo(0.20023)
})

test('Menghitung jarak setiap alternatif dari solusi positif dan negatif', () => {
  const columnSumsSquared = hitungAkarJumlahKolomKuadrat(matrix)
  const normalizedMatrix = normalisasiMatriks(matrix, columnSumsSquared)
  const weightedMatrix = matriksNormalisasiTertimbang(normalizedMatrix, weights)
  const idealSolutions = solusiPositif(weightedMatrix, ia)
  const aidealSolutions = solusiNegatif(weightedMatrix, ia)
  const { idistances, aidistances } = hitungJarak(weightedMatrix, idealSolutions, aidealSolutions)

  expect(idistances[0]).toBeCloseTo(0.12005)
  expect(idistances[1]).toBeCloseTo(0.0286)
  expect(idistances[2]).toBeCloseTo(0.05721)

  expect(aidistances[0]).toBeCloseTo(0.05721)
  expect(aidistances[1]).toBeCloseTo(0.12341)
  expect(aidistances[2]).toBeCloseTo(0.12005)
})

test('Menghitung nilai Ci', () => {
  const idistances = [0.12005, 0.0286, 0.05721]
  const aidistances = [0.05721, 0.12341, 0.12005]
  const result = hitungCi(idistances, aidistances)
  expect(result[0]).toBeCloseTo(0.32274)
  expect(result[1]).toBeCloseTo(0.81183)
  expect(result[2]).toBeCloseTo(0.67726)
})

test('Memberikan peringkat ', () => {
  const idistances = [0.12005, 0.0286, 0.05721]
  const aidistances = [0.05721, 0.12341, 0.12005]
  const proximityScores = hitungCi(idistances, aidistances)
  const result = bebanKerja(proximityScores, ids)
  expect(result[0].index).toBe(1)
  expect(result[0].petugasId).toBe(1)
  expect(result[0].ps).toBeCloseTo(0.67726)

  expect(result[1].index).toBe(2)
  expect(result[1].petugasId).toBe(2)
  expect(result[1].ps).toBeCloseTo(0.18817)

  expect(result[2].index).toBe(3)
  expect(result[2].petugasId).toBe(3)
  expect(result[2].ps).toBeCloseTo(0.32274)
})

test('Memberikan rekomendasi pegawai dengan nilai beban kerja terendah', () => {
  const result = getBest(matrix, weights, ia, ids)
  expect(result).toHaveLength(3)
  expect(result[0]).toHaveProperty('index')
  expect(result[0]).toHaveProperty('petugasId')
  expect(result[0]).toHaveProperty('ps')

  expect(result[0].index).toBe(1)
  expect(result[0].petugasId).toBe(1)
  expect(result[0].ps).toBeCloseTo(0.67726)

  expect(result[1].index).toBe(2)
  expect(result[1].petugasId).toBe(2)
  expect(result[1].ps).toBeCloseTo(0.18817)

  expect(result[2].index).toBe(3)
  expect(result[2].petugasId).toBe(3)
  expect(result[2].ps).toBeCloseTo(0.32274)
})
