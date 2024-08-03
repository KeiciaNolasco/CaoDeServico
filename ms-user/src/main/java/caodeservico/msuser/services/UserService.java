package caodeservico.msuser.services;

import caodeservico.msuser.entities.User;
import caodeservico.msuser.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService extends GenericService<User, Long> {

	@Autowired
	private UserRepository repository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	protected JpaRepository<User, Long> getRepository() {
		return repository;
	}

	public User findByEmail(String email) {
		return repository.findByEmail(email);
	}

	@Override
	public User save(User user) {
		user.setSenha(passwordEncoder.encode(user.getSenha()));
		return super.save(user);
	}

	@Override
	public User update(Long id, User user) {
		User existingUser = repository.findById(id).orElseThrow(() -> new RuntimeException("User not found with id " + id));
		user.setSenha(passwordEncoder.encode(user.getSenha()));
		user.setId(existingUser.getId());
		return super.save(user);
	}

}
