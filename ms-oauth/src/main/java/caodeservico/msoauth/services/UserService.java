package caodeservico.msoauth.services;

import caodeservico.msoauth.entities.User;
import caodeservico.msoauth.feignclients.UserFeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
public class UserService {

    private final UserFeignClient userFeignClient;

    public UserService(UserFeignClient userFeignClient) {
        this.userFeignClient = userFeignClient;
    }

    public Mono<User> findByEmail(String email) {
        return Mono.fromCallable(() -> {
            ResponseEntity<User> response = userFeignClient.findByEmail(email);
            if (response.getBody() == null) {
                throw new IllegalArgumentException("Email not found: " + email);
            }
            return response.getBody();
        }).subscribeOn(Schedulers.boundedElastic());
    }

}
