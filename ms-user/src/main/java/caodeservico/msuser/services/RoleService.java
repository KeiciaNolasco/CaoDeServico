package caodeservico.msuser.services;

import caodeservico.msuser.entities.Role;
import caodeservico.msuser.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class RoleService extends GenericService<Role, Long> {

	@Autowired
	private RoleRepository repository;

	@Override
	protected JpaRepository<Role, Long> getRepository() {
		return repository;
	}

	public Role findByNome(String nome) {
		return repository.findByNome(nome);
	}

}
