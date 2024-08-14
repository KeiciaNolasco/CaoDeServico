package caodeservico.apigateway.configs;

import java.security.interfaces.RSAPublicKey;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authorization.AuthorizationDecision;
import org.springframework.security.config.annotation.method.configuration.EnableReactiveMethodSecurity;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.NimbusReactiveJwtDecoder;
import org.springframework.security.oauth2.jwt.ReactiveJwtDecoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authorization.AuthorizationContext;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
@EnableReactiveMethodSecurity
public class SecurityConfig {

    @Value("${jwt.public.key}")
    private RSAPublicKey publicKey;

    @Bean
    SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http.csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(auth -> auth
                        .pathMatchers(HttpMethod.POST, "/ms-oauth/oauth/login").permitAll()

                        .pathMatchers(HttpMethod.GET, "/ms-user/users").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-user/users/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-user/users/save").permitAll()
                        .pathMatchers(HttpMethod.POST, "/ms-user/users/admin/save").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.PUT, "/ms-user/users/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.PUT, "/ms-user/users/admin/update/{id}").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.DELETE, "/ms-user/users/delete/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-user/users/save/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.GET, "/ms-user/users/email/{email}").access(this::authorizeUserByEmail)

                        .pathMatchers(HttpMethod.GET, "/ms-user/roles").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-user/roles/findById/{id}").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.POST, "/ms-user/roles/save").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.PUT, "/ms-user/roles/update/{id}").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.DELETE, "/ms-user/roles/delete/{id}").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-user/roles/nome/{nome}").hasAuthority("ROLE_ADMIN")

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/cadastros").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/cadastros/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/cadastros/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/cadastros/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/cadastros/delete/{id}").access(this::authorizeUserById)

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/condutores").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/condutores/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/condutores/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/condutores/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/condutores/delete/{id}").access(this::authorizeUserById)

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/caesdeservicos").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/caesdeservicos/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/caesdeservicos/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/caesdeservicos/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/caesdeservicos/delete/{id}").access(this::authorizeUserById)

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/enderecos").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/enderecos/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/enderecos/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/enderecos/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/enderecos/delete/{id}").access(this::authorizeUserById)

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/documentacoes").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/documentacoes/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/documentacoes/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/documentacoes/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/documentacoes/delete/{id}").access(this::authorizeUserById)

                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/adestramentos").hasAuthority("ROLE_ADMIN")
                        .pathMatchers(HttpMethod.GET, "/ms-cadastro/adestramentos/findById/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.POST, "/ms-cadastro/adestramentos/save/{id}").permitAll()
                        .pathMatchers(HttpMethod.PUT, "/ms-cadastro/adestramentos/update/{id}").access(this::authorizeUserById)
                        .pathMatchers(HttpMethod.DELETE, "/ms-cadastro/adestramentos/delete/{id}").access(this::authorizeUserById)

                        .anyExchange().authenticated()
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.jwtDecoder(jwtDecoder()).jwtAuthenticationConverter(jwtAuthenticationConverter()))
                )
                .cors(cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOriginPattern("*");
        configuration.addAllowedOrigin("http://localhost:4200");
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.addAllowedHeader("*");
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    ReactiveJwtDecoder jwtDecoder() {
        return NimbusReactiveJwtDecoder.withPublicKey(this.publicKey).build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        jwtGrantedAuthoritiesConverter.setAuthoritiesClaimName("roles");
        jwtGrantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        Converter<Jwt, Collection<GrantedAuthority>> grantedAuthoritiesConverter = jwt -> {
            Collection<GrantedAuthority> authorities = jwtGrantedAuthoritiesConverter.convert(jwt);

            String userId = jwt.getClaimAsString("userId");
            if (userId != null) {
                authorities.add(new SimpleGrantedAuthority("USER_ID_" + userId));
            }

            String email = jwt.getClaimAsString("email");
            if (email != null) {
                authorities.add(new SimpleGrantedAuthority("EMAIL_" + email));
            }

            return authorities;
        };

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return new ReactiveJwtAuthenticationConverterAdapter(jwtAuthenticationConverter);
    }

    private Mono<AuthorizationDecision> authorizeUserById(Mono<Authentication> authentication, AuthorizationContext context) {
        return authentication.map(auth -> {
            String userId = (String) context.getVariables().get("id");
            boolean hasAdminRole = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
            boolean isUser = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("USER_ID_" + userId));

            return new AuthorizationDecision(hasAdminRole || isUser);
        });
    }

    private Mono<AuthorizationDecision> authorizeUserByEmail(Mono<Authentication> authentication, AuthorizationContext context) {
        return authentication.map(auth -> {
            String email = (String) context.getVariables().get("email");
            boolean hasAdminRole = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
            boolean isUser = auth.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("EMAIL_" + email));

            return new AuthorizationDecision(hasAdminRole || isUser);
        });
    }

}
