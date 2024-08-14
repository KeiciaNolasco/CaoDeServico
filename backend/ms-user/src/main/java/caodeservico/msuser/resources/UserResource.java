package caodeservico.msuser.resources;

import caodeservico.msuser.entities.User;
import caodeservico.msuser.entities.Role;
import caodeservico.msuser.services.RoleService;
import caodeservico.msuser.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping(value = "/users")
public class UserResource {

	private final UserService userService;

	private final RoleService roleService;

	@Autowired
	public UserResource(UserService userService, RoleService roleService) {
		this.userService = userService;
		this.roleService = roleService;
    }

	@GetMapping
	public ResponseEntity<List<User>> findAll() {
		List<User> list = userService.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/findById/{id}")
	public ResponseEntity<User> findById(@PathVariable Long id) {
		User obj = userService.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PostMapping("/save")
	public ResponseEntity<User> save(@RequestBody User request) {
		Role userRole = roleService.findByNome("CUSTOMER");
		request.setRoles(Collections.singletonList(userRole));
		User user = userService.save(request);
		return ResponseEntity.ok(user);
	}

	@PostMapping("/admin/save")
	public ResponseEntity<User> adminSave(@RequestBody User request) {
		List<Role> roles = request.getRoles().stream()
				.map(role -> roleService.findByNome(role.getNome()))
				.collect(Collectors.toList());
		request.setRoles(roles);
		User user = userService.save(request);
		return ResponseEntity.ok(user);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
		User existingUser = userService.findById(id);
		user.setRoles(existingUser.getRoles());
		User updatedUser = userService.update(id, user);
		return ResponseEntity.ok().body(updatedUser);
	}

	@PutMapping("/admin/update/{id}")
	public ResponseEntity<User> adminUpdate(@PathVariable Long id, @RequestBody User user) {
		List<Role> roles = user.getRoles().stream()
				.map(role -> roleService.findByNome(role.getNome()))
				.collect(Collectors.toList());
		user.setRoles(roles);
		User updatedUser = userService.update(id, user);
		return ResponseEntity.ok().body(updatedUser);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		userService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping(value = "/email/{email}")
	public ResponseEntity<User> findByEmail(@PathVariable String email) {
		User obj = userService.findByEmail(email);
		return ResponseEntity.ok(obj);
	}

}