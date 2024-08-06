package caodeservico.msoauth.resources;

import caodeservico.msoauth.entities.Role;
import caodeservico.msoauth.services.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/roles")
public class RoleResource {

    private final RoleService roleService;

    public RoleResource(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping(value = "/search")
    public ResponseEntity<Role> findByNome(@RequestParam String nome) {
        Role obj = roleService.findByNome(nome);
        return ResponseEntity.ok(obj);
    }

}
