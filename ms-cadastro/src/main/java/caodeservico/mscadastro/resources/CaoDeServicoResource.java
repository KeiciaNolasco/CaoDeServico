package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.CaoDeServico;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
