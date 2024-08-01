-- Inserção de Valores das Tabelas do MS-User

INSERT INTO tabela_role (nome) VALUES
                                   ('Administrador'),
                                   ('Supervisor'),
                                   ('Operador'),
                                   ('Comum'),
                                   ('Publico')
    ON CONFLICT (nome) DO NOTHING;

-- Inserir usuários, ignorar duplicatas
INSERT INTO tabela_user (nome, email, senha) VALUES
                                                 ('Keicia Nolasco', 'keicia@gmail.com', '123456'),
                                                 ('Leonardo Castro', 'leonardo@gmail.com', '123456'),
                                                 ('Paulo Serrati', 'paulo@gmail.com', '123456'),
                                                 ('Patricia', 'patricia@gmail.com', '123456')
    ON CONFLICT (email) DO NOTHING;

-- Relacionar usuários com papéis, ignorar duplicatas
INSERT INTO tabela_user_role (user_id, role_id) VALUES
                                                    ((SELECT id FROM tabela_user WHERE email = 'keicia@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Administrador')),
                                                    ((SELECT id FROM tabela_user WHERE email = 'leonardo@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Supervisor')),
                                                    ((SELECT id FROM tabela_user WHERE email = 'paulo@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Operador')),
                                                    ((SELECT id FROM tabela_user WHERE email = 'patricia@gmail.com'), (SELECT id FROM tabela_role WHERE nome = 'Publico'))
    ON CONFLICT DO NOTHING;

