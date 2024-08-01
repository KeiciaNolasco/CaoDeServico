package caodeservico.msoauth.entities;

import lombok.*;

import java.io.Serial;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Role implements Serializable {

	@Serial
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;

	private List<User> users = new ArrayList<>();

}
