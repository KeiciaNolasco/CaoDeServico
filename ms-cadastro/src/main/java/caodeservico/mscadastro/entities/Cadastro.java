package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id", "qrCode"})
@Entity
@Table(name = "tabela_cadastro")
public class Cadastro implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "condutor_id", referencedColumnName = "id")
	@JsonProperty("Informações do Condutor")
	private Condutor condutor;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "cao_id", referencedColumnName = "id")
	@JsonProperty("Informações do Cão de Serviço")
	private CaoDeServico cao;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "endereco_id", referencedColumnName = "id")
	@JsonProperty("Informações do Endereço")
	private Endereco endereco;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "adestramento_id", referencedColumnName = "id")
	@JsonProperty("Informações do Adestramento")
	private Adestramento adestramento;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "documentacao_id", referencedColumnName = "id")
	@JsonProperty("Informações da Documentação")
	private Documentacao documentacao;

	@Lob
	@JsonProperty("QR Code")
	private byte[] qrCode;

}
