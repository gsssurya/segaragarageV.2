-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 05 Okt 2025 pada 02.54
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `segaragarage`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `garasi`
--

CREATE TABLE `garasi` (
  `nomor_garasi` int(11) NOT NULL,
  `id_sewa` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `garasi`
--

INSERT INTO `garasi` (`nomor_garasi`, `id_sewa`) VALUES
(1, 102),
(2, NULL),
(3, NULL),
(4, 101),
(5, NULL),
(6, NULL),
(7, NULL),
(8, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `paket`
--

CREATE TABLE `paket` (
  `id_paket` int(11) NOT NULL,
  `nama_paket` varchar(50) NOT NULL,
  `durasi` int(11) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `paket`
--

INSERT INTO `paket` (`id_paket`, `nama_paket`, `durasi`, `harga`) VALUES
(90001, 'paket basic', 1, 250000),
(90002, 'paket elite', 6, 1250000),
(90003, 'paket max', 12, 2250000);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nomor_telepon` varchar(15) NOT NULL,
  `nama_panggilan` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `alamat` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id_user`, `nomor_telepon`, `nama_panggilan`, `email`, `alamat`) VALUES
(1, '08734872837', 'duhgsr', 'surya@gmail.com', 'aehr'),
(2, 'null', 'duhgsr', 'surya@gmail.com', 'aehr'),
(4, '012345678', 'gussurya', 'suryanegara1209@gmail.com', 'br.tengah blahkiuh'),
(5, '081337359934', 'GusSurya', 'Suryanegara1209@gmail.com', 'br tengah blahkiuh');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `garasi`
--
ALTER TABLE `garasi`
  ADD PRIMARY KEY (`nomor_garasi`);

--
-- Indeks untuk tabel `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id_paket`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `nomor_telepon` (`nomor_telepon`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
