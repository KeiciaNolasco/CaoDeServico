package caodeservico.msuser.resources;

import caodeservico.msuser.entities.Role;
import caodeservico.msuser.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping(value = "/roles")
public class RoleResource {

	private final RoleService roleService;

	@Autowired
	public RoleResource(RoleService roleService) {
		this.roleService = roleService;
	}

	@GetMapping
	public ResponseEntity<List<Role>> findAll() {
		List<Role> list = roleService.findAll();
		return ResponseEntity.ok().body(list);
	}

	@GetMapping("/findById/{id}")
	public ResponseEntity<Role> findById(@PathVariable Long id) {
		Role obj = roleService.findById(id);
		return ResponseEntity.ok().body(obj);
	}

	@PostMapping("/save")
	public ResponseEntity<Role> save(@RequestBody Role role) {
		Role obj = roleService.save(role);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).body(obj);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<Role> update(@PathVariable Long id, @RequestBody Role role) {
		Role updatedObj = roleService.update(id, role);
		return ResponseEntity.ok().body(updatedObj);
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		roleService.delete(id);
		return ResponseEntity.noContent().build();
	}

	@GetMapping(value = "/nome/{nome}")
	public ResponseEntity<Role> findByNome(@PathVariable String nome) {
		Role obj = roleService.findByNome(nome);
		return ResponseEntity.ok(obj);
	}

}