-- 20251106_adiciona_novos_campos_na_tabela_user
ALTER TABLE user 
ADD COLUMN emailVerified BOOLEAN DEFAULT FALSE,
ADD COLUMN emailVerificationToken VARCHAR(255),
ADD COLUMN emailVerificationTokenExpiresAt DATETIME;

