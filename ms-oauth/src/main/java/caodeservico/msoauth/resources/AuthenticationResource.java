package caodeservico.msoauth.resources;

import caodeservico.msoauth.services.AuthenticationService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/oauth")
public class AuthenticationResource {

    private final AuthenticationService authenticationService;

    public AuthenticationResource(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public String authenticate(Authentication authentication) {
        return authenticationService.authenticate(authentication);
    }

}
