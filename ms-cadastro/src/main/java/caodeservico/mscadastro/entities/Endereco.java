package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tabela_endereco", uniqueConstraints = {@UniqueConstraint(columnNames = {"pais", "estado", "cep", "bairro", "rua", "numero", "complemento"})})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Endereco implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@JsonProperty("País")
	private String pais;

	@Column(nullable = false)
	@JsonProperty("Estado")
	private String estado;

	@Column(nullable = false)
	@JsonProperty("CEP")
	private Integer cep;

	@Column(nullable = false)
	@JsonProperty("Cidade")
	private String cidade;

	@Column(nullable = false)
	@JsonProperty("Bairro")
	private String bairro;

	@Column(nullable = false)
	@JsonProperty("Rua")
	private String rua;

	@Column(nullable = false)
	@JsonProperty("Número")
	private Integer numero;

	@JsonProperty("Complemento")
	private String complemento;

}
