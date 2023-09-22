
CREATE DATABASE IF NOT EXISTS `my_dreamerly`;
USE `my_dreamerly`;

/*Table structure for table `users` */

DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `lang` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `currency` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*Data for the table `users` */

insert  into `users`(`id`,`email`,`password`,`display_name`,`phone`,`avatar`,`lang`,`currency`,`remember_token`) values 
(1,'nguyenkimdien02@gmail.com','246357',N'Nguyễn Kim Điền','988162753','nguyen-kim-dien.png','vi','VND',NULL),
(16,'tranthithusuong@dienkim.vn','246357',N'Trần Thị Thu Sương','902367851','paper-1.jpg','vi','VND',NULL),
(17,'nguyenthihuong@dienkim.vn','246357',N'Nguyễn Thị Hương','901234567','paper-2.jpg','vi','VND',NULL),
(18,'dothitrinh@dienkim.vn','246357',N'Đỗ Thị Trinh','956702341','paper-3.jpg','vi','VND',NULL),
(19,'tranthingocmai@dienkim.vn','246357',N'Trần Thị Ngọc Mai','967082341','paper-4.jpg','vi','VND',NULL),
(20,'lythuongkiet123@dienkim.vn','246357',N'Lý Thường Kiệt','902345671','paper-6.jpg','vi','VND',NULL),
(21,'lythaito@dienkim.vn','246357',N'Lý Thái Tổ','956702381','paper-7.jpg','vi','VND',NULL),
(22,'dienbienphu@dienkim.vn','246357',N'Điện Biên Phủ','912356708','paper-8.jpg','vi','VND',NULL),
(23,'nguyenthaihoc@dienkim.vn','246357',N'Nguyễn Thái Học','905678231','paper-10.jpg','vi','VND',NULL),
(24,'buidinhcuong@dienkim.vn','246357',N'Bùi Đình Cường','904567841','paper-11.jpg','vi','VND',NULL),
(25,'buixuanthuan@dienkim.vn','246357',N'Bùi Xuân Thuận','924567081','paper-12.jpg','vi','VND',NULL),
(26,'phamhonganh@dienkim.vn','246357',N'Phạm Hồng Anh','945078231','paper-13.jpg','vi','VND',NULL),
(27,'dangvanthanh@dienkim.vn','246357',N'Đặng Văn Thành','987023641','paper-14.jpg','vi','VND',NULL),
(28,'danghonganh@dienkim.vn','246357',N'Đặng Hồng Anh','923456789','paper-15.jpg','vi','VND',NULL),
(29,'tranthixanh@dienkim.vn','246357',N'Trần Thị Xanh','914567023','paper-16.jpg','vi','VND',NULL),
(30,'lethidua@dienkim.vn','246357',N'Lê Thị Dừa','914567045',NULL,'vi','VND',NULL),
(31,'vudinhthai@dienkim.vn','246357',N'Vũ Đình Thái','902345671',NULL,'vi','VND',NULL),
(32,'levandai@dienkim.vn','246357',N'Lê Văn Đại','956027130',NULL,'vi','VND',NULL),
(33,'phamdinhcuong@dienkim.vn','246357',N'Phạm Đình Cường','925670281',NULL,'vi','VND',NULL),
(34,'vinhthienkim@dienkim.vn','246357',N'Vĩnh Thiên Kim','907234561','paper-1.jpg','vi','VND',NULL),
(35,'dinhbolinh@dienkim.vn','246357',N'Đinh Bộ Lĩnh','902356781',NULL,'vi','VND',NULL),
(36,'tranthichan@dienkim.vn','246357',N'Trần Thị Chân','914567802',NULL,'vi','VND',NULL),
(37,'trieuthida@dienkim.vn','246357',N'Triệu Thị Đà','902367891','paper-1.jpg','vi','VND',NULL),
(38,'vothikimngan@dienkim.vn','246357',N'Võ Thị Kim Ngân','912345671',NULL,'vi','VND',NULL),
(39,'tranthiloi@dienkim.vn','246357',N'Trần Thị Lợi','946708251',NULL,'vi','VND',NULL),
(40,'daothimo@dienkim.vn','246357',N'Đào Thị Mỏ','903456781','paper-8.jpg','vi','VND',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
