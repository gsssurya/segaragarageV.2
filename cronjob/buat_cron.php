<?php
// waktu sekarang + 30 detik
$time = time() + 30;
$minute = date('i', $time);
$hour   = date('H', $time);
$day    = date('d', $time);
$month  = date('m', $time);

// path php dan file yang mau dijalankan
$php_path = '/usr/bin/php';
$script_path = '/home/u1234567/domains/namadomainmu.com/public_html/segaraGarage/cronjob/kirim_fonnte.php';

// buat command cron
$cron_command = "$minute $hour $day $month * $php_path $script_path >> /home/u1234567/domains/namadomainmu.com/public_html/segaraGarage/cronjob/cron_log.txt 2>&1";

// tambahkan ke crontab user sekarang
exec("(crontab -l ; echo '$cron_command') | crontab -");

echo json_encode(["status" => "success", "message" => "Cron job dibuat, akan jalan 30 detik lagi."]);
//Ganti u1234567 dan namadomainmu.com sesuai akun Hostinger kamu.

//Jalur /usr/bin/php biasanya sudah benar untuk Hostinger.
?>
