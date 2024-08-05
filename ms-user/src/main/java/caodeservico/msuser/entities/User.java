package caodeservico.msuser.entities;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Getter
@Setter
@Table(name = "tabela_user")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@JsonProperty("Nome")
	private String nome;

	@Column(nullable = false, unique = true)
	@JsonProperty("Email")
	private String email;

	@Column(nullable = false)
	@JsonProperty("Senha")
	private String senha;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "tabela_user_role", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"), uniqueConstraints = @UniqueConstraint(columnNames = {"user_id", "role_id"}))
	@JsonProperty("Roles")
	@JsonIgnoreProperties(value = { "Users" })
	private List<Role> roles = new ArrayList<>();

}