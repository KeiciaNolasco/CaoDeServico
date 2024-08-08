package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
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
@Table(name = "tabela_condutor", uniqueConstraints = {@UniqueConstraint(columnNames = "cpf")})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Condutor implements Serializable {

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
	@JsonProperty("CPF")
	private Long cpf;

	@Column(nullable = false)
	@JsonProperty("Contato")
	private Long contato;

	@Column(nullable = false)
	@JsonProperty("CID")
	private String cid;

	@Lob
	@JsonProperty("Foto")
	private byte[] foto;

}