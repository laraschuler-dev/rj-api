-- 20251111_cria_tabela_follow
DROP TABLE IF EXISTS `user_follow`;

CREATE TABLE `user_follow` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `follower_id` int unsigned NOT NULL,
  `following_id` int unsigned NOT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_follow_relationship` (`follower_id`,`following_id`),
  KEY `idx_follower` (`follower_id`),
  KEY `idx_following` (`following_id`),
  KEY `idx_created_at` (`created_at`),
  CONSTRAINT `user_follow_follower_id_fkey` FOREIGN KEY (`follower_id`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_follow_following_id_fkey` FOREIGN KEY (`following_id`) REFERENCES `user` (`iduser`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

