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
@EqualsAndHashCode(of = "id")
@Entity
@Table(name = "tabela_endereco")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Endereco implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonProperty("País")
	private String pais;

	@JsonProperty("Estado")
	private String estado;

	@JsonProperty("CEP")
	private Integer cep;

	@JsonProperty("Cidade")
	private String cidade;

	@JsonProperty("Bairro")
	private String bairro;

	@JsonProperty("Rua")
	private String rua;

	@JsonProperty("Número")
	private Integer numero;

	@JsonProperty("Complemento")
	private String complemento;

}