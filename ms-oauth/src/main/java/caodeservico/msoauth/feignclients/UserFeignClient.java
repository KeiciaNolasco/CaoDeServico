package caodeservico.msoauth.feignclients;

import caodeservico.msoauth.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "ms-user", path = "/users")
public interface UserFeignClient {

    @GetMapping(value = "/search")
    User findByEmail(@RequestParam("email") String email);

    @PostMapping("/users")
    User save(@RequestBody User user);

    @PutMapping("/users/{id}")
    User update(@RequestBody User user);

}

