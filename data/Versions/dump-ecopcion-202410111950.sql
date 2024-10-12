-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: ecopcion
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.24.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `AccountsBooks`
--

DROP TABLE IF EXISTS `AccountsBooks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountsBooks` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `registrationDate` datetime NOT NULL,
  `transactionDate` datetime NOT NULL,
  `transactionType` varchar(255) NOT NULL,
  `creditCash` varchar(255) NOT NULL,
  `meanPayment` varchar(255) DEFAULT NULL,
  `otherExpenses` varchar(255) DEFAULT NULL,
  `initialDate` datetime DEFAULT NULL,
  `finalDate` datetime DEFAULT NULL,
  `itemsSold` json DEFAULT NULL,
  `itemsBuy` json DEFAULT NULL,
  `otherIncomes` varchar(255) DEFAULT NULL,
  `totalValue` int NOT NULL,
  `creditDescription` varchar(255) DEFAULT NULL,
  `creditWithInterest` varchar(255) DEFAULT NULL,
  `creditInterestRate` varchar(255) DEFAULT NULL,
  `numberOfPayments` int DEFAULT NULL,
  `paymentValue` int DEFAULT NULL,
  `paymentNumber` int DEFAULT NULL,
  `accountsReceivable` int DEFAULT NULL,
  `accountsPayable` int DEFAULT NULL,
  `transactionCounterpartId` varchar(255) NOT NULL,
  `transactionApproved` tinyint(1) NOT NULL DEFAULT '0',
  `seller` varchar(255) DEFAULT NULL,
  `userRegister` varchar(255) DEFAULT NULL,
  `pay` varchar(255) DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `AccountsBooks_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `AccountsBooks_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountsBooks`
--

LOCK TABLES `AccountsBooks` WRITE;
/*!40000 ALTER TABLE `AccountsBooks` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccountsBooks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccountsPayables`
--

DROP TABLE IF EXISTS `AccountsPayables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountsPayables` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transactionDate` datetime NOT NULL,
  `transactionCounterpartId` varchar(255) NOT NULL,
  `creditDescription` varchar(255) NOT NULL,
  `stateAccount` varchar(255) DEFAULT NULL,
  `creditWithInterest` varchar(255) DEFAULT NULL,
  `creditInterestRate` varchar(255) DEFAULT NULL,
  `initialValue` int DEFAULT NULL,
  `initialNumberOfPayments` int DEFAULT NULL,
  `paymentValue` int DEFAULT NULL,
  `currentBalance` int DEFAULT NULL,
  `pendingNumberOfPayments` int DEFAULT NULL,
  `creditPayments` json DEFAULT NULL,
  `cancellationDate` datetime DEFAULT NULL,
  `seller` varchar(255) DEFAULT NULL,
  `accountsBookId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `assetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `merchandiseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `rawMaterialId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `serviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accountsBookId` (`accountsBookId`),
  KEY `assetId` (`assetId`),
  KEY `merchandiseId` (`merchandiseId`),
  KEY `productId` (`productId`),
  KEY `rawMaterialId` (`rawMaterialId`),
  KEY `serviceId` (`serviceId`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `AccountsPayables_ibfk_1` FOREIGN KEY (`accountsBookId`) REFERENCES `AccountsBooks` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_2` FOREIGN KEY (`assetId`) REFERENCES `Assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_3` FOREIGN KEY (`merchandiseId`) REFERENCES `Merchandises` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_4` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_5` FOREIGN KEY (`rawMaterialId`) REFERENCES `RawMaterials` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_6` FOREIGN KEY (`serviceId`) REFERENCES `Services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_7` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AccountsPayables_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountsPayables`
--

