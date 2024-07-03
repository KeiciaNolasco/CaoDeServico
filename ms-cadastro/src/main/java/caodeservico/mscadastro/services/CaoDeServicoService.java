package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.CaoDeServico;
import caodeservico.mscadastro.repositories.CaoDeServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CaoDeServicoService extends GenericService<CaoDeServico, Long> {

	@Autowired
	private CaoDeServicoRepository repository;

	@Override
	protected JpaRepository<CaoDeServico, Long> getRepository() {
		return repository;
	}

}