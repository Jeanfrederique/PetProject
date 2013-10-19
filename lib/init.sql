CREATE TABLE `People` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `FirstName` varchar(30) NOT NULL DEFAULT '',
  `LastName` varchar(30) NOT NULL DEFAULT '',
  `Age` mediumint(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=324 DEFAULT CHARSET=utf8;