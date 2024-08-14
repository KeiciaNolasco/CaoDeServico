package caodeservico.msoauth.resources;

import caodeservico.msoauth.services.AuthenticationService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/oauth")
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    public AuthenticationResource(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public String authenticate(@RequestParam String username, @RequestParam String password) {
        return authenticationService.authenticate(username, password);
    }

}
