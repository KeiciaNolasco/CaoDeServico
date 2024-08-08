package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.Adestramento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdestramentoRepository extends JpaRepository<Adestramento, Long> {

}
