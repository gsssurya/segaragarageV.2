import { dataSewa } from "./data/data-sewa.js";
import { garasi } from "./data/garasi.js";
import { paketSewa } from "./data/paket.js";
import { riwayatSewa } from "./data/riwayat-sewa.js";

if(document.querySelector('.koleksi')){
    summonKoleksiGarasi();
}

export function summonKoleksiGarasi(){
    let contentKoleksiHTML = '';
    let paket = '';
    let carePaket = '';
    let userGarasi = '';
    garasi.forEach((garasiEach) => {
        if(garasiEach.id_sewa !== '0'){
            riwayatSewa.forEach((riwayatEach) => {
                if(garasiEach.id_sewa === riwayatEach.id_sewa){
                    if(riwayatEach.id_paket === '90001'){
                        paket = 'basic'
                    } else if(riwayatEach.id_paket === '90002'){
                        paket = 'elite'
                    } else {
                        paket = 'max';
                    }
                    if(riwayatEach.nomor_telepon === dataSewa.nomor_telepon){
                        if(riwayatEach.id_paket !== '90001'){
                            userGarasi = `style="border: 2px solid var(--primary-${paket});"`;
                        } else {
                            userGarasi = `style="border: 2px solid #FFFFFF;"`;
                        }
                    } else {
                        userGarasi = '';
                    }
                    if(riwayatEach.penawaran === 0 || riwayatEach.penawaran === '0'){
                        carePaket = ''
                    } else {
                        carePaket = `<span class="care-icon"></span>
                                    <p class="nama-penyewa">${riwayatEach.penawaran}x</p>`
                    }
                    contentKoleksiHTML += `
                         <div class="garasi-box" ${userGarasi}>
                            <img src="image/${riwayatEach.url}" alt="">
                            <h1>Garasi ${riwayatEach.nomor_garasi}</h1>
                            <div class="garasi-detail">
                                <div class="detail ${paket}">
                                    <p class="nama-penyewa">${riwayatEach.nama_mobil}</p>
                                    <div>
                                        <span class="icon-paket ${paket}"></span>
                                        <p class="nama-penyewa">${paketIdToDurasi(riwayatEach.id_paket)} hari</p>
                                        ${carePaket}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `
                }
            })
        } else {
            contentKoleksiHTML += `
                <div class="garasi-box">
                    <img src="image/${garasiEach.url}" alt="">
                    <h1>Garasi ${garasiEach.nomor_garasi}</h1>
                    <div class="garasi-detail">
                        <div class="detail">
                            <p class="nama-penyewa">Tersedia</p>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>
                `
        }
    })
    document.querySelector('.js-summon-koleksi-garasi').innerHTML = contentKoleksiHTML;
}

function paketIdToDurasi(id){
    let durasi = ''
    paketSewa.forEach((paketEach) => {
        if(paketEach.id_paket === id){
            durasi = paketEach.durasi

        }
    })
    return durasi
}
console.log(paketIdToDurasi('90001'))