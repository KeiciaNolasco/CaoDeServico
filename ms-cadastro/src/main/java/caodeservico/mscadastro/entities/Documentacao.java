package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "tabela_documentacao")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Documentacao implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Lob
	private byte[] cartaTreinamento;
	private String urlCartaTreinamento;
	private Date validadeCartaTreinamento;

	@Lob
	private byte[] carteiraVacina;
	private String urlCarteiraVacina;
	private Date validadeCarteiraVacina;

	@Lob
	private byte[] certificadoAdestramento;
	private String urlCertificadoAdestramento;
	private Date validadeCertificadoAdestramento;

	@Lob
	private byte[] laudoMedico;
	private String urlLaudoMedico;
	private Date validadeLaudoMedico;

	@Lob
	private byte[] laudoVeterinario;
	private String urlLaudoVeterinario;
	private Date validadeLaudoVeterinario;

	@Lob
	private byte[] provaAdestramento;
	private String urlProvaAdestramento;
	private Date validadeProvaAdestramento;

	@Lob
	private byte[] qrCode;

}
