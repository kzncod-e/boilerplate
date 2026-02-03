-- =========================
-- PERMISSIONS
-- =========================
INSERT OR IGNORE INTO permission
(id, name, action, module, description, created_at, updated_at)
VALUES
('p1','read_users','read','users','View users',unixepoch(),unixepoch()),
('p2','create_users','create','users','Create users',unixepoch(),unixepoch()),
('p3','update_users','update','users','Update users',unixepoch(),unixepoch()),
('p4','delete_users','delete','users','Delete users',unixepoch(),unixepoch()),

('p5','read_posts','read','posts','View posts',unixepoch(),unixepoch()),
('p6','create_posts','create','posts','Create posts',unixepoch(),unixepoch()),
('p7','update_posts','update','posts','Update posts',unixepoch(),unixepoch()),
('p8','delete_posts','delete','posts','Delete posts',unixepoch(),unixepoch()),

('p9','read_roles','read','roles','View roles',unixepoch(),unixepoch()),
('p10','create_roles','create','roles','Create roles',unixepoch(),unixepoch()),
('p11','update_roles','update','roles','Update roles',unixepoch(),unixepoch()),
('p12','delete_roles','delete','roles','Delete roles',unixepoch(),unixepoch());

-- =========================
-- CLEAR OLD
-- =========================
DELETE FROM role_permission;

-- =========================
-- SUPER ADMIN = ALL
-- =========================


-- =========================
-- ADMIN = ALL EXCEPT ROLES
-- =========================
INSERT INTO role_permission
(id, role_id, permission_id, created_at, updated_at)
SELECT
  lower(hex(randomblob(16))),
  r.id,
  p.id,
  unixepoch(),
  unixepoch()
FROM role r
JOIN permission p
WHERE lower(r.name) LIKE '%admin%'
AND p.module != 'roles';

-- =========================
-- VIEWER = READ ONLY
-- =========================
INSERT INTO role_permission
(id, role_id, permission_id, created_at, updated_at)
SELECT
  lower(hex(randomblob(16))),
  r.id,
  p.id,
  unixepoch(),
  unixepoch()
FROM role r
JOIN permission p
WHERE lower(r.name) LIKE '%user%'
AND p.action = 'read';
