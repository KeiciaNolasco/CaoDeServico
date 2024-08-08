package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Documentacao;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
