-- 20251109_marca_todos_os_usu_rios_existentes_com_email_verificado
UPDATE user 
SET emailVerified = TRUE 
WHERE (emailVerified IS NULL OR emailVerified = FALSE)
  AND iduser > 0;