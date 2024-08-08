package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Adestramento implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	@JsonProperty("Adestrador")
	private String adestrador;

	@Column(nullable = false)
	@JsonProperty("CPF")
	private Long cpf;

	@Column(nullable = false)
	@JsonProperty("Instituição de Adestramento")
	private String instituicao;

	@Column(nullable = false)
	@JsonProperty("CNPJ")
	private Long cnpj;

	@Column(nullable = false)
	@JsonProperty("Tempo de Adestramento")
	private String tempo;

}
