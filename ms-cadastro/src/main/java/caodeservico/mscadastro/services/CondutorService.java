package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Condutor;
import caodeservico.mscadastro.repositories.CondutorRepository;
import caodeservico.mscadastro.repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CondutorService extends GenericService<Condutor, Long> {

	private final CondutorRepository repository;


	@Autowired
	public CondutorService(CondutorRepository repository) {
		this.repository = repository;
    }

	@Override
	protected JpaRepository<Condutor, Long> getRepository() {
		return repository;
	}

}
