package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Documentacao;
import caodeservico.mscadastro.exceptions.CustomException;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@RestController
@RequestMapping("/documentacoes")
public class DocumentacaoResource extends GenericResource<Documentacao, Long> {

	private final GenericService<Documentacao, Long> service;

	@Autowired
	public DocumentacaoResource(GenericService<Documentacao, Long> service) {
		this.service = service;
	}

	@Override
	protected GenericService<Documentacao, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Documentacao entity) {
		return entity.getId();
	}

	@PostMapping(value = "/save/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<Documentacao> save(
			@PathVariable Long id,
			@RequestPart(value = "cartaTreinamento", required = false) MultipartFile cartaTreinamento,
			@RequestParam("validadeCartaTreinamento") String validadeCartaTreinamento,
			@RequestPart(value = "carteiraVacina", required = false) MultipartFile carteiraVacina,
			@RequestParam("validadeCarteiraVacina") String validadeCarteiraVacina,
			@RequestPart(value = "certificadoAdestramento", required = false) MultipartFile certificadoAdestramento,
			@RequestParam("validadeCertificadoAdestramento") String validadeCertificadoAdestramento,
			@RequestPart(value = "laudoMedico", required = false) MultipartFile laudoMedico,
			@RequestParam("validadeLaudoMedico") String validadeLaudoMedico,
			@RequestPart(value = "laudoVeterinario", required = false) MultipartFile laudoVeterinario,
			@RequestParam("validadeLaudoVeterinario") String validadeLaudoVeterinario,
			@RequestPart(value = "provaAdestramento", required = false) MultipartFile provaAdestramento) {
		try {
			Documentacao documentacao = new Documentacao();
			if (cartaTreinamento != null && !cartaTreinamento.isEmpty()) {
				documentacao.setCartaTreinamento(cartaTreinamento.getBytes());
			}
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date validadeCartaTreinamentoDate = df.parse(validadeCartaTreinamento);
			documentacao.setValidadeCartaTreinamento(validadeCartaTreinamentoDate);
			if (carteiraVacina != null && !carteiraVacina.isEmpty()) {
				documentacao.setCarteiraVacina(carteiraVacina.getBytes());
			}
			Date validadeCarteiraVacinaDate = df.parse(validadeCarteiraVacina);
			documentacao.setValidadeCarteiraVacina(validadeCarteiraVacinaDate);
			if (certificadoAdestramento != null && !certificadoAdestramento.isEmpty()) {
				documentacao.setCertificadoAdestramento(certificadoAdestramento.getBytes());
			}
			Date validadeCertificadoAdestramentoDate = df.parse(validadeCertificadoAdestramento);
			documentacao.setValidadeCertificadoAdestramento(validadeCertificadoAdestramentoDate);
			if (laudoMedico != null && !laudoMedico.isEmpty()) {
				documentacao.setLaudoMedico(laudoMedico.getBytes());
			}
			Date validadeLaudoMedicoDate = df.parse(validadeLaudoMedico);
			documentacao.setValidadeLaudoMedico(validadeLaudoMedicoDate);
			if (laudoVeterinario != null && !laudoVeterinario.isEmpty()) {
				documentacao.setLaudoVeterinario(laudoVeterinario.getBytes());
			}
			Date validadeLaudoVeterinarioDate = df.parse(validadeLaudoVeterinario);
			documentacao.setValidadeLaudoVeterinario(validadeLaudoVeterinarioDate);
			if (provaAdestramento != null && !provaAdestramento.isEmpty()) {
				documentacao.setProvaAdestramento(provaAdestramento.getBytes());
			}
			Documentacao savedDocumentacao = getService().saveWithUserId(id, documentacao);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(getId(savedDocumentacao)).toUri();
			return ResponseEntity.created(uri).body(savedDocumentacao);
		} catch (Exception e) {
			throw new CustomException("Erro ao processar a documentação", e);
		}
	}

	@PutMapping(value = "/update/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<Documentacao> update(
			@PathVariable Long id,
			@RequestPart(value = "cartaTreinamento", required = false) MultipartFile cartaTreinamento,
			@RequestParam("validadeCartaTreinamento") String validadeCartaTreinamento,
			@RequestPart(value = "carteiraVacina", required = false) MultipartFile carteiraVacina,
			@RequestParam("validadeCarteiraVacina") String validadeCarteiraVacina,
			@RequestPart(value = "certificadoAdestramento", required = false) MultipartFile certificadoAdestramento,
			@RequestParam("validadeCertificadoAdestramento") String validadeCertificadoAdestramento,
			@RequestPart(value = "laudoMedico", required = false) MultipartFile laudoMedico,
			@RequestParam("validadeLaudoMedico") String validadeLaudoMedico,
			@RequestPart(value = "laudoVeterinario", required = false) MultipartFile laudoVeterinario,
			@RequestParam("validadeLaudoVeterinario") String validadeLaudoVeterinario,
			@RequestPart(value = "provaAdestramento", required = false) MultipartFile provaAdestramento) {
		try {
			Optional<Documentacao> optionalDocumentacao = service.findById(id);
			if (optionalDocumentacao.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			Documentacao documentacao = optionalDocumentacao.get();
			if (cartaTreinamento != null && !cartaTreinamento.isEmpty()) {
				documentacao.setCartaTreinamento(cartaTreinamento.getBytes());
			}
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date validadeCartaTreinamentoDate = df.parse(validadeCartaTreinamento);
			documentacao.setValidadeCartaTreinamento(validadeCartaTreinamentoDate);
			if (carteiraVacina != null && !carteiraVacina.isEmpty()) {
				documentacao.setCarteiraVacina(carteiraVacina.getBytes());
			}
			Date validadeCarteiraVacinaDate = df.parse(validadeCarteiraVacina);
			documentacao.setValidadeCarteiraVacina(validadeCarteiraVacinaDate);
			if (certificadoAdestramento != null && !certificadoAdestramento.isEmpty()) {
				documentacao.setCertificadoAdestramento(certificadoAdestramento.getBytes());
			}
			Date validadeCertificadoAdestramentoDate = df.parse(validadeCertificadoAdestramento);
			documentacao.setValidadeCertificadoAdestramento(validadeCertificadoAdestramentoDate);
			if (laudoMedico != null && !laudoMedico.isEmpty()) {
				documentacao.setLaudoMedico(laudoMedico.getBytes());
			}
			Date validadeLaudoMedicoDate = df.parse(validadeLaudoMedico);
			documentacao.setValidadeLaudoMedico(validadeLaudoMedicoDate);
			if (laudoVeterinario != null && !laudoVeterinario.isEmpty()) {
				documentacao.setLaudoVeterinario(laudoVeterinario.getBytes());
			}
			Date validadeLaudoVeterinarioDate = df.parse(validadeLaudoVeterinario);
			documentacao.setValidadeLaudoVeterinario(validadeLaudoVeterinarioDate);
			if (provaAdestramento != null && !provaAdestramento.isEmpty()) {
				documentacao.setProvaAdestramento(provaAdestramento.getBytes());
			}
			Documentacao updatedDocumentacao = service.update(id, documentacao);
			return ResponseEntity.ok().body(updatedDocumentacao);
		} catch (Exception e) {
			throw new CustomException("Erro ao atualizar a documentação", e);
		}
	}

	@GetMapping("/download/{id}/{type}")
	public ResponseEntity<byte[]> downloadFile(@PathVariable Long id, @PathVariable String type) {
		Optional<Documentacao> optionalDocumentacao = service.findById(id);
		if (optionalDocumentacao.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Documentacao documentacao = optionalDocumentacao.get();
		byte[] fileData = null;
		String fileName = "";
		switch (type) {
			case "cartaTreinamento":
				fileData = documentacao.getCartaTreinamento();
				fileName = "Carta_Treinamento.pdf";
				break;
			case "carteiraVacina":
				fileData = documentacao.getCarteiraVacina();
				fileName = "Carteira_Vacina.pdf";
				break;
			case "certificadoAdestramento":
				fileData = documentacao.getCertificadoAdestramento();
				fileName = "Certificado_Adestramento.pdf";
				break;
			case "laudoMedico":
				fileData = documentacao.getLaudoMedico();
				fileName = "Laudo_Medico.pdf";
				break;
			case "laudoVeterinario":
				fileData = documentacao.getLaudoVeterinario();
				fileName = "Laudo_Veterinario.pdf";
				break;
			case "provaAdestramento":
				fileData = documentacao.getProvaAdestramento();
				fileName = "Prova_Adestramento.pdf";
				break;
			default:
				return ResponseEntity.badRequest().build();
		}
		if (fileData == null) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok()
				.contentType(MediaType.APPLICATION_PDF)
				.header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + fileName + "\"")
				.body(fileData);
	}

}
