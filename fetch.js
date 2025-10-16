import { idUserToNama, idPaketToJudul, formatHarga, tambahSatuHari } from "./konfirmasi.js";
import { dataSewa } from "./data/data-sewa.js";
import { addcheckIcon } from "./script.js";

export function sendOTP(telepon, otp){
    fetch("../php/otp.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "telepon=" + encodeURIComponent(telepon) + "&otp=" + encodeURIComponent(otp)
    })
    .then(response => response.text())
}

export function exportNewUser(data) {
    fetch("../php/insert-user.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
}

export function sendKonfirmasi(telepon, pesan){
    fetch("../php/konfirmasi.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "telepon=" + encodeURIComponent(telepon) + "&pesan=" + encodeURIComponent(pesan)
    })
    .then(response => response.text())
}

export function insertDataSewa(data){
    fetch("../php/insert-data-sewa.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.text()) // ambil respons sebagai teks mentah
    .then(text => {
        console.log("📩 Raw response:", text); // debug

        let result;
        try {
            result = JSON.parse(text); // ubah ke JSON
        } catch (e) {
            console.error("⚠️ Gagal parse JSON:", e);
            return;
        }

        if (result.status === "success") {
            console.log("✅ Data berhasil disimpan. ID Sewa:", result.id_sewa);
            let carePesan = '';
            if(localStorage.getItem('careQty') != 0){
                carePesan = `+ CarE ${localStorage.getItem('careQty')}x`
            } else {
                carePesan = '';
            }
            localStorage.setItem("id_sewa", result.id_sewa);
             const pesan = `📄 *Invoice #${localStorage.getItem('id_sewa')}*
                        
👤 *Nama:* ${idUserToNama(dataSewa.nomor_telepon)}
📦 *Paket:* ${idPaketToJudul(dataSewa.id_paket)} ${carePesan}
🚘 *Garasi:* ${dataSewa.nomor_garasi}
🚗 *Mobil:* ${localStorage.getItem('nama_mobil')}
🕓 *Status:* Menunggu Pembayaran

💳 *Metode Pembayaran:*
🏦 BNI – 1864516990
a.n. *IDA BAGUS PUTU SURYA NEGARA*

💵 *Cash On Delivery (COD):*
Dapat dilakukan saat penyerahan mobil.

💰 *Total Pembayaran:*
Rp ${formatHarga(localStorage.getItem('hargaSewa'))}

⏰ *Batas Waktu Pembayaran:*
${tambahSatuHari()}

📝 *Catatan:*
Mohon konfirmasi waktu kedatangan Anda untuk membawa mobil.

🙏 Terima kasih!`;
            sendKonfirmasi(dataSewa.nomor_telepon, pesan)
            document.querySelector('.popup-berhasil').innerHTML = `<div class="popup-container">
            <div class="popup-content js-pop-up">
                <span class="check-icon"></span>
                <div>
                    <h1>Terima Kasih!</h1>
                    <p class="secondary">Pesanan Anda telah berhasil dibuat. Silakan periksa pesan WhatsApp Anda.</p>
                </div>
                <button class="js-close-popup">Tutup</button>
            </div>
        </div>`
            document.querySelector('.js-pop-up').classList.add('pesanan-berhasil')
            addcheckIcon();
            //cronfunction
            localStorage.removeItem('nomor_garasi');
            localStorage.removeItem('otp');
            localStorage.removeItem('data-telepon');
            localStorage.removeItem('nomor_telepon')
            localStorage.removeItem('idPaket')
            localStorage.removeItem('careQty')
            localStorage.removeItem('nomor_garasi')
            document.querySelector('.js-close-popup').addEventListener('click', () => {
                setTimeout(() => {
                    window.location.href = '../index.html'
                }, 100)
            })


        } else {
            console.warn("⚠️ Gagal:", result.message);
        }
    })
    .catch(error => {
        console.error("❌ Fetch error:", error);
    });
}


