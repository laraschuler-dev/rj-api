-- 20251111_recriar_a_foreign_key_mas_permitindo_null

ALTER TABLE notification 
ADD CONSTRAINT fk_notification_post 
FOREIGN KEY (post_id) REFERENCES post(idpost) 
ON DELETE CASCADE;