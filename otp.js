import { sendOTP } from "./fetch.js";
import { formatDenganStrip } from "./user-data.js";
import { dataSewa } from "./data/data-sewa.js";
import { user } from "./data/user.js";
import { goToDenah } from "./user-data.js";

if(document.querySelector('.pilih-garasi-container.otp')){


    if(!localStorage.getItem('nomor_telepon')){
        window.location.href = 'index.html';
    }

    goToDenah();

    //Melanjutkan hitungan untuk kirim ulang OTP
    if(localStorage.getItem('detik')){
        count60s(JSON.parse(localStorage.getItem('detik')))
    } else {
        count60s(60);
    }
    //Melanjutkan hitungan untuk kirim ulang OTP

   const inputs = document.querySelectorAll('.otp-digit');
   document.querySelector('.js-form-keterangan-otp').innerHTML = `OTP Anda sudah dikirim ke WhatsApp nomor ${formatDenganStrip(localStorage.getItem('nomor_telepon'))}. <i class="js-menit-count">${localStorage.getItem('detik')}s</i>`
    inputs.forEach((element, index) => {
    element.addEventListener('input', () => {
        if (element.value.length === 1 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        } else if(inputs[3].value && inputs[0].value && inputs[1].value && inputs[2].value){
            document.querySelector('.js-lanjutkan-otp').type = 'button';
            document.querySelector('.js-lanjutkan-otp').addEventListener('click', () => {
                let otpCode = '';
                for(let i = 0; i < inputs.length; i++){
                    otpCode += inputs[i].value;
                }
                console.log(otpCode)

                //Cek jika OTP valid atau tidak
                if(otpCode === localStorage.getItem('otp')){
                   checkNumber(localStorage.getItem('nomor_telepon'));
                } else {
                    document.querySelectorAll('.otp-digit').forEach((element) => {
                        element.style.outline = '2px solid red';
                        setTimeout(() => {
                            element.value = '';
                            element.style.outline = '';
                            inputs[0].focus();
                        }, 1500)
                    })
                }
                //Cek jika OTP valid atau tidak

            })
            document.querySelector('.js-lanjutkan-otp').click();
        }
    });
    element.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && element.value === '' && index > 0) {
            inputs[index - 1].focus();
        }
    });
    });
    
   if(!localStorage.getItem('detik')){
        document.querySelector('.js-menit-count').innerHTML = `Kirim ulang!`;
        document.querySelector('.js-menit-count').classList.add('ulangi')
        document.querySelector('.ulangi').addEventListener('click', () => {
            count60s(60);
            console.log(localStorage.getItem('otp'));
            document.querySelector('.js-menit-count').innerHTML = `60s`;
            document.querySelector('.js-menit-count').classList.remove('ulangi')
        })
    }
    console.log(localStorage.getItem('otp'))
}

export function checkNumber(inptTelepon){
    for (let i = 0; i < user.length; i++){
        if(user[i].nomor_telepon === inptTelepon){
            console.log('data-ditemukan')
            localStorage.setItem('teleponValid', localStorage.getItem('nomor_telepon'))
            setTimeout(() => {
                localStorage.removeItem('detik');
                localStorage.removeItem('nomor_telepon');
                window.location.href = 'denah.html';
            }, 500)
            return;
        } else if(i === user.length - 1 && user[i].nomor_telepon !== inptTelepon){
            console.log('data-tidak-ditemukan')
            localStorage.setItem('data-telepon', true)
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 500)
        }
    }
}

export function count60s(detik){
    const counting = setInterval(() => {
        if(detik > 0){
            document.querySelector('.js-menit-count').classList.remove('ulangi');
            document.querySelector('.js-menit-count').style.pointerEvents = 'none';
            localStorage.setItem('detik', detik);
            document.querySelector('.js-menit-count').innerHTML = `${detik}s`
            detik--
        } else {
            localStorage.removeItem('detik');
            document.querySelector('.js-menit-count').style.pointerEvents = 'auto';
            document.querySelector('.js-menit-count').innerHTML = `Kirim ulang!`;
            document.querySelector('.js-menit-count').classList.add('ulangi')
            document.querySelector('.ulangi').addEventListener('click', () => {
                count60s(60)
                document.querySelector('.js-menit-count').innerHTML = `60s`
                document.querySelector('.js-menit-count').classList.remove('ulangi')
                document.querySelector('.js-menit-count').style.pointerEvents = 'none';
            })
            clearInterval(counting);
        }
    }, 1000)
}

export function generateOTP() {
    let otp = Math.floor(1000 + Math.random() * 9000);
    const otpCode = otp.toString();
    sendOTP(localStorage.getItem('nomor_telepon'), otpCode);
    localStorage.setItem('otp', otpCode); 
    count60s(60);
}
