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
@Table(name = "tabela_endereco", uniqueConstraints = {@UniqueConstraint(columnNames = {"pais", "estado", "cep", "bairro", "rua", "numero", "complemento"})})
public class Endereco implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	private String pais;

	@Column(nullable = false)
	private String estado;

	@Column(nullable = false)
	private Integer cep;

	@Column(nullable = false)
	private String cidade;

	@Column(nullable = false)
	private String bairro;

	@Column(nullable = false)
	private String rua;

	@Column(nullable = false)
	private Integer numero;

	private String complemento;

}
