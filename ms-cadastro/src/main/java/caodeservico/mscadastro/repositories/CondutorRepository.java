package caodeservico.mscadastro.repositories;

import caodeservico.mscadastro.entities.Condutor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CondutorRepository extends JpaRepository<Condutor, Long> {

}