import { connection } from "../../sources/core/connection.js";
import { consoleError, consoleInfo } from "../../sources/utils/custom-logger/logger-util.js";
import { agama, angkatan, biodata, biro, fakultas, jenjangPendidikan, kampus, kelas, kota, lembaga, logger, pangkatPraja, pengguna, peran, programStudi, provinsi, satuanKerja, suku, wisma } from "./data/index.js";

const executeSeeders = async (req) => {
    // Inisialisasi variable
    let reset = {}
    let install = []

    try {

        // *** ---------------------- *** //
        // *** Process Reset Database *** //
        // *** ---------------------- *** //

        // Reset data table pengguna
        await connection.pENGGUNA.deleteMany()
        reset.pengguna = `Has been cleared`

        // Reset data table peran
        await connection.pERAN.deleteMany()
        reset.peran = `Has been cleared`

        // Reset data table biodata
        await connection.bIODATA.deleteMany()
        reset.biodata = `Has been cleared`

        // Reset data table agama
        await connection.aGAMA.deleteMany()
        reset.agama = `Has been cleared`

        // Reset data table angkatan
        await connection.aNGKATAN.deleteMany()
        reset.angkatan = `Has been cleared`

        // Reset data table kelas
        await connection.kELAS.deleteMany()
        reset.kelas = `Has been cleared`

        // Reset data table wisma
        await connection.wISMA.deleteMany()
        reset.wisma = `Has been cleared`

        // Reset data table lokasi_kampus
        await connection.lOKASI_KAMPUS.deleteMany()
        reset.lokasi_kampus = `Has been cleared`

        // Reset data table pangkat_praja
        await connection.pANGKAT.deleteMany()
        reset.pangkat_praja = `Has been cleared`

        // Reset data table fakultas
        await connection.fAKULTAS.deleteMany()
        reset.fakultas = `Has been cleared`

        // Reset data table program_studi
        await connection.pROGRAM_STUDI.deleteMany()
        reset.program_studi = `Has been cleared`

        // Reset data table lembaga
        await connection.lEMBAGA.deleteMany()
        reset.lembaga = `Has been cleared`

        // Reset data table biro
        await connection.bIRO.deleteMany()
        reset.biro = `Has been cleared`

        // Reset data table satuan_kerja
        await connection.sATUAN_KERJA.deleteMany()
        reset.satuan_kerja = `Has been cleared`

        // Reset data table suku
        await connection.sUKU.deleteMany()
        reset.suku = `Has been cleared`

        // Reset data table kota
        await connection.kOTA.deleteMany()
        reset.kota = `Has been cleared`

        // Reset data table provinsi
        await connection.pROVINSI.deleteMany()
        reset.provinsi = `Has been cleared`

        // Reset data logger
        await connection.lOGGER.deleteMany()
        reset.logger = `Has been cleared`


        // *** ----------------------------- *** //
        // *** End Of Process Reset Database *** //
        // *** ----------------------------- *** //






        // *** ----------------------------- *** //
        // *** Process Installation Database *** //
        // *** ----------------------------- *** //

        // Seeder data peran
        await connection.pERAN.createMany({ data: peran })
        install.peran = `successfully installed`

        // Seeder data pengguna
        await connection.pENGGUNA.createMany({ data: pengguna })
        install.pengguna = `successfully installed`

        // Seeder data biodata
        await connection.bIODATA.createMany({ data: biodata })
        install.biodata = `successfully installed`

        // Seeder data agama
        await connection.aGAMA.createMany({ data: agama })
        install.agama = `successfully installed`

        // Seeder data angkatan
        await connection.aNGKATAN.createMany({ data: angkatan })
        install.angkatan = `successfully installed`

        // Seeder data jenjang_pendidikan
        await connection.jENJANG_PENDIDIKAN.createMany({ data: jenjangPendidikan })
        install.jenjang_pendidikan = `successfully installed`

        // Seeder data kelas
        await connection.kELAS.createMany({ data: kelas })
        install.kelas = `successfully installed`

        // Seeder data lokasi_kampus
        await connection.lOKASI_KAMPUS.createMany({ data: kampus })
        install.lokasi_kampus = `successfully installed`

        // Seeder data wisma
        await connection.wISMA.createMany({ data: wisma })
        install.wisma = `successfully installed`

        // Seeder data pangkat_praja
        await connection.pANGKAT.createMany({ data: pangkatPraja })
        install.pangkat_praja = `successfully installed`

        // Seeder data fakultas
        await connection.fAKULTAS.createMany({ data: fakultas })
        install.fakultas = `successfully installed`

        // Seeder data program_studi
        await connection.pROGRAM_STUDI.createMany({ data: programStudi })
        install.program_studi = `successfully installed`

        // Seeder data lembaga
        await connection.lEMBAGA.createMany({ data: lembaga })
        install.lembaga = `successfully installed`

        // Seeder data biro
        await connection.bIRO.createMany({ data: biro })
        install.biro = `successfully installed`

        // Seeder data satker_lembaga
        await connection.sATUAN_KERJA.createMany({ data: satuanKerja.dataLembaga })
        install.satker_lembaga = `successfully installed`

        // Seeder data satker_fakultas
        await connection.sATUAN_KERJA.createMany({ data: satuanKerja.dataFakultas })
        install.satker_fakultas = `successfully installed`

        // Seeder data satker_biro
        await connection.sATUAN_KERJA.createMany({ data: satuanKerja.dataBiro })
        install.satker_biro = `successfully installed`

        // Seeder data suku
        await connection.sUKU.createMany({ data: suku })
        install.suku = `successfully installed`

        // Seeder data provinsi
        await connection.pROVINSI.createMany({ data: provinsi })
        install.provinsi = `successfully installed`

        // Seeder data kota
        await connection.kOTA.createMany({ data: kota })
        install.kota = `successfully installed`

        // Seeder data logger
        await connection.lOGGER.createMany({ data: logger })
        install.logger = `successfully installed`

        // *** ------------------------------------ *** //
        // *** End Of Process Installation Database *** //
        // *** ------------------------------------ *** //

        consoleInfo(`Seeder Process successfully Executed`, { reset, install })

    } catch (error) {
        consoleError(`Terjadi kesalahan pada saat menginstall data seeder`, error.message)
        process.exit()
    } finally {
        await connection.$disconnect()
    }
}

executeSeeders()