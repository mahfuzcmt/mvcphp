-- phpMyAdmin SQL Dump
-- version 4.0.10.14
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Jun 11, 2016 at 04:58 AM
-- Server version: 5.6.30
-- PHP Version: 5.4.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `lalcoden_userportal`
--

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE IF NOT EXISTS `invoices` (
  `oid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userID` varchar(64) NOT NULL,
  `orderID` varchar(64) NOT NULL,
  `currentStatus` varchar(64) NOT NULL DEFAULT 'unpaid',
  `updatedBy` varchar(64) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=37 ;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE IF NOT EXISTS `message` (
  `oid` bigint(20) NOT NULL AUTO_INCREMENT,
  `ticketID` varchar(128) NOT NULL,
  `text` text NOT NULL,
  `updatedBy` varchar(128) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=91 ;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`oid`, `ticketID`, `text`, `updatedBy`, `updatedOn`) VALUES
(87, '26', 'When i''m trying to change a password for my user , the system show me some errors.', 'sazal', '2016-05-25 17:37:58'),
(88, '26', 'Please hurry up!', 'sazal', '2016-05-25 17:38:33'),
(89, '26', 'Please try again.', 'mahfuz', '2016-05-25 17:39:54'),
(90, '26', 're', 'mahfuz', '2016-06-10 10:27:06');

-- --------------------------------------------------------

--
-- Table structure for table `operationlog`
--

CREATE TABLE IF NOT EXISTS `operationlog` (
  `oid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userID` varchar(64) NOT NULL,
  `operation` varchar(512) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oid`),
  UNIQUE KEY `oid` (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=395 ;

--
-- Dumping data for table `operationlog`
--

INSERT INTO `operationlog` (`oid`, `userID`, `operation`, `time`) VALUES
(394, 'mahfuz', 'login', '2016-06-11 09:21:42'),
(393, 'Shadik18', 'login', '2016-06-11 09:12:02'),
(392, 'test', 'logout', '2016-06-11 06:00:19'),
(391, 'test', 'login', '2016-06-11 05:59:56'),
(390, 'mahfuz', 'login', '2016-06-11 05:58:48'),
(389, 'mahfuz', 'logout', '2016-06-11 02:43:58'),
(388, 'mahfuz', 'login', '2016-06-11 02:41:07'),
(387, 'mahfuz', 'logout', '2016-06-11 02:40:57'),
(386, 'mahfuz', 'login', '2016-06-11 02:40:53'),
(385, 'sazal', 'logout', '2016-06-10 12:19:51'),
(384, 'sazal', 'login', '2016-06-10 12:19:25'),
(383, 'sazal', 'login', '2016-06-10 12:19:22'),
(382, 'mahfuz', 'logout', '2016-06-10 12:19:18'),
(381, 'mahfuz', 'login', '2016-06-10 12:19:15'),
(380, 'mahfuz', 'logout', '2016-06-10 12:19:05'),
(379, 'mahfuz', 'login', '2016-06-10 12:18:58'),
(378, 'mahfuz', 'logout', '2016-06-10 12:17:10'),
(377, 'mahfuz', 'login', '2016-06-10 12:17:00'),
(376, 'mahfuz', 'login', '2016-06-10 10:26:55'),
(375, 'mahfuz', 'login', '2016-06-10 08:53:32'),
(374, 'mahfuz', 'logout', '2016-06-09 17:14:33'),
(373, 'mahfuz', 'login', '2016-06-09 17:05:06'),
(372, 'mahfuz', 'login', '2016-06-08 15:27:14'),
(371, 'mahfuz', 'login', '2016-06-07 19:55:49'),
(370, 'mahfuz', 'logout', '2016-06-07 15:41:25'),
(369, 'mahfuz', 'login', '2016-06-07 15:26:45'),
(368, 'mahfuz', 'login', '2016-06-07 13:40:01');

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

CREATE TABLE IF NOT EXISTS `orderdetail` (
  `oid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `serviceID` varchar(64) NOT NULL,
  `filePath` text,
  `userID` varchar(64) NOT NULL,
  `currentStatus` varchar(32) DEFAULT 'pending',
  `updatedBy` varchar(32) DEFAULT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=56 ;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`oid`, `serviceID`, `filePath`, `userID`, `currentStatus`, `updatedBy`, `updatedOn`) VALUES
(45, '4', '', 'sazal', 'pending', 'sazal', '2016-06-09 17:05:51'),
(46, '5', '', 'mahfuz', 'pending', 'mahfuz', '2016-06-04 16:40:54'),
(47, '9', '', 'mahfuz', 'active', 'mahfuz', '2016-05-30 17:59:21'),
(48, '10', '', 'mahfuz', 'pending', 'mahfuz', '2016-06-04 16:51:47'),
(49, '12', '', 'mahfuz', 'pending', 'mahfuz', '2016-06-04 16:55:40'),
(50, '1', '', 'mahfuz', 'pending', 'mahfuz', '2016-06-04 17:18:56'),
(51, '13', 'img/file/RoadRoughness.xls', 'mahfuz', 'active', 'mahfuz', '2016-06-04 17:39:30'),
(52, '14', 'img/file/02.RHD__RMMS__LandingPage.png', 'mahfuz', 'pending', 'mahfuz', '2016-06-07 06:04:27'),
(53, '15', 'img/file/servlet-3_1-final.pdf', 'mahfuz', 'pending', 'mahfuz', '2016-06-07 06:13:51'),
(54, '16', 'img/file/abc.csv', 'mahfuz', 'pending', 'mahfuz', '2016-06-07 06:15:47'),
(55, '17', '', 'mahfuz', 'pending', 'mahfuz', '2016-06-07 06:16:28');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE IF NOT EXISTS `role` (
  `role` varchar(512) NOT NULL,
  `menuJSON` text NOT NULL,
  `createdBy` varchar(512) NOT NULL,
  `editedBy` varchar(512) NOT NULL,
  `editedOn` varchar(6) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role`, `menuJSON`, `createdBy`, `editedBy`, `editedOn`, `createdOn`) VALUES
('developer', '{  "children": [    {      "id": "webMenu",      "url": "webMenu",      "text": "Web Menu",      "class": "fa fa-dashboard",      "enable": true,      "children": [        {          "id": "dashboard",          "url": "dashboard",          "text": "Dashboard",          "class": "fa fa-dashboard",          "enable": true,          "children": []        },        {          "id": "profile",          "url": "profile",          "text": "User Profile",          "class": "fa fa-cogs",          "enable": true,          "children": []        },        {          "id": "myServices",          "url": "myServices",          "text": "My Services",          "class": "fa fa-wrench",          "enable": false,          "children": []        },        {          "id": "transaction",          "url": "transaction",          "text": "Transaction",          "class": "fa fa-wrench",          "enable": false,          "children": []        },        {          "id": "setting",          "url": "setting",          "text": "Settings",          "class": "fa fa-wrench",          "enable": true,          "children": [            {              "id": "service",              "url": "service",              "text": "Add Service",              "class": "fa fa-book fa-fw",              "enable": true,              "children": []            },            {              "id": "servicelist",              "url": "servicelist",              "text": "Service Management",              "class": "fa fa-plus",              "enable": true,              "children": []            },            {              "id": "userlist",              "url": "userlist",              "text": "User Management",              "class": "fa fa-user",              "enable": true,              "children": []            }          ]        }      ]    }  ]}', 'mahfuz', '', '0000-0', '2016-06-04 18:02:51'),
('user', '{  "children": [    {      "id": "webMenu",      "url": "webMenu",      "text": "Web Menu",      "class": "fa fa-dashboard",      "enable": true,      "children": [        {          "id": "dashboard",          "url": "dashboard",          "text": "Dashboard",          "class": "fa fa-dashboard",          "enable": true,          "children": []        },        {          "id": "profile",          "url": "profile",          "text": "User Profile",          "class": "fa fa-cogs",          "enable": true,          "children": []        }      ]    }  ]}', 'mahfuz', '', '0000-0', '0000-00-00 00:00:00'),
('super user', '{  "children": [    {      "id": "webMenu",      "url": "webMenu",      "text": "Web Menu",      "class": "fa fa-dashboard",      "enable": true,      "children": [        {          "id": "dashboard",          "url": "dashboard",          "text": "Dashboard",          "class": "fa fa-dashboard",          "enable": true,          "children": []        },        {          "id": "profile",          "url": "profile",          "text": "User Profile",          "class": "fa fa-cogs",          "enable": true,          "children": []        },        {          "id": "myServices",          "url": "myServices",          "text": "My Services",          "class": "fa fa-wrench",          "enable": false,          "children": []        },        {          "id": "transaction",          "url": "transaction",          "text": "Transaction",          "class": "fa fa-wrench",          "enable": false,          "children": []        },        {          "id": "setting",          "url": "setting",          "text": "Settings",          "class": "fa fa-wrench",          "enable": true,          "children": [            {              "id": "service",              "url": "service",              "text": "Add Service",              "class": "fa fa-book fa-fw",              "enable": true,              "children": []            },            {              "id": "servicelist",              "url": "servicelist",              "text": "Service Management",              "class": "fa fa-plus",              "enable": true,              "children": []            },            {              "id": "userlist",              "url": "userlist",              "text": "User Management",              "class": "fa fa-user",              "enable": true,              "children": []            }          ]        }      ]    }  ]}', 'mahfuz', '', '0000-0', '2016-06-04 18:02:51');

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE IF NOT EXISTS `services` (
  `oid` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `serviceName` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `price` varchar(32) DEFAULT NULL,
  `createdBy` varchar(32) DEFAULT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=18 ;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`oid`, `serviceName`, `description`, `price`, `createdBy`, `createdOn`) VALUES
(1, 'logo design', 'will be described about logo design', '2500', 'mahfuz', '2016-05-30 16:43:38'),
(2, 'web design', 'will be described about web design', '5000', 'mahfuz', '2016-05-30 16:43:47'),
(4, 'Web app development', 'will be described about app development', '50000', 'mahfuz', '2016-05-30 16:43:58'),
(5, 'Visiting Card Design', 'will be described about visiting card design', '400', 'mahfuz', '2016-05-30 16:44:10'),
(6, 'test', 'test is a good service', '111', 'mahfuz', '2016-05-30 16:35:40'),
(8, 'ttttttttttt', 'ttttttttttttttttttttttttttttttttttttttttttttttttttttttt', '123', 'mahfuz', '2016-05-30 17:13:44'),
(9, 'test2', 'test 2 details', '12', 'mahfuz', '2016-05-30 17:54:59'),
(10, 'SEO', '', '12000', 'mahfuz', '2016-06-04 16:51:46'),
(11, 'gg', 'gggggggggggggggggggggggggggggggg', '1111222222', 'mahfuz', '2016-06-04 16:55:02'),
(12, 'yyyy', 'gggggggggggggggggggggggggggggggg', '1111222222', 'mahfuz', '2016-06-04 16:55:40'),
(13, 'test with file', 'test with filetest with filetest with filetest with filetest with filetest with file', '1234', 'mahfuz', '2016-06-04 17:24:13'),
(14, 'test without price', 'test without pricetest without pricetest without pricetest without pricetest without pricetest without price', 'negotiable', 'mahfuz', '2016-06-07 06:04:27'),
(15, 'test with pdf', 'test with pdftest with pdftest with pdftest with pdf', 'negotiable', 'mahfuz', '2016-06-07 06:10:57'),
(16, 'csv', 'csv', 'negotiable', 'mahfuz', '2016-06-07 06:15:47'),
(17, 'dddd', 'ddddddddddddd', 'negotiable', 'mahfuz', '2016-06-07 06:16:27');

-- --------------------------------------------------------

--
-- Table structure for table `ticket`
--

CREATE TABLE IF NOT EXISTS `ticket` (
  `oid` bigint(20) NOT NULL AUTO_INCREMENT,
  `userID` varchar(128) NOT NULL,
  `topic` varchar(256) NOT NULL,
  `updatedBy` varchar(128) NOT NULL,
  `updatedOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `currentStatus` varchar(128) DEFAULT 'open',
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=27 ;

--
-- Dumping data for table `ticket`
--

INSERT INTO `ticket` (`oid`, `userID`, `topic`, `updatedBy`, `updatedOn`, `currentStatus`) VALUES
(26, 'sazal', '[Web app development] I can''t change the User''s password', 'sazal', '2016-06-10 10:27:01', 'open');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `userID` varchar(256) NOT NULL,
  `fullName` varchar(512) NOT NULL,
  `company` varchar(512) NOT NULL,
  `password` varchar(256) NOT NULL,
  `mobile` varchar(128) NOT NULL,
  `email` varchar(512) NOT NULL,
  `role` varchar(32) DEFAULT 'user',
  `currentStatus` varchar(256) NOT NULL DEFAULT 'Active',
  `balance` int(128) NOT NULL,
  `imagePath` varchar(512) NOT NULL,
  `createdOn` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `editedby` varchar(512) DEFAULT NULL,
  `editedon` varchar(512) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `fullName`, `company`, `password`, `mobile`, `email`, `role`, `currentStatus`, `balance`, `imagePath`, `createdOn`, `editedby`, `editedon`) VALUES
('mahfuz', 'Mahfuz Ahmed', 'bitSoft Bangladesh', '123', '1975585960', 'mahfuzcmt@gmail.com', 'developer', 'Active', 1233333, 'img/photo/12790965_981711315208231_3121597404760097172_n.jpg', '2016-05-25 09:41:39', '', '0000-00-00 00:00:00'),
('sazal', 'Sazal Kumar', 'bitSoft BD', '1234', '1912725330', 'kanakcse1@gmail.com', 'user', 'Active', 0, 'img/photo/heartfelt-birthday-wishes-to-wish-your-friend-a-happy-birthday-1.jpg', '2016-06-07 15:27:06', NULL, NULL),
('Shadik18', 'Shadik', 'UDVOB', 'shadik1995', '8801521216820', 'pritom5shadik@gmail.com', 'super user', 'Active', 0, 'img/photo/13405668_718502541623998_1845690308_o.png', '2016-06-11 09:11:28', NULL, '2016-05-02 09:36:06'),
('test', 'mahfuz ahmed', 'bitsoft', 'mahfuz', '01975585960', 'mahfuz.ahmed@spectrum-bd.com', 'user', 'Active', 0, '', '2016-06-11 05:58:24', NULL, NULL);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
