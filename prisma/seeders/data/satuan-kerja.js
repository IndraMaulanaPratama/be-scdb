import { lembaga } from "./lembaga.js";
import { biro } from "./biro.js";
import { fakultas } from "./fakultas.js";

// Inisialisasi Variable
let data = []
let dataLembaga, dataBiro, dataFakultas

// Inisilisasi data lembaga untuk di export ke satuan kerja
dataLembaga = lembaga.map(({ LEMBAGA_ID, LEMBAGA_NAMA }, hasil) => {
    hasil = { SATKER_LEMBAGA: LEMBAGA_ID, SATKER_NAMA: LEMBAGA_NAMA }
    return hasil
})

// Inisialisasi data biro untuk di eksport ke satuan kerja
dataBiro = biro.map(({ BIRO_ID, BIRO_NAMA }, hasil) => {
    hasil = { SATKER_BIRO: BIRO_ID, SATKER_NAMA: BIRO_NAMA }
    return hasil
})

// Inisialisasi data biro untuk di eksport ke satuan kerja
dataFakultas = fakultas.map(({ FAKULTAS_ID, FAKULTAS_NAMA }, hasil) => {
    hasil = { SATKER_FAKULTAS: FAKULTAS_ID, SATKER_NAMA: FAKULTAS_NAMA }
    return hasil
})

// Merge semua data yang sudah di inisialisasi kedalam variable data
data = { dataLembaga, dataBiro, dataFakultas }

// Mengembalikan nilai data
export const satuanKerja = data