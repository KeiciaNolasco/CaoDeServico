package caodeservico.mscadastro.feignclients;

import caodeservico.mscadastro.entities.User;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Component
@FeignClient(name = "ms-user", path = "/users")
public interface UserFeignClient {

    @GetMapping(value = "/findById/{id}")
    User findById(@PathVariable("id") Long id);

    @PostMapping("/save")
    User save(@RequestBody User user);

}

