package caodeservico.msoauth.services;

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
    
}
