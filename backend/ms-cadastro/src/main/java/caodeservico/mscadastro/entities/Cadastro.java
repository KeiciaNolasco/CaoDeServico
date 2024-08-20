package caodeservico.mscadastro.entities;

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
@EqualsAndHashCode(of = {"id"})
@Entity
@Table(name = "tabela_cadastro")
public class Cadastro implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "condutor_id", referencedColumnName = "id")
	private Condutor condutor;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "cao_id", referencedColumnName = "id")
	private CaoDeServico cao;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "endereco_id", referencedColumnName = "id")
	private Endereco endereco;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "adestramento_id", referencedColumnName = "id")
	private Adestramento adestramento;

	@OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	@JoinColumn(name = "documentacao_id", referencedColumnName = "id")
	private Documentacao documentacao;

}
