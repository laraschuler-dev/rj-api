-- 20251105_user_social_connection
CREATE TABLE user_social_connection (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id INT UNSIGNED NOT NULL,
  provider VARCHAR(20) NOT NULL,
  provider_id VARCHAR(255) NOT NULL,
  provider_email VARCHAR(60) NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_user_provider (user_id, provider),
  UNIQUE KEY unique_provider_id (provider, provider_id),
  FOREIGN KEY (user_id) REFERENCES user(iduser) ON DELETE CASCADE
);

