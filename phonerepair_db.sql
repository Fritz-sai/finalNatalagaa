-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 18, 2025 at 02:52 AM
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
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `contact` varchar(50) NOT NULL,
  `phone_model` varchar(100) NOT NULL,
  `issue` text NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL,
  `status` enum('pending','in_progress','completed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `status_message` text DEFAULT NULL,
  `proof_image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `name`, `contact`, `phone_model`, `issue`, `date`, `time`, `status`, `created_at`, `status_message`, `proof_image`) VALUES
(1, NULL, 'Alex Johnson', '+1 555-1234', 'iPhone 13 Pro', 'Cracked screen replacement', '2025-11-11', '10:00:00', 'completed', '2025-11-10 03:40:04', NULL, NULL),
(2, NULL, 'Maria Chen', '+1 555-9876', 'Samsung Galaxy S22', 'Battery drains quickly', '2025-11-12', '14:30:00', 'completed', '2025-11-10 03:40:04', NULL, NULL),
(3, NULL, 'cy', '09663978744', 'iphone', 'lcd', '2025-11-10', '13:15:00', 'completed', '2025-11-10 03:42:07', NULL, NULL),
(4, NULL, 'haha', '09663978744', 'iphone', 'awd', '2025-11-10', '13:20:00', 'completed', '2025-11-10 03:43:02', NULL, NULL),
(5, NULL, 'awd', '09663978744', 'iphone', 'awd', '2025-11-12', '13:56:00', 'cancelled', '2025-11-10 03:56:45', 'awd', NULL),
(6, NULL, 'sai', 'awd', 'awd', 'awd', '2025-10-27', '15:20:00', 'completed', '2025-11-10 04:20:08', NULL, NULL),
(7, NULL, 'sai', 'awd', 'awd', 'awd', '2025-11-20', '15:40:00', 'completed', '2025-11-10 04:37:02', NULL, 'uploads/proofs/booking_proof_7_1762839822.PNG'),
(8, NULL, 'awd', 'navarrofritz4@gmail.com', 'iphnea', 'awd', '2025-11-19', '12:16:00', 'cancelled', '2025-11-10 14:16:25', 'were close', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `message` text NOT NULL,
  `type` enum('order','booking','general') DEFAULT 'general',
  `reference_id` int(11) DEFAULT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `title`, `message`, `type`, `reference_id`, `is_read`, `created_at`) VALUES
(1, 3, 'Order Rejected', 'Unfortunately your order for Fast Wireless Charger was rejected.\nReason: wala', 'order', NULL, 1, '2025-11-10 14:35:43'),
(2, 3, 'Order Rejected', 'Unfortunately your order for Protective Case was rejected.\nReason: wala', 'order', NULL, 1, '2025-11-10 14:35:50'),
(3, 3, 'Order Rejected', 'Unfortunately your order for Fast Wireless Charger was rejected.\nReason: wala', 'order', NULL, 1, '2025-11-10 14:36:40'),
(4, 3, 'Order Approved', 'Your order for Protective Case is now being processed. We will keep you updated!', 'order', NULL, 1, '2025-11-11 05:08:55'),
(5, 2, 'Order Approved', 'Your order for Protective Case is now being processed. We will keep you updated!', 'order', NULL, 1, '2025-11-11 06:12:07'),
(6, 2, 'Order Approved', 'Your order for Noise Cancelling Earbuds is now being processed. We will keep you updated!', 'order', NULL, 1, '2025-11-11 06:12:09'),
(7, 2, 'Order Approved', 'Your order for Protective Case is now being processed. We will keep you updated!', 'order', NULL, 1, '2025-11-11 06:12:10'),
(8, 2, 'Order Approved', 'Your order for Noise Cancelling Earbuds is now being processed. We will keep you updated!', 'order', NULL, 1, '2025-11-11 06:12:10'),
(9, 3, 'Order Approved', 'Your order has been approved and is now being processed!', 'order', 2, 0, '2025-11-17 14:37:00'),
(10, 3, 'Order Approved', 'Your order has been approved and is now being processed!', 'order', 3, 0, '2025-11-17 14:38:02'),
(11, 2, 'Order Rejected', 'Your order has been rejected. Reason: bawal', 'order', 2, 1, '2025-11-17 15:38:41'),
(12, 2, 'Order Approved', 'Your order has been approved and is now being processed!', 'order', 3, 0, '2025-11-18 01:34:08');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','processing','completed','cancelled') DEFAULT 'pending',
  `delivery_type` enum('pickup','delivery') DEFAULT 'pickup',
  `shipping_fee` decimal(10,2) DEFAULT 0.00,
  `proof_image` varchar(255) DEFAULT NULL,
  `order_status` enum('pending','out_for_delivery','delivered','received') DEFAULT 'pending',
  `status_message` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `product_id`, `quantity`, `total`, `order_date`, `status`, `delivery_type`, `shipping_fee`, `proof_image`, `order_status`, `status_message`) VALUES
(2, 2, 2, 1, 39.99, '2025-11-10 04:17:32', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_2_1762749349.jpg', 'delivered', NULL),
(3, 2, 3, 1, 24.99, '2025-11-10 04:17:32', 'cancelled', 'pickup', 0.00, NULL, 'delivered', 'awdd'),
(6, 3, 2, 1, 39.99, '2025-11-10 14:20:21', 'cancelled', 'pickup', 0.00, NULL, '', 'wala'),
(7, 3, 3, 1, 24.99, '2025-11-10 14:20:21', 'cancelled', 'pickup', 0.00, NULL, '', 'wala'),
(8, 3, 2, 1, 39.99, '2025-11-10 14:36:28', 'cancelled', 'pickup', 0.00, NULL, 'out_for_delivery', 'wala'),
(9, 3, 3, 1, 24.99, '2025-11-10 14:36:28', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_9_1762838669.PNG', 'delivered', NULL),
(10, 2, 3, 1, 24.99, '2025-11-11 05:55:21', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_10_1762840542.PNG', 'delivered', NULL),
(11, 2, 4, 1, 79.99, '2025-11-11 05:55:21', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_11_1762840553.PNG', 'pending', NULL),
(12, 2, 4, 1, 79.99, '2025-11-11 06:11:47', 'processing', 'pickup', 0.00, NULL, 'pending', NULL),
(13, 2, 3, 1, 24.99, '2025-11-11 06:11:47', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_13_1762841541.PNG', 'delivered', NULL),
(15, 3, 2, 2, 79.98, '2025-11-11 06:19:06', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_15_1762842891.PNG', 'delivered', NULL),
(16, 3, 3, 1, 24.99, '2025-11-11 06:19:06', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_16_1763390200.JPG', 'delivered', NULL),
(18, 2, 2, 1, 39.99, '2025-11-17 14:38:51', 'cancelled', 'pickup', 0.00, NULL, 'pending', 'bawal'),
(19, 2, 3, 1, 24.99, '2025-11-17 14:38:51', 'processing', 'pickup', 0.00, 'uploads/proofs/proof_19_1763430597.jpg', 'delivered', NULL),
(20, 2, 4, 1, 79.99, '2025-11-17 14:38:51', 'pending', 'pickup', 0.00, NULL, 'pending', NULL);

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

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `user_id`, `product_id`, `order_id`, `rating`, `comment`, `created_at`) VALUES
(2, 2, 2, 2, 1, 'awdwa', '2025-11-11 05:50:03'),
(3, 2, 3, 10, 4, 'wdaw', '2025-11-11 06:00:33'),
(4, 2, 4, 11, 2, 'wdaw', '2025-11-11 06:02:17'),
(5, 3, 3, 9, 4, 'esf', '2025-11-11 06:13:24'),
(7, 3, 2, 15, 4, 'awd', '2025-11-11 06:35:05'),
(8, 2, 3, 19, 3, 'gandaaa', '2025-11-18 01:51:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('customer','admin') NOT NULL DEFAULT 'customer',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`, `active`) VALUES
(1, 'Site Admin', 'admin@phonerepair.com', '$2y$10$2y7E/ZNH5qbprz66.iqdGOGBTT4VTdFHvJ/2Mhl18mbUL9AC0LHe2', 'admin', '2025-11-10 03:40:04', 1),
(2, 'sai', 'navarrofrittz4@gmail.com', '$2y$10$HFUOomGVZVSiF/Rlgtlz0uvo7aM.ESZF9ZxpAINly5ECb9SjW3f.y', 'customer', '2025-11-10 04:17:12', 0),
(3, 'awd', 'navarrofritz4@gmail.com', '$2y$10$FZ8.YElFK7/odUA44hkvS.C9uJM.QLalt.2DbFUiN0F9MUECKPZE2', 'customer', '2025-11-10 14:15:47', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_order_review` (`order_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
