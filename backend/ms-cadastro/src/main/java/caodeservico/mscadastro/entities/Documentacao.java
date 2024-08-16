package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;
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
@Table(name = "tabela_documentacao", uniqueConstraints = {@UniqueConstraint(columnNames = {"id"})})
public class Documentacao implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Lob
	private byte[] cartaTreinamento;

	private Date validadeCartaTreinamento;

	@Lob
	private byte[] carteiraVacina;

	@Column(nullable = false)
	private Date validadeCarteiraVacina;

	@Lob
	private byte[] certificadoAdestramento;

	private Date validadeCertificadoAdestramento;

	@Lob
	private byte[] laudoMedico;

	@Column(nullable = false)
	private Date validadeLaudoMedico;

	@Lob
	private byte[] laudoVeterinario;

	@Column(nullable = false)
	private Date validadeLaudoVeterinario;

	@Lob
	private byte[] provaAdestramento;

}
