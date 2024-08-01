package caodeservico.msoauth.entities;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.*;

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

	@JsonProperty("Nome")
	private String nome;

	@JsonProperty("Email")
	private String email;

	@JsonProperty("Senha")
	private String senha;

	@JsonProperty("Roles")
	@JsonIgnoreProperties(value = { "Users" })
	private List<Role> roles = new ArrayList<>();

}
