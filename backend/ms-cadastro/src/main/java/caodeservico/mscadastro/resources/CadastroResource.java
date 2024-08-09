package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Cadastro;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/cadastros")
public class CadastroResource extends GenericResource<Cadastro, Long> {

	private final GenericService<Cadastro, Long> service;

	@Autowired
	public CadastroResource(GenericService<Cadastro, Long> service) {
		this.service = service;
	}

	@Override
	protected GenericService<Cadastro, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Cadastro entity) {
		return entity.getId();
	}

}