LOCK TABLES `AccountsPayables` WRITE;
/*!40000 ALTER TABLE `AccountsPayables` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccountsPayables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `AccountsReceivables`
--

DROP TABLE IF EXISTS `AccountsReceivables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `AccountsReceivables` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `transactionDate` datetime NOT NULL,
  `transactionCounterpartId` varchar(255) NOT NULL,
  `creditDescription` varchar(255) NOT NULL,
  `stateAccount` varchar(255) DEFAULT NULL,
  `creditWithInterest` varchar(255) DEFAULT NULL,
  `creditInterestRate` varchar(255) DEFAULT NULL,
  `initialValue` int DEFAULT NULL,
  `initialNumberOfPayments` int DEFAULT NULL,
  `paymentValue` int DEFAULT NULL,
  `currentBalance` int DEFAULT NULL,
  `pendingNumberOfPayments` int DEFAULT NULL,
  `creditPayments` json DEFAULT NULL,
  `cancellationDate` datetime DEFAULT NULL,
  `seller` varchar(255) DEFAULT NULL,
  `accountsBookId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `assetId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `merchandiseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `rawMaterialId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `serviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accountsBookId` (`accountsBookId`),
  KEY `assetId` (`assetId`),
  KEY `merchandiseId` (`merchandiseId`),
  KEY `productId` (`productId`),
  KEY `rawMaterialId` (`rawMaterialId`),
  KEY `serviceId` (`serviceId`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `AccountsReceivables_ibfk_1` FOREIGN KEY (`accountsBookId`) REFERENCES `AccountsBooks` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_2` FOREIGN KEY (`assetId`) REFERENCES `Assets` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_3` FOREIGN KEY (`merchandiseId`) REFERENCES `Merchandises` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_4` FOREIGN KEY (`productId`) REFERENCES `Products` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_5` FOREIGN KEY (`rawMaterialId`) REFERENCES `RawMaterials` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_6` FOREIGN KEY (`serviceId`) REFERENCES `Services` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_7` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `AccountsReceivables_ibfk_8` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `AccountsReceivables`
--

LOCK TABLES `AccountsReceivables` WRITE;
/*!40000 ALTER TABLE `AccountsReceivables` DISABLE KEYS */;
/*!40000 ALTER TABLE `AccountsReceivables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Appointments`
--

DROP TABLE IF EXISTS `Appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Appointments` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `appointmentId` int DEFAULT NULL,
  `typeClient` varchar(255) NOT NULL,
  `nameClient` varchar(255) DEFAULT NULL,
  `lastNameClient` varchar(255) DEFAULT NULL,
  `corporateName` varchar(255) DEFAULT NULL,
  `corporateNameLeader` varchar(255) DEFAULT NULL,
  `lastcorporateNameLeader` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `hour` varchar(255) NOT NULL,
  `stateAppointment` varchar(255) NOT NULL,
  `isAceptedConditions` tinyint(1) NOT NULL,
  `typeAppointment` varchar(255) DEFAULT NULL,
  `typeAppointmentIndicator` varchar(255) DEFAULT NULL,
  `typeAppointmentIndicatorFinantial` varchar(255) DEFAULT NULL,
  `typeAppointmentIndicatorMarketing` varchar(255) DEFAULT NULL,
  `typeAppointmentIndicatorSustainability` varchar(255) DEFAULT NULL,
  `typeAppointmentPlatform` varchar(255) DEFAULT NULL,
  `typeAppointmentOthers` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Appointments`
--

LOCK TABLES `Appointments` WRITE;
/*!40000 ALTER TABLE `Appointments` DISABLE KEYS */;
/*!40000 ALTER TABLE `Appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Assets`
--

DROP TABLE IF EXISTS `Assets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Assets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `barCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nameItem` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'Asset',
  `brandItem` varchar(255) DEFAULT NULL,
  `referenceItem` varchar(255) DEFAULT NULL,
  `stateAssets` varchar(255) DEFAULT NULL,
  `conditionAssets` varchar(255) DEFAULT NULL,
  `inventory` int NOT NULL DEFAULT '0',
  `purchasePriceBeforeTax` int NOT NULL DEFAULT '0',
  `sellingPrice` int DEFAULT '0',
  `isDiscounted` varchar(255) DEFAULT 'No',
  `discountPercentage` int DEFAULT '0',
  `inventoryOff` json DEFAULT NULL,
  `IVA` varchar(255) NOT NULL DEFAULT '0',
  `consumptionTax` varchar(255) NOT NULL DEFAULT 'No aplica',
  `retentionType` varchar(255) DEFAULT NULL,
  `withholdingTax` varchar(255) DEFAULT 'No aplica',
  `withholdingIVA` varchar(255) DEFAULT 'No aplica',
  `withholdingICA` varchar(255) DEFAULT 'No aplica',
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Assets_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Assets_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Assets`
--

LOCK TABLES `Assets` WRITE;
/*!40000 ALTER TABLE `Assets` DISABLE KEYS */;
INSERT INTO `Assets` VALUES ('0a2a44f0-3750-4745-b6ff-a7de75bf1159','214312','asdf','Asset','asf','3','Dañada requiere cambio','Nuevo',324,3423,0,'No',0,'[]','0','No aplica',NULL,'No aplica','No aplica','No aplica','169ba390-17e8-46ee-a029-2e0c2b39cf8a','921309c7-692b-4c3d-8273-85f2694a91b1','2024-10-09 04:06:58','2024-10-09 04:06:58');
/*!40000 ALTER TABLE `Assets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Branches`
--

DROP TABLE IF EXISTS `Branches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Branches` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nameBranch` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `codeDane` varchar(255) DEFAULT NULL,
  `subregionCodeDane` varchar(255) DEFAULT NULL,
  `addressBranch` varchar(255) NOT NULL,
  `contactEmailBranch` varchar(255) DEFAULT NULL,
  `contactPhoneBranch` varchar(255) DEFAULT NULL,
  `nameManagerBranch` varchar(255) DEFAULT NULL,
  `lastNameManagerBranch` varchar(255) DEFAULT NULL,
  `typeDocumentIdManager` varchar(255) NOT NULL,
  `documentIdManager` varchar(255) NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Branches_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Branches`
--

LOCK TABLES `Branches` WRITE;
/*!40000 ALTER TABLE `Branches` DISABLE KEYS */;
INSERT INTO `Branches` VALUES ('169ba390-17e8-46ee-a029-2e0c2b39cf8a','mexico','Amazonas','El Encanto','91263','91','ss','ss@gmail.com','ss','ss','ss','Cedula de Extranjeria','2312','921309c7-692b-4c3d-8273-85f2694a91b1','2024-09-23 17:41:49','2024-09-23 17:41:49');
/*!40000 ALTER TABLE `Branches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ContactUs`
--

DROP TABLE IF EXISTS `ContactUs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ContactUs` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `nameUser` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `selectedTopic` varchar(255) NOT NULL,
  `helpDescription` varchar(255) NOT NULL,
  `isAceptedConditions` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ContactUs`
--

LOCK TABLES `ContactUs` WRITE;
/*!40000 ALTER TABLE `ContactUs` DISABLE KEYS */;
/*!40000 ALTER TABLE `ContactUs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CrmClients`
--

DROP TABLE IF EXISTS `CrmClients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CrmClients` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `entityUserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `corporateName` varchar(255) DEFAULT NULL,
  `typeDocumentId` varchar(255) NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `codeDane` varchar(255) DEFAULT NULL,
  `subregionCodeDane` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `customerTrackingId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerTrackingId` (`customerTrackingId`),
  KEY `userId` (`userId`),
  CONSTRAINT `CrmClients_ibfk_1` FOREIGN KEY (`customerTrackingId`) REFERENCES `CustomerTrackings` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `CrmClients_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CrmClients`
--

LOCK TABLES `CrmClients` WRITE;
/*!40000 ALTER TABLE `CrmClients` DISABLE KEYS */;
/*!40000 ALTER TABLE `CrmClients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CrmSuppliers`
--

DROP TABLE IF EXISTS `CrmSuppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CrmSuppliers` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `entityUserId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `corporateName` varchar(255) DEFAULT NULL,
  `typeDocumentId` varchar(255) NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `verificationDigit` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `department` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `codeDane` varchar(255) DEFAULT NULL,
  `subregionCodeDane` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `CrmSuppliers_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CrmSuppliers`
--

LOCK TABLES `CrmSuppliers` WRITE;
/*!40000 ALTER TABLE `CrmSuppliers` DISABLE KEYS */;
/*!40000 ALTER TABLE `CrmSuppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CustomerTrackings`
--

DROP TABLE IF EXISTS `CustomerTrackings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `CustomerTrackings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `lastSale` datetime DEFAULT NULL,
  `newsletterSubscriber` varchar(255) DEFAULT NULL,
  `lastCall` datetime DEFAULT NULL,
  `lastEmail` datetime DEFAULT NULL,
  `lastQuotation` datetime DEFAULT NULL,
  `lastMeeting` datetime DEFAULT NULL,
  `typeMeeting` varchar(255) DEFAULT NULL,
  `accumulatedSalesValue` varchar(255) DEFAULT NULL,
  `accumulatedSalesQuantity` varchar(255) DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `CustomerTrackings_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CustomerTrackings`
--

LOCK TABLES `CustomerTrackings` WRITE;
/*!40000 ALTER TABLE `CustomerTrackings` DISABLE KEYS */;
/*!40000 ALTER TABLE `CustomerTrackings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ElectronicInvoicings`
--

DROP TABLE IF EXISTS `ElectronicInvoicings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ElectronicInvoicings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `Parametros` json DEFAULT NULL,
  `Extensiones` json DEFAULT NULL,
  `Encabezado` json DEFAULT NULL,
  `Terceros` json DEFAULT NULL,
  `Lineas` json DEFAULT NULL,
  `AgregadoComercial` json DEFAULT NULL,
  `Totales` json DEFAULT NULL,
  `accountsBookId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accountsBookId` (`accountsBookId`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `ElectronicInvoicings_ibfk_1` FOREIGN KEY (`accountsBookId`) REFERENCES `AccountsBooks` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ElectronicInvoicings_ibfk_2` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `ElectronicInvoicings_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ElectronicInvoicings`
--

LOCK TABLES `ElectronicInvoicings` WRITE;
/*!40000 ALTER TABLE `ElectronicInvoicings` DISABLE KEYS */;
/*!40000 ALTER TABLE `ElectronicInvoicings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Merchandises`
--

DROP TABLE IF EXISTS `Merchandises`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Merchandises` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `barCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nameItem` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'Merchandise',
  `brandItem` varchar(255) DEFAULT NULL,
  `packaged` varchar(255) DEFAULT 'No',
  `primaryPackageType` varchar(255) DEFAULT NULL,
  `individualPackaging` varchar(255) DEFAULT 'No',
  `secondaryPackageType` varchar(255) DEFAULT NULL,
  `quantityPerPackage` int DEFAULT NULL,
  `returnablePackaging` varchar(255) DEFAULT 'No',
  `inventory` int NOT NULL DEFAULT '0',
  `unitMeasure` varchar(255) NOT NULL,
  `inventoryIncrease` varchar(255) DEFAULT 'No',
  `periodicityAutomaticIncrease` varchar(255) DEFAULT NULL,
  `automaticInventoryIncrease` int DEFAULT '0',
  `purchasePriceBeforeTax` int NOT NULL DEFAULT '0',
  `sellingPrice` int NOT NULL,
  `isDiscounted` varchar(255) DEFAULT 'No',
  `discountPercentage` int DEFAULT '0',
  `expirationDate` datetime DEFAULT NULL,
  `inventoryChanges` json DEFAULT NULL,
  `salesCount` int DEFAULT '0',
  `inventoryOff` json DEFAULT NULL,
  `reasonManualDiscountingInventory` varchar(255) DEFAULT NULL,
  `quantityManualDiscountingInventory` int DEFAULT NULL,
  `IVA` varchar(255) NOT NULL DEFAULT '0',
  `ivaAiu` varchar(255) DEFAULT 'No aplica',
  `consumptionTax` varchar(255) DEFAULT 'No aplica',
  `retentionType` varchar(255) DEFAULT NULL,
  `withholdingTax` varchar(255) DEFAULT 'No aplica',
  `withholdingIVA` varchar(255) DEFAULT 'No aplica',
  `withholdingICA` varchar(255) DEFAULT 'No aplica',
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Merchandises_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Merchandises_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Merchandises`
--

LOCK TABLES `Merchandises` WRITE;
/*!40000 ALTER TABLE `Merchandises` DISABLE KEYS */;
/*!40000 ALTER TABLE `Merchandises` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Newsletters`
--

DROP TABLE IF EXISTS `Newsletters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Newsletters` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `email` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Newsletters`
--

LOCK TABLES `Newsletters` WRITE;
/*!40000 ALTER TABLE `Newsletters` DISABLE KEYS */;
/*!40000 ALTER TABLE `Newsletters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Products`
--

DROP TABLE IF EXISTS `Products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `barCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nameItem` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'Product',
  `brandItem` varchar(255) DEFAULT NULL,
  `packaged` varchar(255) DEFAULT 'No',
  `primaryPackageType` varchar(255) DEFAULT NULL,
  `individualPackaging` varchar(255) DEFAULT 'No',
  `secondaryPackageType` varchar(255) DEFAULT NULL,
  `quantityPerPackage` int DEFAULT '0',
  `returnablePackaging` varchar(255) DEFAULT 'No',
  `inventory` int NOT NULL DEFAULT '0',
  `unitMeasure` varchar(255) NOT NULL,
  `inventoryIncrease` varchar(255) DEFAULT 'No',
  `periodicityAutomaticIncrease` varchar(255) DEFAULT NULL,
  `automaticInventoryIncrease` int DEFAULT '0',
  `productionPrice` int DEFAULT NULL,
  `sellingPrice` int NOT NULL DEFAULT '0',
  `isDiscounted` varchar(255) DEFAULT 'No',
  `discountPercentage` int DEFAULT NULL,
  `salesCount` int DEFAULT '0',
  `inventoryChanges` json NOT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `inventoryOff` json DEFAULT NULL,
  `reasonManualDiscountingInventory` varchar(255) DEFAULT NULL,
  `quantityManualDiscountingInventory` int DEFAULT NULL,
  `productAccesory` varchar(255) DEFAULT 'No',
  `productAccesories` json DEFAULT NULL,
  `productAsset` varchar(255) DEFAULT 'No',
  `productAssets` json DEFAULT NULL,
  `productRawMaterials` json DEFAULT NULL,
  `IVA` varchar(255) NOT NULL DEFAULT '0',
  `ivaAiu` varchar(255) DEFAULT 'No aplica',
  `consumptionTax` varchar(255) DEFAULT 'No aplica',
  `retentionType` varchar(255) DEFAULT NULL,
  `withholdingTax` varchar(255) DEFAULT 'No aplica',
  `withholdingIVA` varchar(255) DEFAULT 'No aplica',
  `withholdingICA` varchar(255) DEFAULT 'No aplica',
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Products_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Products_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Products`
--

LOCK TABLES `Products` WRITE;
/*!40000 ALTER TABLE `Products` DISABLE KEYS */;
INSERT INTO `Products` VALUES ('f3b9dffa-0a24-43fb-a5b4-981e047cdf19','2','asd','Product','sad','Si','Papel','Si','Papel',0,'Si',343,'Gramo','Si','Diario',2,NULL,1343,'No',NULL,0,'[{\"date\": \"2024-10-09T04:31:52.968Z\", \"type\": \"Ingreso\", \"quantity\": 343}]',NULL,'[]',NULL,NULL,'Si','[]','No','[]','[]','5','No aplica',NULL,'No aplica','No aplica','No aplica','No aplica','169ba390-17e8-46ee-a029-2e0c2b39cf8a','921309c7-692b-4c3d-8273-85f2694a91b1','2024-10-09 04:31:52','2024-10-09 04:31:52');
/*!40000 ALTER TABLE `Products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ProjectFunders`
--

DROP TABLE IF EXISTS `ProjectFunders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ProjectFunders` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `corporateName` varchar(255) NOT NULL,
  `typeDocumentId` varchar(255) NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `verificationDigit` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `typeRole` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'Superadmin',
  `codeCiiu` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `codeDane` varchar(255) NOT NULL,
  `subregionCodeDane` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `postalCode` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passwordResetCode` varchar(255) DEFAULT NULL,
  `passwordResetCodeDate` datetime DEFAULT NULL,
  `loginAttempts` int DEFAULT '0',
  `isBlocked` tinyint(1) DEFAULT '1',
  `unlockCode` varchar(255) DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `applicationPassword` varchar(255) DEFAULT NULL,
  `isAceptedConditions` tinyint(1) DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ProjectFunders`
--

LOCK TABLES `ProjectFunders` WRITE;
/*!40000 ALTER TABLE `ProjectFunders` DISABLE KEYS */;
/*!40000 ALTER TABLE `ProjectFunders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `RawMaterials`
--

DROP TABLE IF EXISTS `RawMaterials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RawMaterials` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `barCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `nameItem` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'RawMaterial',
  `brandItem` varchar(255) DEFAULT NULL,
  `packaged` varchar(255) DEFAULT 'No',
  `primaryPackageType` varchar(255) DEFAULT NULL,
  `individualPackaging` varchar(255) DEFAULT 'No',
  `secondaryPackageType` varchar(255) DEFAULT NULL,
  `quantityPerPackage` int DEFAULT NULL,
  `returnablePackaging` varchar(255) DEFAULT 'No',
  `inventory` int NOT NULL DEFAULT '0',
  `unitMeasure` varchar(255) NOT NULL,
  `inventoryIncrease` varchar(255) DEFAULT 'No',
  `periodicityAutomaticIncrease` varchar(255) DEFAULT NULL,
  `automaticInventoryIncrease` int DEFAULT '0',
  `purchasePriceBeforeTax` int NOT NULL DEFAULT '0',
  `sellingPrice` int DEFAULT '0',
  `isDiscounted` varchar(255) DEFAULT 'No',
  `discountPercentage` int DEFAULT NULL,
  `salesCount` int DEFAULT '0',
  `expirationDate` datetime DEFAULT NULL,
  `inventoryChanges` json DEFAULT NULL,
  `reasonManualDiscountingInventory` varchar(255) DEFAULT NULL,
  `quantityManualDiscountingInventory` int DEFAULT NULL,
  `inventoryOff` json DEFAULT NULL,
  `IVA` varchar(255) NOT NULL DEFAULT '0',
  `ivaAiu` varchar(255) DEFAULT 'No aplica',
  `consumptionTax` varchar(255) DEFAULT 'No aplica',
  `retentionType` varchar(255) DEFAULT NULL,
  `withholdingTax` varchar(255) DEFAULT 'No aplica',
  `withholdingIVA` varchar(255) DEFAULT 'No aplica',
  `withholdingICA` varchar(255) DEFAULT 'No aplica',
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `RawMaterials_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `RawMaterials_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RawMaterials`
--

LOCK TABLES `RawMaterials` WRITE;
/*!40000 ALTER TABLE `RawMaterials` DISABLE KEYS */;
/*!40000 ALTER TABLE `RawMaterials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesFunnelCustomerAcqs`
--

DROP TABLE IF EXISTS `SalesFunnelCustomerAcqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesFunnelCustomerAcqs` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `cacRegistrationDate` datetime NOT NULL,
  `cacPeriodOfAnalysis` varchar(255) NOT NULL,
  `cacAdvertisingInvestment` int NOT NULL,
  `cacSalesTeamCost` int DEFAULT NULL,
  `cacSalesComissions` int NOT NULL,
  `cacTransportCost` int NOT NULL,
  `cacEventsCost` int NOT NULL,
  `cacNewClients` int NOT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `SalesFunnelCustomerAcqs_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `SalesFunnelCustomerAcqs_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesFunnelCustomerAcqs`
--

LOCK TABLES `SalesFunnelCustomerAcqs` WRITE;
/*!40000 ALTER TABLE `SalesFunnelCustomerAcqs` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesFunnelCustomerAcqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesFunnelCustomerDigitals`
--

DROP TABLE IF EXISTS `SalesFunnelCustomerDigitals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesFunnelCustomerDigitals` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `pipelineRegistrationDate` datetime NOT NULL,
  `pipelinePeriodOfAnalysis` varchar(255) NOT NULL,
  `nameDigitalCampaign` varchar(255) NOT NULL,
  `campaignNumberOfDays` int NOT NULL,
  `campaignClicksViews` int NOT NULL,
  `interestedCustomers` int NOT NULL,
  `leads` int NOT NULL,
  `salesNumber` int NOT NULL,
  `totalValue` int NOT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `SalesFunnelCustomerDigitals_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `SalesFunnelCustomerDigitals_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesFunnelCustomerDigitals`
--

LOCK TABLES `SalesFunnelCustomerDigitals` WRITE;
/*!40000 ALTER TABLE `SalesFunnelCustomerDigitals` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesFunnelCustomerDigitals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SalesFunnelCustomerRets`
--

DROP TABLE IF EXISTS `SalesFunnelCustomerRets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SalesFunnelCustomerRets` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `crcRegistrationDate` datetime NOT NULL,
  `crcPeriodOfAnalysis` varchar(255) NOT NULL,
  `crcDiscountsInvestment` int NOT NULL,
  `crcGuarranteesCosts` int NOT NULL,
  `crcAdvertisingInvestment` int NOT NULL,
  `crcSalesTeamCost` int NOT NULL,
  `crcSalesComissions` int NOT NULL,
  `crcTransportCosts` int NOT NULL,
  `crcEventsCost` int NOT NULL,
  `crcCurrentClients` int NOT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `SalesFunnelCustomerRets_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `SalesFunnelCustomerRets_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SalesFunnelCustomerRets`
--

LOCK TABLES `SalesFunnelCustomerRets` WRITE;
/*!40000 ALTER TABLE `SalesFunnelCustomerRets` DISABLE KEYS */;
/*!40000 ALTER TABLE `SalesFunnelCustomerRets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Services`
--

DROP TABLE IF EXISTS `Services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Services` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `nameItem` varchar(255) NOT NULL,
  `type` varchar(255) DEFAULT 'Service',
  `barCode` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `sellingPrice` int DEFAULT '0',
  `serviceAssets` json DEFAULT NULL,
  `serviceProducts` json DEFAULT NULL,
  `serviceRawMaterials` json DEFAULT NULL,
  `isDiscounted` varchar(255) DEFAULT 'No',
  `discountPercentage` int DEFAULT '0',
  `salesCount` int DEFAULT '0',
  `IVA` varchar(255) NOT NULL DEFAULT '0',
  `ivaAiu` varchar(255) DEFAULT 'No aplica',
  `consumptionTax` varchar(255) DEFAULT 'No aplica',
  `retentionType` varchar(255) DEFAULT NULL,
  `withholdingTax` varchar(255) DEFAULT 'No aplica',
  `withholdingIVA` varchar(255) DEFAULT 'No aplica',
  `withholdingICA` varchar(255) DEFAULT 'No aplica',
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Services_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Services_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Services`
--

LOCK TABLES `Services` WRITE;
/*!40000 ALTER TABLE `Services` DISABLE KEYS */;
/*!40000 ALTER TABLE `Services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Sustainabilities`
--

DROP TABLE IF EXISTS `Sustainabilities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Sustainabilities` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `registrationDate` datetime DEFAULT NULL,
  `transactionDate` datetime DEFAULT NULL,
  `otherExpenses` varchar(255) DEFAULT NULL,
  `initialDate` datetime DEFAULT NULL,
  `finalDate` datetime DEFAULT NULL,
  `energyConsumption` int DEFAULT NULL,
  `waterConsumption` int DEFAULT NULL,
  `totalValue` int NOT NULL,
  `waterReuse` int DEFAULT NULL,
  `rainWaterQuantity` int DEFAULT NULL,
  `sustainabilityStrategy` varchar(255) DEFAULT NULL,
  `sustainabilityProgramsNumber` varchar(255) DEFAULT NULL,
  `sustainabilityProgramName` varchar(255) DEFAULT NULL,
  `sustainabilityProgramStartingDate` datetime DEFAULT NULL,
  `sustainabilityTopics` varchar(255) DEFAULT NULL,
  `numberSustainabilityReports` int DEFAULT NULL,
  `numberManagersInvolvedInSustainability` int DEFAULT NULL,
  `managerName` varchar(255) DEFAULT NULL,
  `managerRole` varchar(255) DEFAULT NULL,
  `numberEmployeesInvolvedInSustainability` int DEFAULT NULL,
  `numberSustainabilityTrainings` int DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `accountsBookId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `branchId` (`branchId`),
  KEY `accountsBookId` (`accountsBookId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Sustainabilities_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Sustainabilities_ibfk_2` FOREIGN KEY (`accountsBookId`) REFERENCES `AccountsBooks` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Sustainabilities_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Sustainabilities`
--

LOCK TABLES `Sustainabilities` WRITE;
/*!40000 ALTER TABLE `Sustainabilities` DISABLE KEYS */;
/*!40000 ALTER TABLE `Sustainabilities` ENABLE KEYS */;
UNLOCK TABLES;



