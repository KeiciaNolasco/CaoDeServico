package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Cadastro;
import caodeservico.mscadastro.repositories.CadastroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class CadastroService extends GenericService<Cadastro, Long> {

	@Autowired
	private CadastroRepository repository;

	@Override
	protected JpaRepository<Cadastro, Long> getRepository() {
		return repository;
	}

}
