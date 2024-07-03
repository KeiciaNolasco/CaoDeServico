package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Condutor;
import caodeservico.mscadastro.repositories.CondutorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CondutorService extends GenericService<Condutor, Long> {

	@Autowired
	private CondutorRepository repository;

	@Override
	protected JpaRepository<Condutor, Long> getRepository() {
		return repository;
	}

}
