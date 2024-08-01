package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.Documentacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.Optional;

@Repository
public interface DocumentacaoRepository extends JpaRepository<Documentacao, Long> {

}