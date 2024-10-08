package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private Long id;

	private String email;

	private String senha;

	@JsonProperty("roles")
	@JsonIgnoreProperties(value = { "users" })
	private List<Role> roles = new ArrayList<>();

}

