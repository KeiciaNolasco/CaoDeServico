package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CaoDeServico implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	@JsonProperty("Nome")
	private String nome;

	@Column(nullable = false)
	@JsonProperty("Data de Nascimento")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date nascimento;

	@Column(nullable = false)
	@JsonProperty("Raça")
	private String raca;

	@Column(nullable = false)
	@JsonProperty("Microchip")
	private Long microchip;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	@JsonSerialize(using = Categoria.CategoriaSerializer.class)
	@JsonProperty("Categoria")
	private Categoria categoria;

	@Lob
	@JsonProperty("Foto")
	private byte[] foto;

}