import { dataSewa } from "./data/data-sewa.js";
import { garasi } from "./data/garasi.js";
import { user } from "./data/user.js";
import { paketSewa } from "./data/paket.js";
import { coutCareQtyFromPaket } from "./penawaran.js";
import { insertDataSewa } from "./fetch.js";
import { updateDataSewa } from "./data/data-sewa.js";

if(document.querySelector('.pilih-garasi.konfirmasi')){

    if(!dataSewa.id_paket || !dataSewa.nomor_garasi || !dataSewa.nomor_telepon){
        window.location.href = '../index.html';
    }

    summonNota();

    const input = document.getElementById("kendaraan");
    let onAlert;
    input.addEventListener("input", function() {
        if (this.value.length > 15) {
        this.value = this.value.slice(0, 15);
        document.querySelector('.js-nama-mobil-alert').innerHTML = 'Maksimal 16 karakter!';
        document.querySelector('.js-nama-mobil-alert').style.color = 'red';
        if(onAlert){
            clearTimeout(onAlert);
        }
        onAlert = setTimeout(() => {
            document.querySelector('.js-nama-mobil-alert').innerHTML = 'Harap isi nama kendaraan Anda!';
            document.querySelector('.js-nama-mobil-alert').style.color = '';
            clearTimeout(onAlert);
        }, 2000)
        }
    });
}

function summonNota(){
    let notaHTML = '';
    garasi.forEach((garasiEach) => {
        if(garasiEach.nomor_garasi === dataSewa.nomor_garasi){
            user.forEach((userEach) => {
                if(userEach.nomor_telepon === dataSewa.nomor_telepon){
                    notaHTML = `
                        <img src="../image/${garasiEach.url}" alt="">
                        <div class="konfirmasi-detail-box">
                            <div class="konfirmasi-top">
                                <div class="left">
                                    <h1 class="nomor-garasi">Garasi ${dataSewa.nomor_garasi}</h1>
                                    <h1 class="paket-sewa ${idPaketToName()}">${idPaketToJudul()}</h1>
                                    <div class="care-container">
                                        <h1 class="care-title">CarE</h1>
                                        <div class="tambah-kurang-container">
                                            <div class="tambah-kurang-care-box">
                                                <span class="min-icon js-min-care"></span>
                                                <p class="jumlah-care js-jumlah-care secondary">${dataSewa.penawaran}</p>
                                                <span class="plus-icon js-plus-care"></span>
                                            </div>
                                            <p class="secondary">Minggu</p>
                                        </div>
                                    </div>
                                </div>
                                <div class="right">
                                    <h1 class="nama-pengguna">${userEach.nama_panggilan}</h1>
                                    <div class="paket-sewa-harga">
                                        <P class="secondary">Rp</P>
                                        <p class="secondary">${formatHarga(idPaketToHarga(dataSewa.id_paket))}</p>
                                    </div>
                                    <div>
                                        <p class="secondary">Rp</p>
                                        <p class="secondary js-total-harga-care">${formatHarga(25000 * dataSewa.penawaran)}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="konfirmasi-bottom">
                                <h1>Total</h1>
                                <div class="harga-total-box">
                                    <p class="secondary">Rp</p>
                                    <p class="secondary js-total-biaya-sewa">${formatHarga(JSON.parse(idPaketToHarga(dataSewa.id_paket)) + (25000 * dataSewa.penawaran))}</p>
                                </div>
                            </div>
                        </div>
                    `;
    
                }
            })
        }
    })
    document.querySelector('.konfirmasi-paket-container').innerHTML = notaHTML;
}

function idPaketToName(){
    if(dataSewa.id_paket === '90001'){
        return 'basic'
    } else if(dataSewa.id_paket === '90002'){
        return 'elite'
    } else {
        return 'max';
    }
}

export function idPaketToJudul(){
    if(dataSewa.id_paket === '90001'){
        return 'Paket BASIC 1 Bulan'
    } else if(dataSewa.id_paket === '90002'){
        return 'Paket ELITE 6 Bulan'
    } else {
        return 'Paket MAX 12 Bulan';
    }
}
console.log(paketSewa)

function idPaketToHarga(idPaket){
    let harga = '';
    paketSewa.forEach((paketEach) => {
        if(paketEach.id_paket === idPaket){
            harga = paketEach.harga;
        }
    })
    return harga; 
}

