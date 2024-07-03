package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Adestramento;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/adestramentos")
public class AdestramentoResource extends GenericResource<Adestramento, Long> {

	@Autowired
	private GenericService<Adestramento, Long> service;

	@Override
	protected GenericService<Adestramento, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Adestramento entity) {
		return entity.getId();
	}

}
