package caodeservico.msuser.services;

import caodeservico.msuser.entities.Role;
import caodeservico.msuser.entities.User;
import caodeservico.msuser.exceptions.CustomException;
import caodeservico.msuser.repositories.RoleRepository;
import caodeservico.msuser.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRepository userRepository;

	public List<Role> findAll() {
		try {
			return roleRepository.findAll();
		} catch (Exception e) {
			throw new CustomException("Falha ao buscar todos os perfis: ", e);
		}
	}

	public Role findById(Long id) {
		return roleRepository.findById(id)
				.orElseThrow(() -> new CustomException("Não existe perfil de usuário com o id: " + id));
	}

	public Role save(Role role) {
		try {
			return roleRepository.save(role);
		} catch (Exception e) {
			throw new CustomException("Falha ao salvar o perfil: ", e);
		}
	}

	public Role update(Long id, Role role) {
		Role existingRole = roleRepository.findById(id)
				.orElseThrow(() -> new CustomException("Não existe perfil de usuário com o id: " + id));
		existingRole.setNome(role.getNome());
		try {
			return roleRepository.save(existingRole);
		} catch (Exception e) {
			throw new CustomException("Falha ao atualizar o perfil: ", e);
		}
	}

	public void delete(Long id) {
		Role role = roleRepository.findById(id)
				.orElseThrow(() -> new CustomException("Não existe perfil de usuário com o id: " + id));
		List<User> users = userRepository.findAll();
		for (User user : users) {
			if (user.getRoles().contains(role)) {
				throw new CustomException("Não é possível deletar o perfil com id: " + id + " porque ele possui usuários associados.");
			}
		}
		try {
			roleRepository.deleteById(id);
		} catch (Exception e) {
			throw new CustomException("Falha ao deletar o perfil: ", e);
		}
	}

	public Role findByNome(String nome) {
		try {
			return roleRepository.findByNome(nome);
		} catch (Exception e) {
			throw new CustomException("Não existe perfil de usuário com nome: ", e);
		}
	}

}
