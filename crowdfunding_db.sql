-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主机： 127.0.0.1
-- 生成日期： 2024-09-13 14:23:21
-- 服务器版本： 10.4.32-MariaDB
-- PHP 版本： 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `crowdfunding_db`
--

-- --------------------------------------------------------

--
-- 表的结构 `category`
--

CREATE TABLE `category` (
  `CATEGORY_ID` int(11) NOT NULL,
  `NAME` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `category`
--

INSERT INTO `category` (`CATEGORY_ID`, `NAME`) VALUES
(1, 'Health'),
(2, 'Education'),
(3, 'Emergency'),
(4, 'Environment'),
(5, 'Community');

-- --------------------------------------------------------

--
-- 表的结构 `fundraiser`
--

CREATE TABLE `fundraiser` (
  `FUNDRAISE_ID` int(11) NOT NULL,
  `ORGANIZER` varchar(255) NOT NULL,
  `CAPTION` varchar(255) DEFAULT NULL,
  `TARGET_fund` decimal(10,2) DEFAULT NULL,
  `CURRENT_fund` decimal(10,2) DEFAULT NULL,
  `CITY` varchar(100) DEFAULT NULL,
  `EVENT` text DEFAULT NULL,
  `CATEGORY_ID` int(11) DEFAULT NULL,
  `IS_ACTIVE` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 转存表中的数据 `fundraiser`
--

INSERT INTO `fundraiser` (`FUNDRAISE_ID`, `ORGANIZER`, `CAPTION`, `TARGET_fund`, `CURRENT_fund`, `CITY`, `EVENT`, `CATEGORY_ID`, `IS_ACTIVE`) VALUES
(1, 'John Doe', 'Help me save the planet', 10000.00, 5000.00, 'New York', 'We are organizing a tree plantation event.', 4, 1),
(4, 'Alice', 'Help with homeless people', 12000.00, 3000.00, 'New York', 'We are providing a temporary home for those homeless.', 4, 1),
(5, 'Peter', 'Rebuilding the burned house', 23500.00, 1800.00, 'San Francisco', 'Rebuild and redecorate the house', 3, 1),
(6, 'John Doe', 'Save the Rainforest', 10000.00, 2500.00, 'New York', 'Raising funds to save the rainforest.', 1, 1),
(7, 'Jane Smith', 'Help Homeless Pets', 5000.00, 1200.00, 'Los Angeles', 'Help us provide shelter for homeless pets.', 5, 1),
(8, 'Mike Johnson', 'Tech for Kids', 15000.00, 4000.00, 'San Francisco', 'Funding technology education for underprivileged kids.', 2, 0),
(9, 'Emily White', 'Clean Water Project', 20000.00, 8000.00, 'Chicago', 'Access to clean water for remote villages.', 4, 1),
(10, 'David Green', 'Books for Everyone', 7500.00, 3000.00, 'Boston', 'Bringing literacy to underdeveloped regions.', 2, 1);

--
-- 转储表的索引
--

--
-- 表的索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`CATEGORY_ID`);

--
-- 表的索引 `fundraiser`
--
ALTER TABLE `fundraiser`
  ADD PRIMARY KEY (`FUNDRAISE_ID`),
  ADD KEY `CATEGORY_ID` (`CATEGORY_ID`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `category`
--
ALTER TABLE `category`
  MODIFY `CATEGORY_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 使用表AUTO_INCREMENT `fundraiser`
--
ALTER TABLE `fundraiser`
  MODIFY `FUNDRAISE_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- 限制导出的表
--

--
-- 限制表 `fundraiser`
--
ALTER TABLE `fundraiser`
  ADD CONSTRAINT `fundraiser_ibfk_1` FOREIGN KEY (`CATEGORY_ID`) REFERENCES `category` (`CATEGORY_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
