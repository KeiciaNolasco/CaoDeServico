package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serial;
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

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "condutor_id", referencedColumnName = "id")
	@JsonProperty("Informações do Condutor")
	private Condutor condutor;

	@NotNull
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cao_id", referencedColumnName = "id")
	@JsonProperty("Informações do Cão de Serviço")
	private CaoDeServico cao;

	@NotNull
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "adestramento_id", referencedColumnName = "id")
	@JsonProperty("Informações do Adestramento")
	private Adestramento adestramento;

	@NotNull
	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "documentacao_id", referencedColumnName = "id")
	@JsonProperty("Informações da Documentação")
	private Documentacao documentacao;

	@Lob
	@JsonProperty("QR Code")
	private byte[] qrCode;

}
