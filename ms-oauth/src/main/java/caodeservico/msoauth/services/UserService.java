package caodeservico.msoauth.services;

import caodeservico.msoauth.entities.Role;
import caodeservico.msoauth.entities.User;
import caodeservico.msoauth.feignclients.RoleFeignClient;
import caodeservico.msoauth.feignclients.UserFeignClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService implements UserDetailsService {

    private final UserFeignClient userFeignClient;

    private final RoleFeignClient roleFeignClient;

    @Autowired
    public UserService(UserFeignClient userFeignClient, RoleFeignClient roleFeignClient) {
        this.userFeignClient = userFeignClient;
        this.roleFeignClient = roleFeignClient;
    }

    public User findByEmail(String email) {
        User user = userFeignClient.findByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("Email not found");
        }
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userFeignClient.findByEmail(username);
        if (user == null) {
            throw new UsernameNotFoundException("Email not found");
        }
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
