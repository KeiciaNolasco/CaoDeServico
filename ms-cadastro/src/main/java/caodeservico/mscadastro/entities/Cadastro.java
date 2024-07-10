package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EqualsAndHashCode(of = {"id", "qrCode"})
@Entity
@Table(name = "tabela_cadastro")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Cadastro implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "condutor_id", referencedColumnName = "id")
	@JsonProperty("Informações do Condutor")
	private Condutor condutor;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cao_id", referencedColumnName = "id")
	@JsonProperty("Informações do Cão de Serviço")
	private CaoDeServico cao;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "adestramento_id", referencedColumnName = "id")
	@JsonProperty("Informações do Adestramento")
	private Adestramento adestramento;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "documentacao_id", referencedColumnName = "id")
	@JsonProperty("Informações da Documentação")
	private Documentacao documentacao;

	@Lob
	@JsonProperty("QR Code")
	private byte[] qrCode;

}
