package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Endereco;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enderecos")
public class EnderecoResource extends GenericResource<Endereco, Long> {

	private final GenericService<Endereco, Long> service;

	@Autowired
	public EnderecoResource(GenericService<Endereco, Long> service) {
		this.service = service;
    }

	@Override
	protected GenericService<Endereco, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Endereco entity) {
		return entity.getId();
	}

}
