CREATE TABLE IF NOT EXISTS tabela_endereco (
                                               id INTEGER PRIMARY KEY,
                                               pais VARCHAR(255) NOT NULL,
                                               estado VARCHAR(255) NOT NULL,
                                               cep INTEGER NOT NULL,
                                               cidade VARCHAR(255) NOT NULL,
                                               bairro VARCHAR(255) NOT NULL,
                                               rua VARCHAR(255) NOT NULL,
                                               numero INTEGER NOT NULL,
                                               complemento VARCHAR(255),
                                               CONSTRAINT endereco_unique UNIQUE (pais, estado, cep, bairro, rua, numero, complemento)
);

CREATE TABLE IF NOT EXISTS tabela_condutor (
                                               id INTEGER PRIMARY KEY,
                                               nome VARCHAR(255) NOT NULL,
                                               nascimento DATE NOT NULL,
                                               cpf BIGINT NOT NULL UNIQUE,
                                               contato BIGINT NOT NULL,
                                               cid VARCHAR(255) NOT NULL,
                                               endereco_id INTEGER NOT NULL,
                                               foto BYTEA
);

CREATE TABLE IF NOT EXISTS tabela_cao (
                                          id INTEGER PRIMARY KEY,
                                          nome VARCHAR(255) NOT NULL,
                                          nascimento DATE NOT NULL,
                                          raca VARCHAR(255) NOT NULL,
                                          microchip VARCHAR(255) NOT NULL UNIQUE,
                                          categoria VARCHAR(255) NOT NULL,
                                          foto BYTEA
);

CREATE TABLE IF NOT EXISTS tabela_adestramento (
                                                   id INTEGER PRIMARY KEY,
                                                   adestrador VARCHAR(255) NOT NULL,
                                                   cpf BIGINT NOT NULL,
                                                   instituicao VARCHAR(255) NOT NULL,
                                                   cnpj BIGINT NOT NULL,
                                                   tempo VARCHAR(255) NOT NULL,
                                                   CONSTRAINT adestramento_unique UNIQUE (cpf, cnpj)
);

CREATE TABLE IF NOT EXISTS tabela_documentacao (
                                                   id INTEGER PRIMARY KEY,
                                                   carta_treinamento VARCHAR(255),
                                                   url_carta_treinamento VARCHAR(255),
                                                   validade_carta_treinamento DATE,
                                                   carteira_vacina VARCHAR(255),
                                                   url_carteira_vacina VARCHAR(255),
                                                   validade_carteira_vacina DATE,
                                                   certificado_adestramento VARCHAR(255),
                                                   url_certificado_adestramento VARCHAR(255),
                                                   validade_certificado_adestramento DATE,
                                                   laudo_medico VARCHAR(255),
                                                   url_laudo_medico VARCHAR(255),
                                                   validade_laudo_medico DATE,
                                                   laudo_veterinario VARCHAR(255),
                                                   url_laudo_veterinario VARCHAR(255),
                                                   validade_laudo_veterinario DATE,
                                                   prova_adestramento VARCHAR(255),
                                                   url_prova_adestramento VARCHAR(255),
                                                   qr_code VARCHAR(255),
                                                   CONSTRAINT documentacao_unique UNIQUE (url_carta_treinamento, url_carteira_vacina, url_certificado_adestramento, url_laudo_medico, url_laudo_veterinario, url_prova_adestramento)
);

CREATE TABLE IF NOT EXISTS tabela_cadastro (
                                               id INTEGER PRIMARY KEY,
                                               qr_code VARCHAR(255),
                                               condutor_id INTEGER NOT NULL,
                                               cao_id INTEGER NOT NULL,
                                               endereco_id INTEGER NOT NULL,
                                               adestramento_id INTEGER NOT NULL,
                                               documentacao_id INTEGER NOT NULL,
                                               CONSTRAINT fk_condutor FOREIGN KEY (condutor_id) REFERENCES tabela_condutor(id),
                                               CONSTRAINT fk_cao FOREIGN KEY (cao_id) REFERENCES tabela_cao(id),
                                               CONSTRAINT fk_endereco FOREIGN KEY (endereco_id) REFERENCES tabela_endereco(id),
                                               CONSTRAINT fk_adestramento FOREIGN KEY (adestramento_id) REFERENCES tabela_adestramento(id),
                                               CONSTRAINT fk_documentacao FOREIGN KEY (documentacao_id) REFERENCES tabela_documentacao(id)
);
