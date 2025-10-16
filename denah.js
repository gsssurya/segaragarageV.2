import { dataSewa } from "./data/data-sewa.js";
import { garasi } from "./data/garasi.js";
import { user } from "./data/user.js";
import { riwayatSewa } from "./data/riwayat-sewa.js";

if(document.querySelector('.pilih-garasi.denah')){
}

if(document.querySelector('.pilih-garasi.denah')){

    if(!dataSewa.nomor_telepon || !dataSewa.id_paket){
        window.location.href = 'index.html';
    }

    garasiSummon();

    const arrayGarasi = document.querySelectorAll('.garasi-right .tersedia');
    if(dataSewa.nomor_garasi){
        arrayGarasi.forEach((el) => {
            if(el.dataset.garasi === dataSewa.nomor_garasi){
                el.style.scale = '0.95'
                el.style.backgroundColor = 'var(--yellow-color)'
            }
        })
    }
    arrayGarasi.forEach((element, index) => {
        let picked = false
        element.addEventListener('click', () => {
            const dataGarasi = element.dataset.garasi;
            localStorage.setItem('nomor_garasi', dataGarasi);
            arrayGarasi.forEach(el => {
                el.style.scale = '';
                el.style.backgroundColor = '';
            })
            if(!picked){
                arrayGarasi[index].style.scale = '0.95'
                arrayGarasi[index].style.backgroundColor = 'var(--yellow-color)'
                picked = true;
            } else {
                arrayGarasi[index].style.scale = ''
                arrayGarasi[index].style.backgroundColor = ''
                localStorage.removeItem('nomor_garasi')
                picked = false;
            }
        })
    })
    document.querySelector('.js-lanjutkan-penawaran').addEventListener('click', () => {
        if(!localStorage.getItem('nomor_garasi')){
            arrayGarasi.forEach((el) => {
                el.style.color = 'red'
                document.querySelector('.denah-container').style.border = '1px solid red'
                setTimeout(() => {
                    el.style.color = ''
                    document.querySelector('.denah-container').style.border = '';
                }, 1000)
            })
        } else {
            setTimeout(() => {
                window.location.href = 'penawaran.html'
            }, 500);
        }
    })
}


export function garasiSummon(){
    let contentHtml = ''
    let iconPaket;
    let topBottom;
    let penawaran;
    garasi.forEach((garasiEach) => {
        if(garasiEach.nomor_garasi === '1'){
            topBottom = 'top'
        } else if(garasiEach.nomor_garasi === '8'){
            topBottom = 'bottom'
        } else {
            topBottom = '';
        }
        if(garasiEach.id_sewa !== '0'){
            riwayatSewa.forEach((riwayatSewaEach) => {
                if(riwayatSewaEach.penawaran != 0){
                    penawaran = '<span class="care-icon care"></span>'
                } else {
                    penawaran = '';
                }
                if(garasiEach.id_sewa === riwayatSewaEach.id_sewa){
                    user.forEach((userEach) => {
                        if(userEach.nomor_telepon === riwayatSewaEach.nomor_telepon){
                            if(riwayatSewaEach.id_paket === '90001'){
                                iconPaket = 'basic'
                            } else if(riwayatSewaEach.id_paket === '90002'){
                                iconPaket = 'elite'
                            } else {
                                iconPaket = 'max';
                            }
                            contentHtml += ` <div class="tidak-tersedia ${topBottom} box-garasi" data-garasi="${garasiEach.nomor_garasi}">${garasiEach.nomor_garasi}
                                <div class="info-pengguna-container">
                                    <div class="square"></div>
                                    <div class="informasi-pengguna">
                                        <img src="../image/${riwayatSewaEach.url}" alt="">
                                        <div class="identitas-box">
                                            <p class="nama">${userEach.nama_panggilan}</p>
                                            <p class="kendaraan">${riwayatSewaEach.nama_mobil}</p>
                                        </div>
                                        <div class="detail-paket-box">
                                            <span class="icon-paket ${iconPaket}"></span>
                                            ${penawaran}
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                        }
                    })
                }
            })
        } else {
            contentHtml += `<div class="tersedia ${topBottom} box-garasi" data-garasi="${garasiEach.nomor_garasi}">${garasiEach.nomor_garasi}</div>`
        }
    })
    document.querySelector('.js-summon-garasi').innerHTML = contentHtml;
}