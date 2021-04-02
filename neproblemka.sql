CREATE DATABASE neproblemka;
USE neproblemka;

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


CREATE TABLE `cheque` (
  `id` int NOT NULL,
  `idPaymentOrder` int NOT NULL,
  `amount` int NOT NULL,
  `date` int NOT NULL,
  `secretKey` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `clients` (
  `id` int NOT NULL,
  `mail` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `telegramID` int DEFAULT NULL,
  `phoneNumber` int DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `documents` (
  `id` int NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `pathDisk` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `documentTelegramId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `idClient` int NOT NULL,
  `description` text NOT NULL,
  `documentID` int DEFAULT NULL,
  `typeWorkID` int NOT NULL,
  `stateOfOrder` int NOT NULL,
  `date` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `paymentorder` (
  `id` int NOT NULL,
  `idOrder` int NOT NULL,
  `price` int NOT NULL,
  `dateEnd` int DEFAULT NULL,
  `promoCodeID` int DEFAULT NULL,
  `otherDiscount` int DEFAULT '0',
  `separate` tinyint(1) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `promocodes` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `discount` int NOT NULL,
  `typeOfCode` tinyint(1) NOT NULL,
  `limitUsing` int NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `typeofwork` (
  `id` int NOT NULL,
  `type` varchar(255) NOT NULL,
  `state` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


ALTER TABLE `cheque`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `idPaymentOrder` (`idPaymentOrder`);

ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `telegramID` (`telegramID`),
  ADD KEY `id` (`id`);

ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `idClient` (`idClient`),
  ADD KEY `document` (`documentID`),
  ADD KEY `typeWorkID` (`typeWorkID`);

ALTER TABLE `paymentorder`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `idOrder` (`idOrder`),
  ADD KEY `promoCodeID` (`promoCodeID`);

ALTER TABLE `promocodes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `code` (`code`),
  ADD KEY `id` (`id`);

ALTER TABLE `typeofwork`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);


ALTER TABLE `cheque`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `documents`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `paymentorder`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `promocodes`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

ALTER TABLE `typeofwork`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;


ALTER TABLE `cheque`
  ADD CONSTRAINT `cheque_ibfk_1` FOREIGN KEY (`idPaymentOrder`) REFERENCES `paymentorder` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`idClient`) REFERENCES `clients` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`documentID`) REFERENCES `documents` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`typeWorkID`) REFERENCES `typeofwork` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

ALTER TABLE `paymentorder`
  ADD CONSTRAINT `paymentorder_ibfk_1` FOREIGN KEY (`idOrder`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `paymentorder_ibfk_2` FOREIGN KEY (`promoCodeID`) REFERENCES `promocodes` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
