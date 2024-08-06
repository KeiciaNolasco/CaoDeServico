package caodeservico.apigateway.configs;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import org.springframework.security.oauth2.jwt.Jwt;

@Component
public class SecurityExpression {

    public boolean isAdminOrHasMatchingEmail(Authentication authentication, String id, String email) {
        if (authentication == null || !(authentication.getPrincipal() instanceof Jwt)) {
            return false;
        }

        Jwt jwt = (Jwt) authentication.getPrincipal();
        String userEmail = jwt.getClaimAsString("email");
        String roles = jwt.getClaimAsString("roles");

        return roles.contains("ROLE_ADMIN") || email.equals(userEmail);
    }

}
