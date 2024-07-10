package caodeservico.msuser.resources;

import caodeservico.msuser.entities.Role;
import caodeservico.msuser.services.GenericService;
import caodeservico.msuser.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/roles")
public class RoleResource extends GenericResource<Role, Long> {

	@Autowired
	private RoleService service;

	@Override
	protected GenericService<Role, Long> getService() {
		return service;
	}

	@Override
	protected Long getId(Role entity) {
		return entity.getId();
	}

	@GetMapping(value = "/search")
	public ResponseEntity<Role> findByNome(@RequestParam String nome) {
		Role obj = service.findByNome(nome);
		return ResponseEntity.ok(obj);
	}

}
