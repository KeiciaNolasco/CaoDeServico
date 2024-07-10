package caodeservico.msuser.services;

import caodeservico.msuser.entities.User;
import caodeservico.msuser.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService extends GenericService<User, Long> {

	@Autowired
	private UserRepository repository;

	@Override
	protected JpaRepository<User, Long> getRepository() {
		return repository;
	}

	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}

}
