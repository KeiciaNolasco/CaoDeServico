package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
	private Condutor condutor;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "cao_id", referencedColumnName = "id")
	private CaoDeServico cao;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "adestramento_id", referencedColumnName = "id")
	private Adestramento adestramento;

	@OneToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "documentacao_id", referencedColumnName = "id")
	private Documentacao documentacao;

}