CREATE TABLE `Quotations` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quotationNumber` int DEFAULT NULL,
  `quotationDate` datetime NOT NULL,
  `expirationDate` datetime DEFAULT NULL,
  `customerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `itemsQuoted` json DEFAULT NULL,
  `totalAmount` int NOT NULL,
  `status` varchar(255) DEFAULT 'Pending',
  `notes` text DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `customerId` (`customerId`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `Quotations_ibfk_1` FOREIGN KEY (`customerId`) REFERENCES `CrmClients` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `Quotations_ibfk_2` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `Quotations_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




--
-- Table structure for table `UserPlatforms`
--

DROP TABLE IF EXISTS `UserPlatforms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `UserPlatforms` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `typeDocumentId` varchar(255) NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `profilePicture` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `typeRole` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT 'Superadmin',
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `codeDane` varchar(255) DEFAULT '',
  `subregionCodeDane` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `isAceptedConditions` tinyint(1) DEFAULT '0',
  `passwordResetCode` varchar(255) DEFAULT NULL,
  `passwordResetCodeDate` datetime DEFAULT NULL,
  `loginAttempts` int DEFAULT '0',
  `isBlocked` tinyint(1) DEFAULT '0',
  `unlockCode` varchar(255) DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `applicationPassword` varchar(255) DEFAULT NULL,
  `branchId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `branchId` (`branchId`),
  KEY `userId` (`userId`),
  CONSTRAINT `UserPlatforms_ibfk_1` FOREIGN KEY (`branchId`) REFERENCES `Branches` (`id`) ON UPDATE CASCADE,
  CONSTRAINT `UserPlatforms_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UserPlatforms`
--

LOCK TABLES `UserPlatforms` WRITE;
/*!40000 ALTER TABLE `UserPlatforms` DISABLE KEYS */;
/*!40000 ALTER TABLE `UserPlatforms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `corporateName` varchar(255) DEFAULT NULL,
  `typeDocumentId` varchar(255) NOT NULL,
  `documentId` varchar(255) NOT NULL,
  `verificationDigit` varchar(255) DEFAULT NULL,
  `commercialName` varchar(255) DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `typeRole` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL DEFAULT 'Superadmin',
  `economicSector` varchar(255) DEFAULT NULL,
  `codeCiiu` varchar(255) DEFAULT NULL,
  `department` varchar(255) NOT NULL,
  `city` varchar(255) NOT NULL,
  `codeDane` varchar(255) DEFAULT NULL,
  `subregionCodeDane` varchar(255) DEFAULT NULL,
  `address` varchar(255) NOT NULL,
  `postalCode` varchar(255) DEFAULT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `passwordResetCode` varchar(255) DEFAULT NULL,
  `passwordResetCodeDate` datetime DEFAULT NULL,
  `loginAttempts` int DEFAULT '0',
  `isBlocked` tinyint(1) DEFAULT '0',
  `unlockCode` varchar(255) DEFAULT NULL,
  `expiresAt` datetime DEFAULT NULL,
  `emailProvider` varchar(255) DEFAULT NULL,
  `applicationPassword` varchar(255) DEFAULT NULL,
  `isAceptedConditions` tinyint(1) DEFAULT '0',
  `projectFunderId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `projectFunderId` (`projectFunderId`),
  CONSTRAINT `Users_ibfk_1` FOREIGN KEY (`projectFunderId`) REFERENCES `ProjectFunders` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES ('921309c7-692b-4c3d-8273-85f2694a91b1','luis','rangel','','Cedula de Ciudadania','324234',NULL,'luisillo',NULL,'Superadmin','Agricultura','0111','Amazonas','','','','fdsf','342','34234','luiscarlosrangel619@gmail.com','$2b$10$m2uPPr4jGrK4nP2Qzp387e.3rXOdL39TkEyr/VcwxhzExhg3.oeo6',NULL,NULL,0,0,NULL,NULL,NULL,NULL,1,NULL,'2024-09-22 22:26:20','2024-10-09 04:09:28');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;



--
-- Dumping routines for database 'ecopcion'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-11 19:50:03
