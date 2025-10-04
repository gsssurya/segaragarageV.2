import { dataSewa } from "./data/data-sewa.js";
import { generateOTP } from "./otp.js";
import { exportNewUser } from "./fetch.js";

export function hilangkanNolTelepon(){
    let s = String(localStorage.getItem('nomor_telepon') || '');
    if (s.startsWith('0')) {
        return s.slice(1);
    }
}
export function formatDenganStrip(nomor) {
  return String(nomor).replace(/(\d{4})(?=\d)/g, '$1-');
}

export function getDomain(email) {
  return email.substring(email.indexOf('@'));
}

export function hitung() {
    let inptTelepon = document.getElementById('telepon').value;
    if(inptTelepon.startsWith("0")){
        inptTelepon = inptTelepon;
    } else {
        inptTelepon = `0${inptTelepon}`;
    }
    let phone = inptTelepon;
    let digits = phone.replace(/\D/g, "");
    return digits.length;
}

if(document.querySelector('.js-paket-harga-button')){
    document.querySelectorAll('.js-paket-harga-button').forEach((element) => {
        element.addEventListener('click', () => {
            const idPaket = element.dataset.paket;
            localStorage.setItem('idPaket', idPaket);
            window.location.href = 'sewa'
        })
    })
}

if(document.querySelector('.js-lanjutkan-denah')){

    goToDenah();

    document.body.addEventListener("keydown", (event) => {
        if(event.key === 'Enter'){
            document.querySelector('.js-lanjutkan-denah').click();
        }
    });

    let nomorTeleponTidakDitemukan = false || localStorage.getItem('data-telepon')

    if(!nomorTeleponTidakDitemukan){

        //Mengubah type lanjutkan button
        document.querySelector('.js-nomor-telepon').addEventListener('input', () => {
            if(document.querySelector('.js-nomor-telepon').value.trim() === ''){
                document.querySelector('.js-lanjutkan-denah').type = 'sumbit';
            } else {
                document.querySelector('.js-lanjutkan-denah').type = 'button';
            }
        })
        //Mengubah type lanjutkan button

        //Button lanjutkan ke OTP
        document.querySelector('.js-lanjutkan-denah').addEventListener('click', () => {
            checkNumberTelepon();
        })
        //Button lanjutkan ke OTP

    } else {
        
        let alertTime;
        document.querySelector('.js-nomor-telepon').type = 'text';
        document.querySelector('.js-nomor-telepon').value = formatDenganStrip(hilangkanNolTelepon());
        console.log('data kosong')
        document.querySelector('.js-nomor-telepon').style.pointerEvents = 'none';
        document.querySelectorAll('.register input').forEach((input) => {
            input.required = true;
        })
        document.querySelectorAll('.register').forEach((element) => {
            element.style.display = 'flex';
        })
        document.querySelector('.js-lanjutkan-denah').type = 'sumbit';
        document.querySelector('.js-form-keterangan').innerHTML = 'Dengan mengisi formulir ini, saya setuju data yang diberikan dipakai untuk <i>pengelolaan</i> penyewaan garasi.'
        const inputs = document.querySelectorAll("input");
        inputs.forEach((element, index) => {
            element.addEventListener('keydown', () => {
                if(inputs[3].value && inputs[0].value && inputs[1].value && inputs[2].value){
                   document.querySelector('.js-lanjutkan-denah').type = 'button';
                } else {
                    document.querySelector('.js-lanjutkan-denah').type = 'sumbit';
                }
            })
        })
        document.querySelector('.js-lanjutkan-denah').addEventListener('click', () =>{
            goToDenah();
            if(inputs[3].value && inputs[0].value && inputs[1].value && inputs[2].value){

                //Email valid checker
                const emailElement = document.getElementById('email');
                 if(getDomain(emailElement.value) === '@gmail.com'){
                    localStorage.setItem('teleponValid', localStorage.getItem('nomor_telepon'))
                    localStorage.removeItem('nomor_telepon');
                    localStorage.removeItem('data-telepon')
                    localStorage.removeItem('detik');
                    const dataUser = {
                        nomor_telepon: localStorage.getItem('teleponValid'),
                        nama_panggilan: document.getElementById('nama').value,
                        email: emailElement.value,
                        alamat: document.getElementById('alamat').value
                    }
                    exportNewUser(dataUser);
                    console.log(dataUser)
                    setTimeout(() => {
                        window.location.href = 'denah.html'
                    }, 500)
                 } else {
                    document.querySelector('.js-email-alert').innerHTML = 'Email tidak valid (contoh@gmail.com)'
                    document.querySelector('.js-email-alert').style.color = 'red';
                    clearTimeout(alertTime);
                    alertTime = setTimeout(() => {
                        document.querySelector('.js-email-alert').innerHTML = 'Nomor telepon';
                        document.querySelector('.js-email-alert').style.color = '';
                        alertTime = null;
                    }, 5000)
                 }
                //Email valid checker
            }
        })
    }
}

function checkNumberTelepon(){
    let alertTime;
    if((hitung() < 9 && hitung() > 1) || hitung() > 15 || document.getElementById('telepon').value === '0'){
        document.querySelector('.label-nomor-telepon').innerHTML = 'Nomor tidak valid (9-15 digit)';
        document.querySelector('.label-nomor-telepon').style.color = 'red';
        clearTimeout(alertTime);
        alertTime = setTimeout(() => {
            document.querySelector('.label-nomor-telepon').innerHTML = 'Nomor telepon';
            document.querySelector('.label-nomor-telepon').style.color = '';
            alertTime = null;
        }, 5000)
    } else if(hitung() > 1 && hitung() >= 9 && hitung() <= 15){
        let inptTelepon = document.getElementById('telepon').value;
        if(inptTelepon.startsWith("0")){
            inptTelepon = inptTelepon;
        } else {
            inptTelepon = `0${inptTelepon}`;
        }
        if(inptTelepon === localStorage.getItem('nomor_telepon')){
            localStorage.removeItem('detik');
            window.location.href = 'otp.html';
        } else {
            localStorage.removeItem('detik');
            localStorage.setItem('nomor_telepon', inptTelepon);
            generateOTP();
            window.location.href = 'otp.html';
        }
    }
}

export function goToDenah(){
    if(dataSewa.nomor_telepon){
        window.location.href = 'denah.html';
        localStorage.removeItem('otp');
    }
}

console.log(dataSewa)