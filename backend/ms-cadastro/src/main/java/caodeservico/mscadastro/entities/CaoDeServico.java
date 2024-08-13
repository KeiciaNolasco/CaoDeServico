package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tabela_cao", uniqueConstraints = {@UniqueConstraint(columnNames = "microchip")})
public class CaoDeServico implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date nascimento;

	@Column(nullable = false)
	private String raca;

	@Column(nullable = false)
	private Long microchip;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@JsonSerialize(using = Categoria.CategoriaSerializer.class)
	private Categoria categoria;

	@Lob
	private byte[] foto;

}