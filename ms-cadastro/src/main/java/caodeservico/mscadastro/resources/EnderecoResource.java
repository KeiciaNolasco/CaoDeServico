package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.entities.Endereco;
import caodeservico.mscadastro.services.GenericService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/enderecos")
public class EnderecoResource extends GenericResource<Endereco, Long> {

	@Autowired
	private GenericService<Endereco, Long> service;

	@Override
	protected GenericService<Endereco, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Endereco entity) {
		return entity.getId();
	}

}
