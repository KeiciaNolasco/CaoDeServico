package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.Documentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DocumentacaoRepository extends JpaRepository<Documentacao, Long> {

}