export function formatHarga(angka) {
  return angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function plusMinCare(indikator){
    let jumlah = JSON.parse(localStorage.getItem('careQty'));
    if(indikator === '-' && jumlah > 0 && jumlah <= coutCareQtyFromPaket(dataSewa.id_paket)){
        jumlah -= 1
    } else if(indikator === '+' && jumlah >= 0 && jumlah < coutCareQtyFromPaket(dataSewa.id_paket)){
        jumlah += 1
    }
    if(jumlah === 0){
        document.querySelector('.js-min-care').style.backgroundColor = 'var(--secondary-color)'
    } else if(jumlah === coutCareQtyFromPaket(dataSewa.id_paket)){
        document.querySelector('.js-plus-care').style.backgroundColor = 'var(--secondary-color)'
    } else {
        document.querySelector('.js-min-care').style.backgroundColor = ''
        document.querySelector('.js-plus-care').style.backgroundColor = ''
    }
    localStorage.setItem('hargaSewa', idPaketToHarga(dataSewa.id_paket)) + (25000 * jumlah)
    document.querySelector('.js-jumlah-care').innerHTML = jumlah;
    document.querySelector('.js-total-harga-care').innerHTML = formatHarga(25000 * jumlah);
    document.querySelector('.js-total-biaya-sewa').innerHTML = formatHarga(JSON.parse(idPaketToHarga(dataSewa.id_paket)) + (25000 * jumlah))
    localStorage.setItem('careQty', jumlah);
    updateDataSewa()
}

if(document.querySelector('.pilih-garasi.konfirmasi')){

    if(JSON.parse(localStorage.getItem('careQty')) === 0){
        document.querySelector('.js-min-care').style.backgroundColor = 'var(--secondary-color)'
    } else if(JSON.parse(localStorage.getItem('careQty')) === coutCareQtyFromPaket(dataSewa.id_paket)){
        document.querySelector('.js-plus-care').style.backgroundColor = 'var(--secondary-color)'
    }

    document.querySelector('.js-min-care').addEventListener('click', () => {
        plusMinCare('-')
    })
    document.querySelector('.js-plus-care').addEventListener('click', () => {
        plusMinCare('+')
    })

    let carePesan = '';
    document.querySelector('.js-konfirmasi-button').addEventListener('click', () => {
        if(localStorage.getItem('careQty') != 0){
            carePesan = `+ CarE ${localStorage.getItem('careQty')}x`
        } else {
            carePesan = '';
        }
        if(document.querySelector('.input-nama-mobil').value){
            localStorage.setItem('nama_mobil', document.querySelector('.input-nama-mobil').value)
            localStorage.setItem('hargaSewa', JSON.parse(idPaketToHarga(dataSewa.id_paket)) + (25000 * dataSewa.penawaran))
            updateDataSewa();
            console.log(dataSewa)
            insertDataSewa(dataSewa);
        }
    })

    if(dataSewa.nama_mobil){
        document.querySelector('.js-konfirmasi-button').type = 'button';
        document.querySelector('.input-nama-mobil').value = dataSewa.nama_mobil;
    }

    document.querySelector('.input-nama-mobil').addEventListener('input', () => {
        if(document.querySelector('.input-nama-mobil').value.trim() === ''){
            document.querySelector('.js-konfirmasi-button').type = 'sumbit';
            localStorage.removeItem('nama_mobil')
        } else {
            localStorage.setItem('nama_mobil', document.querySelector('.input-nama-mobil').value)
            document.querySelector('.js-konfirmasi-button').type = 'button';
        }
    })

}
export function idUserToNama(nomorTelepon){
    let nama =''
    user.forEach((userEach) => {
        if(userEach.nomor_telepon === nomorTelepon){
            nama = userEach.nama_panggilan;
        }
    })
    return nama;
}

export function tambahSatuHari(date = new Date()) {

    const besok = new Date(date.getTime() + 24 * 60 * 60 * 1000);

    const bulanIndo = [
        'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
        'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
    ];

    const hari = besok.getDate();
    const bulan = bulanIndo[besok.getMonth()];
    const tahun = besok.getFullYear();

    const jam = String(besok.getHours()).padStart(2, '0');
    const menit = String(besok.getMinutes()).padStart(2, '0');
    return `${hari} ${bulan} ${tahun} ${jam}.${menit}`;
}

