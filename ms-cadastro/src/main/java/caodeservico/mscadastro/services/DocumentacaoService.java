package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Documentacao;
import caodeservico.mscadastro.repositories.DocumentacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class DocumentacaoService extends GenericService<Documentacao, Long> {

	@Autowired
	private DocumentacaoRepository repository;

	@Override
	protected JpaRepository<Documentacao, Long> getRepository() {
		return repository;
	}

}
