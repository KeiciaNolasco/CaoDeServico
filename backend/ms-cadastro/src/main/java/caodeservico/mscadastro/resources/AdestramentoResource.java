package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Adestramento;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/adestramentos")
public class AdestramentoResource extends GenericResource<Adestramento, Long> {

	private final GenericService<Adestramento, Long> service;

	@Autowired
	public AdestramentoResource(GenericService<Adestramento, Long> service) {
		this.service = service;
    }

	@Override
	protected GenericService<Adestramento, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Adestramento entity) {
		return entity.getId();
	}

}
