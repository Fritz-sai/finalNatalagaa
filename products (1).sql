-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2025 at 02:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `phonerepair_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image` varchar(255) DEFAULT 'images/placeholder.png',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(100) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `image`, `created_at`, `category`, `stock`) VALUES
(2, 'Fast Wireless Charger', '15W fast wireless charging pad with USB-C compatibility.', 700.00, 'admin/assets/uploads/1763394646_ae857540.jpg', '2025-11-10 03:40:04', 'Wireless Chargers', 10),
(3, 'Protective Case', 'Slim shockproof case available in multiple colors.', 100.00, 'admin/assets/uploads/1763394601_88cb0cc4.jpg', '2025-11-10 03:40:04', 'Phone Cases', 10),
(4, 'Noise Cancelling Earbuds', 'Wireless earbuds with active noise cancellation and 24-hour battery life.', 300.00, 'admin/assets/uploads/1763425973_a0e80dd6.jpg', '2025-11-10 03:40:04', 'Headphones & Earphones', 10),
(9, 'Screen Protector', 'This screen protector offers clear viewing and strong daily protection keep your phone safe always', 150.00, 'admin/assets/uploads/1763427721_bb503ee8.jpg', '2025-11-18 00:42:19', 'Screen Protectors', 12),
(10, 'Power Bank for MagSafe 10800mAh Magnetic Power Bank Portable', 'offering strong hold, fast charging, and reliable portable power wherever you go.', 500.00, 'admin/assets/uploads/1763428108_5dd1d2a0.jpg', '2025-11-18 01:08:28', 'Power Banks', 5),
(11, 'Topmake Car Phone Holder Mount, H434, Black', 'The Topmake H434 Car Phone Holder Mount offers a secure, adjustable, and stable grip for your device.', 100.00, 'admin/assets/uploads/1763428211_e8b28be0.jpg', '2025-11-18 01:10:11', 'Phone Holders', 20);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
