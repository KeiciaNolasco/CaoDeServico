package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;
import lombok.Getter;

import java.io.IOException;

@Getter
@JsonSerialize(using = Categoria.CategoriaSerializer.class)
@JsonDeserialize(using = Categoria.CategoriaDeserializer.class)
public enum Categoria {
	CAO_DE_ALERTA_MEDICO_PARA_ALERGIA("Cão de Alerta Médico para Alergia"),
	CAO_DE_ALERTA_MEDICO_PARA_CARDIACO("Cão de Alerta Médico para Cardíaco"),
	CAO_DE_ALERTA_MEDICO_PARA_DIABETICO("Cão de Alerta Médico para Diabético"),
	CAO_DE_ALERTA_MEDICO_PARA_EPILEPSIA_OU_CONVULSAO("Cão de Alerta Médico para Epilepsia ou Convulsão"),
	CAO_DE_ALERTA_MEDICO_PSIQUIATRICO("Cão de Alerta Médico Psiquiátrico"),
	CAO_OUVINTE("Cão Ouvinte"),
	CAO_DE_RESPOSTA_MEDICO_PARA_ALERGIA("Cão de Resposta Médico para Alergia"),
	CAO_DE_RESPOSTA_MEDICO_PARA_CARDIACO("Cão de Resposta Médico para Cardíaco"),
	CAO_DE_RESPOSTA_MEDICO_PARA_DIABETICO("Cão de Resposta Médico para Diabético"),
	CAO_DE_RESPOSTA_MEDICO_PARA_EPILEPSIA_OU_CONVULSAO("Cão de Resposta Médico para Epilepsia ou Convulsão"),
	CAO_DE_SERVICO_EMOCIONAL("Cão de Serviço Emocional"),
	CAO_DE_SERVICO_DE_MOBILIDADE("Cão de Serviço de Mobilidade"),
	CAO_DE_SERVICO_MULTIFUNCAO("Cão de Serviço Multifunção"),
	CAO_DE_SERVICO_PSIQUIATRICO("Cão de Serviço Psiquiátrico");

	private final String descricao;

	Categoria(String descricao) {
		this.descricao = descricao;
	}

    public static Categoria fromDescricao(String descricao) {
		for (Categoria categoria : Categoria.values()) {
			if (categoria.getDescricao().equalsIgnoreCase(descricao.trim())) {
				return categoria;
			}
		}
		throw new IllegalArgumentException("Categoria desconhecida: " + descricao);
	}

	public static class CategoriaSerializer extends JsonSerializer<Categoria> {
		@Override
		public void serialize(Categoria categoria, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
			jsonGenerator.writeString(categoria.getDescricao());
		}
	}

	public static class CategoriaDeserializer extends JsonDeserializer<Categoria> {
		@Override
		public Categoria deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
			String descricao = jsonParser.getText().trim();
			return Categoria.fromDescricao(descricao);
		}
	}

	@Converter(autoApply = true)
	public static class CategoriaConverter implements AttributeConverter<Categoria, String> {
		@Override
		public String convertToDatabaseColumn(Categoria categoria) {
			if (categoria == null) {
				return null;
			}
			return categoria.getDescricao();
		}

		@Override
		public Categoria convertToEntityAttribute(String descricao) {
			if (descricao == null) {
				return null;
			}
			return Categoria.fromDescricao(descricao);
		}
	}

}
