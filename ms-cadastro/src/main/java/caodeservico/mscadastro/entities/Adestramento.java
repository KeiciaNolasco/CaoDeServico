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
@EqualsAndHashCode(of = {"id", "cpf", "cnpj"})
@Entity
@Table(name = "tabela_adestramento")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Adestramento implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonProperty("Adestrador")
	private String adestrador;

	@JsonProperty("CPF")
	private Long cpf;

	@JsonProperty("Instituição de Adestramento")
	private String instituicao;

	@JsonProperty("CNPJ")
	private Long cnpj;

	@JsonProperty("Tempo de Adestramento")
	private String tempo;

}
