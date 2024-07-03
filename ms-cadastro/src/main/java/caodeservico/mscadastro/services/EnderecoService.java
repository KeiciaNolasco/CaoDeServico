package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Endereco;
import caodeservico.mscadastro.repositories.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService extends GenericService<Endereco, Long> {

	@Autowired
	private EnderecoRepository repository;

	@Override
	protected JpaRepository<Endereco, Long> getRepository() {
		return repository;
	}

}
