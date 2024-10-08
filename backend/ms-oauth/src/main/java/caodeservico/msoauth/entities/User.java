package caodeservico.msoauth.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.io.Serial;
import java.io.Serializable;
import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class User implements UserDetails, Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private Long id;

	private String email;

	private String senha;

	@JsonProperty("roles")
	@JsonIgnoreProperties(value = { "users" })
	private List<Role> roles = new ArrayList<>();

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public String getPassword() {
		return senha;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(() -> "read");
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}

