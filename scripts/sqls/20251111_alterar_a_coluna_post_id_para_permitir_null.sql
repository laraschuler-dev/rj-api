-- 20251111_alterar_a_coluna_post_id_para_permitir_null

ALTER TABLE notification MODIFY COLUMN post_id INT UNSIGNED NULL;