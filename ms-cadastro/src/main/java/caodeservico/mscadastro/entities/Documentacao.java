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
@Table(name = "tabela_documentacao", uniqueConstraints = {@UniqueConstraint(columnNames = {"urlCartaTreinamento", "urlCarteiraVacina", "urlCertificadoAdestramento", "urlLaudoMedico", "urlLaudoVeterinario", "urlProvaAdestramento"})})
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Documentacao implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	private Long id;

	@Lob
	@JsonProperty("Carta de Treinamento")
	private byte[] cartaTreinamento;

	@JsonProperty("URL da Carta de Treinamento")
	private String urlCartaTreinamento;

	@Column(nullable = false)
	@JsonProperty("Validade da Carta de Treinamento")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date validadeCartaTreinamento;

	@Lob
	@JsonProperty("Carteira de Vacina")
	private byte[] carteiraVacina;

	@JsonProperty("URL da Carteira de Vacina")
	private String urlCarteiraVacina;

	@Column(nullable = false)
	@JsonProperty("Validade da Carteira de Vacina")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date validadeCarteiraVacina;

	@Lob
	@JsonProperty("Certificado de Adestramento")
	private byte[] certificadoAdestramento;

	@JsonProperty("URL do Certificado de Adestramento")
	private String urlCertificadoAdestramento;

	@Column(nullable = false)
	@JsonProperty("Validade do Certificado de Adestramento")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date validadeCertificadoAdestramento;

	@Lob
	@JsonProperty("Laudo Médico")
	private byte[] laudoMedico;

	@JsonProperty("URL do Laudo Médico")
	private String urlLaudoMedico;

	@Column(nullable = false)
	@JsonProperty("Validade do Laudo Médico")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date validadeLaudoMedico;

	@Lob
	@JsonProperty("Laudo Veterinário")
	private byte[] laudoVeterinario;

	@JsonProperty("URL do Laudo Veterinário")
	private String urlLaudoVeterinario;

	@Column(nullable = false)
	@JsonProperty("Validade do Laudo Veterinário")
	@JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy")
	private Date validadeLaudoVeterinario;

	@Lob
	@JsonProperty("Prova de Adestramento")
	private byte[] provaAdestramento;

	@JsonProperty("URL da Prova de Adestramento")
	private String urlProvaAdestramento;

	@Lob
	@JsonProperty("Qr Code")
	private byte[] qrCode;

}
