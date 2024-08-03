-- Inserção de Valores das Tabelas do MS-User
INSERT INTO tabela_role (nome) VALUES
    ('Administrador'),
    ('Operador'),
    ('Publico')
ON CONFLICT (nome) DO NOTHING;

-- Inserir usuários, ignorar duplicatas
INSERT INTO tabela_user (nome, email, senha) VALUES
    ('Keicia Nolasco', 'keicia@gmail.com', '$2b$12$95.tbRSO9Rj31a2WgOo3Q.ADMVoAva43C5RsIzCaP22Hh2hsMYA9i'),
    ('Leonardo Castro', 'leonardo@gmail.com', '$2b$12$z.cRoqq687lJtJJy98V/6.JzCD5rLxcBzQtl8n6S/Tpg3VIh9glf.'),
    ('Paulo Serrati', 'paulo@gmail.com', '$2b$12$ZIoz12KDArCvHRcDrH8UJuKCM9pE65nUWG8OXdy/B3kU3ThSsy2WC'),
    ('Patricia', 'patricia@gmail.com', '$2b$12$C1OucU62ZGMEXeBygcdY7.G1042NSU7oiFyHM6R6mXoky5QB5MQES'),
    ('Lucas Schlestein', 'lucas@gmail.com', '$2b$12$xzqhsbG5h4bg7RmzeIaymuRhK1ICiQ1HYiOEZXxQBNO.8P/yZcG6S'),
    ('Fabricio Londero', 'fabricio@gmail.com', '$2b$12$APez7AAxoX87/8MJPwOt/uFc7.cDxg15nkhWnzuUnU6e97D1acbu6')
ON CONFLICT (email) DO NOTHING;

-- Relacionar usuários com papéis, ignorar duplicatas
INSERT INTO tabela_user_role (user_id, role_id) VALUES
    ((SELECT id FROM tabela_user WHERE email = 'keicia@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Administrador')),
    ((SELECT id FROM tabela_user WHERE email = 'leonardo@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Publico')),
    ((SELECT id FROM tabela_user WHERE email = 'paulo@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Operador')),
    ((SELECT id FROM tabela_user WHERE email = 'patricia@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Operador')),
    ((SELECT id FROM tabela_user WHERE email = 'lucas@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Publico')),
    ((SELECT id FROM tabela_user WHERE email = 'fabricio@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Publico'))
ON CONFLICT (user_id, role_id) DO NOTHING;