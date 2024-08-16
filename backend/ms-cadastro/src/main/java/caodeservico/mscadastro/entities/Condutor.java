package caodeservico.mscadastro.entities;

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
public class Condutor implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Column(nullable = false)
	private String nome;

	@Column(nullable = false)
	private Date nascimento;

	@Column(nullable = false)
	private Long cpf;

	@Column(nullable = false)
	private Long contato;

	@Column(nullable = false)
	private String cid;

	@Lob
	private byte[] foto;

}