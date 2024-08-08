package caodeservico.msuser.services;

import caodeservico.msuser.entities.Role;
import caodeservico.msuser.entities.User;
import caodeservico.msuser.exceptions.CustomException;
import caodeservico.msuser.repositories.RoleRepository;
import caodeservico.msuser.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

	private final UserRepository userRepository;

	private final PasswordEncoder passwordEncoder;

	private final RoleService roleService;

	@Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, RoleService roleService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
		this.roleService = roleService;
	}

    @Transactional
	public List<User> findAll() {
		try {
			return userRepository.findAll();
		} catch (Exception e) {
			throw new CustomException("Falha ao buscar todos os usuários: ", e);
		}
	}

	@Transactional
	public User findById(Long id) {
		return userRepository.findById(id)
				.orElseThrow(() -> new CustomException("Usuário não encontrado com o id: " + id));
	}

	@Transactional
	public User save(User user) {
		if (user.getSenha() == null || user.getSenha().isEmpty()) {
			throw new CustomException("Senha não pode ser nula ou vazia: ");
		}
		user.setSenha(passwordEncoder.encode(user.getSenha()));

		List<Role> roles = user.getRoles().stream()
				.map(role -> roleService.findByNome(role.getNome()))
				.collect(Collectors.toList());
		user.setRoles(roles);

		try {
			return userRepository.save(user);
		} catch (Exception e) {
			throw new CustomException("Falha ao salvar o usuário: ", e);
		}
	}

	@Transactional
	public User update(Long id, User user) {
		User existingUser = userRepository.findById(id)
				.orElseThrow(() -> new CustomException("Usuário não encontrado com o id: " + id));
		existingUser.setNome(user.getNome());
		existingUser.setEmail(user.getEmail());
		if (user.getSenha() != null && !user.getSenha().isEmpty()) {
			existingUser.setSenha(passwordEncoder.encode(user.getSenha()));
		}
		existingUser.setRoles(user.getRoles());
		try {
			return userRepository.save(existingUser);
		} catch (Exception e) {
			throw new CustomException("Falha ao atualizar o usuário: ", e);
		}
	}

	@Transactional
	public void delete(Long id) {
		User user = userRepository.findById(id).orElseThrow(() -> new CustomException("Usuário não encontrado com o id: " + id));
		try {
			user.setRoles(new ArrayList<>());
			userRepository.save(user);
			userRepository.deleteById(id);
		} catch (Exception e) {
			throw new CustomException("Falha ao deletar o usuário", e);
		}
	}

	@Transactional
	public User findByEmail(String email) {
		try {
			return userRepository.findByEmail(email);
		} catch (Exception e) {
			throw new CustomException("Falha ao buscar o usuário pelo email: ", e);
		}
	}

}
