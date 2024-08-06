package caodeservico.msoauth.services;

import caodeservico.msoauth.entities.Role;
import caodeservico.msoauth.entities.User;
import caodeservico.msoauth.feignclients.RoleFeignClient;
import caodeservico.msoauth.feignclients.UserFeignClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private static final Logger logger = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private final UserFeignClient userFeignClient;

    @Autowired
    private final RoleFeignClient roleFeignClient;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    public UserService(UserFeignClient userFeignClient, RoleFeignClient roleFeignClient, PasswordEncoder passwordEncoder) {
        this.userFeignClient = userFeignClient;
        this.roleFeignClient = roleFeignClient;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public User findByEmail(String email) {
        logger.info("Fetching user by email: {}", email);
        User user = userFeignClient.findByEmail(email);
        if (user == null) {
            logger.error("Email not found: {}", email);
            throw new IllegalArgumentException("Email not found");
        }
        logger.info("Email found: {}", email);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userFeignClient.findByEmail(username);
        if (user == null) {
            logger.error("Email not found: {}", username);
            throw new UsernameNotFoundException("Email not found");
        }
        logger.info("Email found: " + username);

        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> {
                    Role fetchedRole = roleFeignClient.findByNome(role.getNome());
                    return new SimpleGrantedAuthority(fetchedRole.getNome());
                })
                .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getSenha(),
                authorities
        );
    }

}
