package caodeservico.mscadastro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class MsCadastroApplication {

    public static void main(String[] args) {
        SpringApplication.run(MsCadastroApplication.class, args);
    }

}
