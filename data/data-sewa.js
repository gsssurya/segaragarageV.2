export let dataSewa = {
    nomor_garasi: '' || localStorage.getItem('nomor_garasi'),
    nomor_telepon: '' || localStorage.getItem('teleponValid'),
    id_paket: '' || localStorage.getItem('idPaket'),
    total_harga: '' || localStorage.getItem('hargaSewa'),
    nama_mobil: '' || localStorage.getItem('nama_mobil'),
    url: '0', //Admin
    penawaran: 0 || localStorage.getItem('careQty'),
    tgl_mulai: '0', //Admin
    tgl_selesai: '0', //Admin
    status: 'menunggu'
}

export function updateDataSewa(){
    return dataSewa = {
        nomor_garasi: '' || localStorage.getItem('nomor_garasi'),
        nomor_telepon: '' || localStorage.getItem('teleponValid'),
        id_paket: '' || localStorage.getItem('idPaket'),
        total_harga: '' || localStorage.getItem('hargaSewa'),
        nama_mobil: '' || localStorage.getItem('nama_mobil'),
        url: '', //Admin
        penawaran: 0 || localStorage.getItem('careQty'),
        tgl_mulai: '', //Admin
        tgl_selesai: '', //Admin
        status: 'menunggu'
    }
}
console.log(dataSewa)