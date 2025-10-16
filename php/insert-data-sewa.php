<?php
include 'koneksi.php';
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode(["status" => "error", "message" => "Data tidak valid"]);
    exit;
}

$nomor_garasi   = $data['nomor_garasi'] ?? '';
$nomor_telepon  = $data['nomor_telepon'] ?? '';
$id_paket       = (int)($data['id_paket'] ?? 0);
$total_harga    = (int)($data['total_harga'] ?? 0);
$nama_mobil     = $data['nama_mobil'] ?? '';
$penawaran      = (int)($data['penawaran'] ?? 0);
$status         = $data['status'] ?? 'menunggu';

$stmt = $conn->prepare("
    INSERT INTO dataSewa 
    (nomor_garasi, nomor_telepon, id_paket, total_harga, nama_mobil, penawaran, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
");

$stmt->bind_param(
    "ssiisss",
    $nomor_garasi,
    $nomor_telepon,
    $id_paket,
    $total_harga,
    $nama_mobil,
    $penawaran,
    $status
);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Data berhasil disimpan!",
        "id_sewa" => $conn->insert_id
    ]);
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

