package caodeservico.msuser.resources;

import caodeservico.msuser.entities.User;
import caodeservico.msuser.services.GenericService;
import caodeservico.msuser.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/users")
public class UserResource extends GenericResource<User, Long> {

	@Autowired
	private UserService service;

	@Override
	protected GenericService<User, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(User entity) {
		return entity.getId();
	}

	@GetMapping(value = "/search")
	public ResponseEntity<User> findByEmail(@RequestParam String email) {
		User obj = service.findByEmail(email);
		return ResponseEntity.ok(obj);
	}

}