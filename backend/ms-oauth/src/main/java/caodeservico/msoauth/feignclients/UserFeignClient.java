package caodeservico.msoauth.feignclients;

import caodeservico.msoauth.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "ms-user", path = "/users")
public interface UserFeignClient {

    @GetMapping(value = "/email/{email}")
    User findByEmail(@PathVariable("email") String email);

}

