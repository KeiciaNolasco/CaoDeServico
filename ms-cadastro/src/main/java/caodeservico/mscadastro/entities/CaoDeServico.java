package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tabela_cao")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class CaoDeServico implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JsonProperty("Nome")
	private String nome;

	@JsonProperty("Data de Nascimento")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date nascimento;

	@JsonProperty("Raça")
	private String raca;

	@JsonProperty("Microchip")
	private Long microchip;

	@Enumerated(EnumType.STRING)
	@JsonSerialize(using = Categoria.CategoriaSerializer.class)
	@JsonProperty("Categoria")
	private Categoria categoria;

	@Lob
	@JsonProperty("Foto do Cão de Serviço")
	private byte[] foto;

}