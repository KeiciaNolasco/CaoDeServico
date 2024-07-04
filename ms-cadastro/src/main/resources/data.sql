-- Inserção de Valores das Tabelas do MS-Cadastro

INSERT INTO tabela_endereco (pais, estado, cep, cidade, bairro, rua, numero, complemento)
VALUES ('Brasil', 'Santa Catarina', 1111111, 'Florianópolis', 'xxxxxx', 'xxxxxx', 111, 'xxxxxxx');

INSERT INTO tabela_condutor (nome, nascimento, cpf, contato, cid, endereco_id)
VALUES ('Keicia Nolasco', '1997-07-16', 11111111111, 11111111, '6A02', 1);

INSERT INTO tabela_cao (nome, nascimento, raca, microchip, categoria)
VALUES ('Nala', '2019-11-16', 'Golden Retriever', '000111222', 'CÃO_DE_SERVIÇO_MULTIFUNÇÃO');

INSERT INTO tabela_adestramento (adestrador, cpf, instituicao, cnpj, tempo)
VALUES ('Paulo', 111111, 'fbaa', 11111111, '1');

INSERT INTO tabela_documentacao (url_carta_treinamento, validade_carta_treinamento, url_carteira_vacina, validade_carteira_vacina, url_certificado_adestramento, validade_certificado_adestramento, url_laudo_medico, validade_laudo_medico, url_laudo_veterinario, validade_laudo_veterinario, url_prova_adestramento)
VALUES ('http://example.com/carta_treinamento.pdf', '2025-12-31', 'http://example.com/carteira_vacina.pdf', '2025-12-31', 'http://example.com/certificado_adestramento.pdf', '2025-12-31', 'http://example.com/laudo_medico.pdf', '2025-12-31', 'http://example.com/laudo_veterinario.pdf', '2025-12-31', 'http://example.com/prova_adestramento.pdf');

INSERT INTO tabela_cadastro (qr_code, condutor_id, cao_id, adestramento_id, documentacao_id)
VALUES (null, 1, 1, 1, 1);
