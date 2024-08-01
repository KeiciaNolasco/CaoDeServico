package caodeservico.msoauth.services;

import caodeservico.msoauth.entities.User;
import caodeservico.msoauth.feignclients.UserFeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.ReactiveUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class CustomReactiveUserDetailsService implements ReactiveUserDetailsService {

    private final UserFeignClient userFeignClient;

    public CustomReactiveUserDetailsService(UserFeignClient userFeignClient) {
        this.userFeignClient = userFeignClient;
    }

    @Override
    public Mono<UserDetails> findByUsername(String username) {
        return Mono.fromCallable(() -> {
                    ResponseEntity<User> response = userFeignClient.findByEmail(username);
                    if (response.getBody() == null) {
                        throw new UsernameNotFoundException("Email not found: " + username);
                    }
                    return response.getBody();
                }).subscribeOn(Schedulers.boundedElastic())
                .map(user -> (UserDetails) user);
    }

}
