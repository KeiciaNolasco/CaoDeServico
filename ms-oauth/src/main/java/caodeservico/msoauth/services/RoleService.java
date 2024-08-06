package caodeservico.msoauth.services;

import caodeservico.msoauth.entities.Role;
import caodeservico.msoauth.feignclients.RoleFeignClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleService {

    private static final Logger logger = LoggerFactory.getLogger(RoleService.class);

    @Autowired
    private final RoleFeignClient roleFeignClient;

    public RoleService(RoleFeignClient roleFeignClient) {
        this.roleFeignClient = roleFeignClient;
    }

    public Role findByNome(String nome) {
        Role role = roleFeignClient.findByNome(nome);
        logger.info("Fetching role by nome: {}", nome);
        if (role == null) {
            logger.error("Nome not found: {}", nome);
            throw new IllegalArgumentException("Nome not found");
        }
        logger.info("Nome found: {}", nome);
        return role;
    }
    
}
