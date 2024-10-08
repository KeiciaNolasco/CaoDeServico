package caodeservico.msoauth.feignclients;

import caodeservico.msoauth.entities.Role;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

@Component
@FeignClient(name = "ms-user", path = "/roles")
public interface RoleFeignClient {

    @GetMapping(value = "/nome/{nome}")
    Role findByNome(@PathVariable("nome") String nome);

}

