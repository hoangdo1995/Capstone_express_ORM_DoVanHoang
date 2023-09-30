/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comment` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `date` datetime NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`comment_id`),
  UNIQUE KEY `id` (`comment_id`) USING BTREE,
  KEY `user_id` (`user_id`),
  KEY `image_id` (`image_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `image` (
  `image_id` int NOT NULL AUTO_INCREMENT,
  `image_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image_description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`image_id`),
  UNIQUE KEY `id` (`image_id`) USING BTREE,
  KEY `user_id` (`user_id`),
  CONSTRAINT `image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `storage_image` (
  `user_id` int NOT NULL,
  `image_id` int NOT NULL,
  `date` datetime DEFAULT NULL,
  PRIMARY KEY (`image_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `storage_image_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON UPDATE CASCADE,
  CONSTRAINT `storage_image_ibfk_2` FOREIGN KEY (`image_id`) REFERENCES `image` (`image_id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT COMMENT 'EMPTY',
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `full_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `age` tinyint DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `comment` (`comment_id`, `user_id`, `image_id`, `date`, `content`) VALUES
(2, 4, 5, '2023-09-30 08:07:40', 'Hình ảnh này rất đẹp');
INSERT INTO `comment` (`comment_id`, `user_id`, `image_id`, `date`, `content`) VALUES
(3, 4, 6, '2023-09-30 08:08:15', 'Tối thích hình ảnh này');


INSERT INTO `image` (`image_id`, `image_name`, `image_link`, `image_description`, `user_id`) VALUES
(5, 'file', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1694964120247hinh.jpg', 'Hình ảnh demo', 3);
INSERT INTO `image` (`image_id`, `image_name`, `image_link`, `image_description`, `user_id`) VALUES
(6, 'file', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1694964161226hinh.jpg', 'Hình ảnh demo', 3);
INSERT INTO `image` (`image_id`, `image_name`, `image_link`, `image_description`, `user_id`) VALUES
(7, 'file', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1695141381475hinh.jpg', 'Hình ảnh demo', 3);
INSERT INTO `image` (`image_id`, `image_name`, `image_link`, `image_description`, `user_id`) VALUES
(8, 'file', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1695141412713h___372.jpg', 'Hình ảnh demo', 3),
(9, '1695141528654h___372.jpg', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1695141528654h___372.jpg', 'Hình ảnh demo', 3),
(10, 'hoangd', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1695141577866h___372.jpg', 'Hình ảnh demo', 3),
(11, '1695141602814h___372.jpg', 'E:\\backendLearn\\Captone\\Captone_Epxress_ORM/public/img/1695141602814h___372.jpg', 'Hình ảnh demo', 3);



INSERT INTO `user` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`) VALUES
(3, 'hoang@gmail.com', '$2b$10$fWSb4nuTV.tjBn.hGTDd0.wSHaNr2.y622ZHBe20CiKKCpLRF6Tl.', '1MeiChan', 12, '');
INSERT INTO `user` (`user_id`, `email`, `password`, `full_name`, `age`, `avatar`) VALUES
(4, 'hoangdo@gmail.com', '$2b$10$ePGsiKJ25/JuTlm/gCIaDeI/TziASUfVixEpvGTAAb7c0jTFVVrOi', 'Hoàng lamda', 28, 'avatar vip');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;