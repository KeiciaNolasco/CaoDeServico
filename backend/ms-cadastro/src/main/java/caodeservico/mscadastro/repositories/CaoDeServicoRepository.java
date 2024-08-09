package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.CaoDeServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CaoDeServicoRepository extends JpaRepository<CaoDeServico, Long> {

}
