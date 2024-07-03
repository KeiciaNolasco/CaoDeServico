-- Verificação de Existencia das Tabelas

DROP TABLE IF EXISTS tabela_condutor_endereco;
DROP TABLE IF EXISTS tabela_cadastro;
DROP TABLE IF EXISTS tabela_documentacao;
DROP TABLE IF EXISTS tabela_adestramento;
DROP TABLE IF EXISTS tabela_cao;
DROP TABLE IF EXISTS tabela_condutor;
DROP TABLE IF EXISTS tabela_endereco;

-- Criação das Tabelas do MS-Cadastro

CREATE TABLE tabela_endereco (
    id SERIAL PRIMARY KEY,
    pais VARCHAR(255),
    estado VARCHAR(255),
    cep INTEGER,
    cidade VARCHAR(255),
    bairro VARCHAR(255),
    rua VARCHAR(255),
    numero INTEGER,
    complemento VARCHAR(255)
);

CREATE TABLE tabela_condutor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    nascimento DATE,
    cpf BIGINT,
    contato BIGINT,
    cid VARCHAR(255),
    endereco_id BIGINT,
    FOREIGN KEY (endereco_id) REFERENCES tabela_endereco(id)
);

CREATE TABLE tabela_cao (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255),
    nascimento DATE,
    raca VARCHAR(255),
    microchip VARCHAR(255),
    categoria VARCHAR(255)
);

CREATE TABLE tabela_adestramento (
    id SERIAL PRIMARY KEY,
    adestrador VARCHAR(255),
    cpf BIGINT,
    instituicao VARCHAR(255),
    cnpj BIGINT,
    tempo VARCHAR(255)
);

CREATE TABLE tabela_documentacao (
    id SERIAL PRIMARY KEY,
    carta_treinamento BYTEA,
    url_carta_treinamento VARCHAR(255),
    validade_carta_treinamento DATE,
    carteira_vacina BYTEA,
    url_carteira_vacina VARCHAR(255),
    validade_carteira_vacina DATE,
    certificado_adestramento BYTEA,
    url_certificado_adestramento VARCHAR(255),
    validade_certificado_adestramento DATE,
    laudo_medico BYTEA,
    url_laudo_medico VARCHAR(255),
    validade_laudo_medico DATE,
    laudo_veterinario BYTEA,
    url_laudo_veterinario VARCHAR(255),
    validade_laudo_veterinario DATE,
    prova_adestramento BYTEA,
    url_prova_adestramento VARCHAR(255),
    validade_prova_adestramento DATE,
    qr_code BYTEA
);

CREATE TABLE tabela_cadastro (
    id SERIAL PRIMARY KEY,
    condutor_id BIGINT,
    cao_id BIGINT,
    adestramento_id BIGINT,
    documentacao_id BIGINT,
    FOREIGN KEY (condutor_id) REFERENCES tabela_condutor(id),
    FOREIGN KEY (cao_id) REFERENCES tabela_cao(id),
    FOREIGN KEY (adestramento_id) REFERENCES tabela_adestramento(id),
    FOREIGN KEY (documentacao_id) REFERENCES tabela_documentacao(id)
);

-- Inserção de Valores das Tabelas do MS-Cadastro

INSERT INTO tabela_endereco (pais, estado, cep, cidade, bairro, rua, numero, complemento)
VALUES ('Brasil', 'Santa Catarina', 1111111, 'Florianópolis', 'xxxxxx', 'xxxxxx', 111, 'xxxxxxx');

INSERT INTO tabela_condutor (nome, nascimento, cpf, contato, cid, endereco_id)
VALUES ('Keicia Nolasco', '1997-07-16', 11111111111, 11111111, '6A02', 1);

INSERT INTO tabela_cao (nome, nascimento, raca, microchip, categoria)
VALUES ('Nala', '2019-11-16', 'Golden Retriever', '000111222', 'CÃO_DE_SERVIÇO_MULTIFUNÇÃO');

INSERT INTO tabela_adestramento (adestrador, cpf, instituicao, cnpj, tempo)
VALUES ('Paulo', 111111, 'fbaa', 11111111, '1');

INSERT INTO tabela_documentacao (url_carta_treinamento, validade_carta_treinamento, url_carteira_vacina, validade_carteira_vacina, url_certificado_adestramento, validade_certificado_adestramento, url_laudo_medico, validade_laudo_medico, url_laudo_veterinario, validade_laudo_veterinario, url_prova_adestramento, validade_prova_adestramento)
VALUES ('http://example.com/carta_treinamento.pdf', '2025-12-31', 'http://example.com/carteira_vacina.pdf', '2025-12-31', 'http://example.com/certificado_adestramento.pdf', '2025-12-31', 'http://example.com/laudo_medico.pdf', '2025-12-31', 'http://example.com/laudo_veterinario.pdf', '2025-12-31', 'http://example.com/prova_adestramento.pdf', '2025-12-31');

INSERT INTO tabela_cadastro (condutor_id, cao_id, adestramento_id, documentacao_id)
VALUES (1, 1, 1, 1);
