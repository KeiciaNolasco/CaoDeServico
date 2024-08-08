-- Inserção de Valores das Tabelas do MS-Cadastro

-- Endereço
INSERT INTO tabela_endereco (id, pais, estado, cep, cidade, bairro, rua, numero, complemento)
VALUES (1, 'Brasil', 'Santa Catarina', 1111111, 'Florianópolis', 'xxxxxx', 'xxxxxx', 111, 'xxxxxxx')
ON CONFLICT (pais, estado, cep, bairro, rua, numero, complemento) DO NOTHING;

-- Condutor
INSERT INTO tabela_condutor (id, nome, nascimento, cpf, contato, cid, foto)
VALUES (1, 'Keicia Nolasco', '1997-07-16', 11111111111, 11111111, '6A02', null)
ON CONFLICT (cpf) DO NOTHING;

-- Cão de Serviço
INSERT INTO tabela_cao (id, nome, nascimento, raca, microchip, categoria, foto)
VALUES (1, 'Nala', '2019-11-16', 'Golden Retriever', '000111222', 'CÃO_DE_SERVIÇO_MULTIFUNÇÃO', null)
ON CONFLICT (microchip) DO NOTHING;

-- Adestramento
INSERT INTO tabela_adestramento (id, adestrador, cpf, instituicao, cnpj, tempo)
VALUES (1, 'Paulo', 111111, 'fbaa', 11111111, '1')
ON CONFLICT (cpf, cnpj) DO NOTHING;

-- Documentação
INSERT INTO tabela_documentacao (id, carta_treinamento, url_carta_treinamento, validade_carta_treinamento, carteira_vacina, url_carteira_vacina, validade_carteira_vacina, certificado_adestramento, url_certificado_adestramento, validade_certificado_adestramento, laudo_medico, url_laudo_medico, validade_laudo_medico, laudo_veterinario, url_laudo_veterinario, validade_laudo_veterinario, prova_adestramento, url_prova_adestramento, qr_code)
VALUES (1, null, 'http://example.com/carta_treinamento.pdf', '2025-12-31', null, 'http://example.com/carteira_vacina.pdf', '2025-12-31', null, 'http://example.com/certificado_adestramento.pdf', '2025-12-31', null, 'http://example.com/laudo_medico.pdf', '2025-12-31', null, 'http://example.com/laudo_veterinario.pdf', '2025-12-31', null, 'http://example.com/prova_adestramento.pdf', null)
ON CONFLICT (url_carta_treinamento, url_carteira_vacina, url_certificado_adestramento, url_laudo_medico, url_laudo_veterinario, url_prova_adestramento) DO NOTHING;

-- Cadastro
INSERT INTO tabela_cadastro (id, qr_code, condutor_id, cao_id, endereco_id, adestramento_id, documentacao_id)
VALUES (1, null,
        (SELECT id FROM tabela_condutor ORDER BY id DESC LIMIT 1),
        (SELECT id FROM tabela_cao ORDER BY id DESC LIMIT 1),
        (SELECT id FROM tabela_endereco ORDER BY id DESC LIMIT 1),
        (SELECT id FROM tabela_adestramento ORDER BY id DESC LIMIT 1),
        (SELECT id FROM tabela_documentacao ORDER BY id DESC LIMIT 1))
ON CONFLICT DO NOTHING;

