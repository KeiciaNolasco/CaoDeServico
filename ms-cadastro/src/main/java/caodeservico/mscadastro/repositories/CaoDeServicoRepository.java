package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.CaoDeServico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CaoDeServicoRepository extends JpaRepository<CaoDeServico, Long> {

}
