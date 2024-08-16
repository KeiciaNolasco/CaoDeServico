package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.CaoDeServico;
import caodeservico.mscadastro.entities.Categoria;
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
import java.util.Optional;

@RestController
@RequestMapping("/caesdeservicos")
public class CaoDeServicoResource extends GenericResource<CaoDeServico, Long> {

	private final GenericService<CaoDeServico, Long> service;

	@Autowired
	public CaoDeServicoResource(GenericService<CaoDeServico, Long> service) {
		this.service = service;
	}

	@Override
	protected GenericService<CaoDeServico, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(CaoDeServico entity) {
		return entity.getId();
	}

	@PostMapping(value = "/save/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<CaoDeServico> save(
			@PathVariable Long id,
			@RequestParam("nome") String nome,
			@RequestParam("nascimento") String nascimento,
			@RequestParam("raca") String raca,
			@RequestParam("microchip") String microchip,
			@RequestParam("categoria") String categoria,
			@RequestPart(value = "foto", required = false) MultipartFile foto) {
		try {
			CaoDeServico caoDeServico = new CaoDeServico();
			caoDeServico.setNome(nome);
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date nascimentoDate = df.parse(nascimento);
			caoDeServico.setNascimento(nascimentoDate);
			caoDeServico.setRaca(raca);
			caoDeServico.setMicrochip(Long.parseLong(microchip));
			caoDeServico.setCategoria(Categoria.fromDescricao(categoria));
			if (foto != null && !foto.isEmpty()) {
				caoDeServico.setFoto(foto.getBytes());
			}
			CaoDeServico savedCaoDeServico = getService().saveWithUserId(id, caoDeServico);
			URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
					.buildAndExpand(getId(savedCaoDeServico)).toUri();
			return ResponseEntity.created(uri).body(savedCaoDeServico);
		} catch (Exception e) {
			throw new CustomException("Erro ao processar o cão de serviço", e);
		}
	}

	@PutMapping(value = "/update/{id}", consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity<CaoDeServico> update(
			@PathVariable Long id,
			@RequestParam("nome") String nome,
			@RequestParam("nascimento") String nascimento,
			@RequestParam("raca") String raca,
			@RequestParam("microchip") String microchip,
			@RequestParam("categoria") String categoria,
			@RequestPart(value = "foto", required = false) MultipartFile foto) {
		try {
			Optional<CaoDeServico> optionalCaoDeServico = service.findById(id);
			if (optionalCaoDeServico.isEmpty()) {
				return ResponseEntity.notFound().build();
			}
			CaoDeServico caoDeServico = optionalCaoDeServico.get();
			caoDeServico.setNome(nome);
			DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
			Date nascimentoDate = df.parse(nascimento);
			caoDeServico.setNascimento(nascimentoDate);
			caoDeServico.setRaca(raca);
			caoDeServico.setMicrochip(Long.parseLong(microchip));
			caoDeServico.setCategoria(Categoria.fromDescricao(categoria));
			if (foto != null && !foto.isEmpty()) {
				caoDeServico.setFoto(foto.getBytes());
			}
			CaoDeServico updatedCaoDeServico = service.update(id, caoDeServico);
			return ResponseEntity.ok().body(updatedCaoDeServico);
		} catch (Exception e) {
			throw new CustomException("Erro ao atualizar o cão de serviço", e);
		}
	}

}
