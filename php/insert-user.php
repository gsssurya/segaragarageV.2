<?php
include 'koneksi.php';

$data = json_decode(file_get_contents("php://input"), true);

$nomor_telepon = $data['nomor_telepon'];
$nama_panggilan = $data['nama_panggilan'];
$email = $data['email'];
$alamat = $data['alamat'];

$stmt = $conn->prepare("INSERT INTO users (nomor_telepon, nama_panggilan, email, alamat) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $nomor_telepon, $nama_panggilan, $email, $alamat);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Data berhasil disimpan!"]);
} else {
    if ($conn->errno === 1062) {
        echo json_encode(["status" => "error", "message" => "Nomor telepon sudah terdaftar!"]);
    } else {
        echo json_encode(["status" => "error", "message" => $conn->error]);
    }
}

$stmt->close();
$conn->close();
?>
