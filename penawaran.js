import { dataSewa } from "./data/data-sewa.js";

if(document.querySelector('.pilih-garasi.penawaran')){

    if(!dataSewa.id_paket){
        window.location.href = '../index.html'
    }

    document.querySelector('.js-add-care').addEventListener('click', () => {
        const amountCare = coutCareQtyFromPaket(dataSewa.id_paket)
        localStorage.setItem('careQty', amountCare);
        setTimeout(() => {
            window.location.href = 'konfirmasi.html'
        })
    })

    document.querySelector('.js-lanjutkan-konfirmasi').addEventListener('click', () => {
        localStorage.setItem('careQty', 0);
        setTimeout(() => {
            window.location.href = 'konfirmasi.html'
        })
    })

}
export function coutCareQtyFromPaket(id_paket){
    if(id_paket === '90001'){
        return 4;
    } else if(id_paket === '90002'){
        return 24;
    } else {
        return 48;
    }
}