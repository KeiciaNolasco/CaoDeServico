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
@Entity
@Table(name = "tabela_adestramento", uniqueConstraints = {@UniqueConstraint(columnNames = {"cpf", "cnpj"})})
public class Adestramento implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	private String adestrador;

	@Column(nullable = false)
	private Long cpf;

	@Column(nullable = false)
	private String instituicao;

	@Column(nullable = false)
	private Long cnpj;

	@Column(nullable = false)
	private String tempo;

}
