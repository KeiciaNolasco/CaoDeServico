-- Inserção de Valores das Tabelas do MS-User
INSERT INTO tabela_role (nome) VALUES
    ('ADMIN'),
    ('CUSTOMER')
ON CONFLICT (nome) DO NOTHING;

-- Inserir usuários, ignorar duplicatas
INSERT INTO tabela_user (email, senha) VALUES
    ('keicia@gmail.com', '$2b$12$95.tbRSO9Rj31a2WgOo3Q.ADMVoAva43C5RsIzCaP22Hh2hsMYA9i'),
    ('maria@gmail.com', '$2b$12$C1OucU62ZGMEXeBygcdY7.G1042NSU7oiFyHM6R6mXoky5QB5MQES'),
    ('lucas@gmail.com', '$2b$12$xzqhsbG5h4bg7RmzeIaymuRhK1ICiQ1HYiOEZXxQBNO.8P/yZcG6S'),
    ('fabricio@gmail.com', '$2b$12$APez7AAxoX87/8MJPwOt/uFc7.cDxg15nkhWnzuUnU6e97D1acbu6')
ON CONFLICT (email) DO NOTHING;

-- Relacionar usuários com papéis, ignorar duplicatas
INSERT INTO tabela_user_role (user_id, role_id) VALUES
    ((SELECT id FROM tabela_user WHERE email = 'keicia@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'ADMIN')),
    ((SELECT id FROM tabela_user WHERE email = 'maria@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'CUSTOMER')),
    ((SELECT id FROM tabela_user WHERE email = 'lucas@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'ADMIN')),
    ((SELECT id FROM tabela_user WHERE email = 'fabricio@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'CUSTOMER'))
ON CONFLICT (user_id, role_id) DO NOTHING;