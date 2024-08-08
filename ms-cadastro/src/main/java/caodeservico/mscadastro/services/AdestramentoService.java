package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Adestramento;
import caodeservico.mscadastro.repositories.AdestramentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class AdestramentoService extends GenericService<Adestramento, Long> {

	private final AdestramentoRepository repository;

	@Autowired
	public AdestramentoService(AdestramentoRepository repository) {
        this.repository = repository;
    }

	@Override
	protected JpaRepository<Adestramento, Long> getRepository() {
		return repository;
	}

}
