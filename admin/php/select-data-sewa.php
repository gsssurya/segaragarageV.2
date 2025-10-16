<?php 
include '../../php/koneksi.php';

try {
    $stmt = $conn->prepare("
        SELECT 
            a.id_sewa,
            a.id_paket, 
            c.nomor_garasi, 
            a.nama_mobil, 
            a.url, 
            a.penawaran, 
            b.nama_panggilan
        FROM dataSewa AS a
        INNER JOIN users AS b 
            ON a.nomor_telepon = b.nomor_telepon
        INNER JOIN garasi AS c 
            ON c.id_sewa = a.id_sewa
    ");

    if (!$stmt) {
        throw new Exception("Gagal mempersiapkan statement: " . $conn->error);
    }

    $stmt->execute();
    $result = $stmt->get_result();

    $dataSewaGarasi = [];
    while ($row = $result->fetch_assoc()) {
        $dataSewaGarasi[] = $row;
    }

    header('Content-Type: application/json');
    echo json_encode($dataSewaGarasi);

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => $e->getMessage()]);
}
?>
