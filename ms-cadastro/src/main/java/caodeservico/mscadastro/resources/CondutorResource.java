package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Condutor;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/condutores")
public class CondutorResource extends GenericResource<Condutor, Long> {

	@Autowired
	private GenericService<Condutor, Long> service;

	@Override
	protected GenericService<Condutor, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Condutor entity) {
		return entity.getId();
	}

}
