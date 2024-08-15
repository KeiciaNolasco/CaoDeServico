package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Condutor;
import caodeservico.mscadastro.exceptions.CustomException;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/condutores")
public class CondutorResource extends GenericResource<Condutor, Long> {

	private final GenericService<Condutor, Long> service;

	@Autowired
	public CondutorResource(GenericService<Condutor, Long> service) {
		this.service = service;
	}

	@Override
	protected GenericService<Condutor, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Condutor entity) {
		return entity.getId();
	}

	@PostMapping(value = "/save/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<Condutor> save(
			@PathVariable Long id,
			@RequestParam("nome") String nome,
			@RequestParam("nascimento") String nascimento,
			@RequestParam("cpf") String cpf,
			@RequestParam("contato") String contato,
			@RequestParam("cid") String cid,
			@RequestPart(value = "foto", required = false) MultipartFile foto) {
		try {
			System.out.println("Nome: " + nome);
			System.out.println("Nascimento: " + nascimento);
			System.out.println("CPF: " + cpf);
			System.out.println("Contato: " + contato);
			System.out.println("CID: " + cid);
			if (foto != null) {
				System.out.println("Foto recebida: " + foto.getOriginalFilename() + " Tamanho: " + foto.getSize());
			} else {
				System.out.println("Nenhuma foto recebida");
			}
			Condutor condutor = new Condutor();
			condutor.setNome(nome);
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date nascimentoDate = df.parse(nascimento);
			condutor.setNascimento(nascimentoDate);
			condutor.setCpf(Long.parseLong(cpf));
			condutor.setContato(Long.parseLong(contato));
			condutor.setCid(cid);
			if (foto != null && !foto.isEmpty()) {
				condutor.setFoto(foto.getBytes());
			}
			Condutor savedCondutor = getService().saveWithUserId(id, condutor);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(getId(savedCondutor)).toUri();
			return ResponseEntity.created(uri).body(savedCondutor);
		} catch (Exception e) {
			throw new CustomException("Erro ao processar o condutor", e);
		}
	}

}
