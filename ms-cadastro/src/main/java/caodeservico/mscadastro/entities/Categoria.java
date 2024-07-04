package caodeservico.mscadastro.entities;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

import java.io.IOException;

public enum Categoria {
	CÃO_DE_ALERTA_MÉDICO_PARA_ALERGIA("Cão de Alerta Médico para Alergia"),
	CÃO_DE_ALERTA_MÉDICO_PARA_CARDÍACO("Cão de Alerta Médico para Cardíaco"),
	CÃO_DE_ALERTA_MÉDICO_PARA_DIABÉTICO("Cão de Alerta Médico para Diabético"),
	CÃO_DE_ALERTA_MÉDICO_PARA_EPILEPSIA_OU_CONVULSÃO("Cão de Alerta Médico para Epilepsia ou Convulsão"),
	CÃO_DE_ALERTA_MÉDICO_PSIQUIÁTRICO("Cão de Alerta Médico Psiquiátrico"),
	CÃO_OUVINTE("Cão Ouvinte"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_ALERGIA("Cão de Resposta Médico para Alergia"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_CARDÍACO("Cão de Resposta Médico para Cardíaco"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_DIABÉTICO("Cão de Resposta Médico para Diabético"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_EPILEPSIA_OU_CONVULSÃO("Cão de Resposta Médico para Epilepsia ou Convulsão"),
	CÃO_DE_SERVIÇO_EMOCIONAL("Cão de Serviço Emocional"),
	CÃO_DE_SERVIÇO_DE_MOBILIDADE("Cão de Serviço de Mobilidade"),
	CÃO_DE_SERVIÇO_MULTIFUNÇÃO("Cão de Serviço Multifunção"),
	CÃO_DE_SERVIÇO_PSIQUIÁTRICO("Cão de Serviço Psiquiátrico");

	private String descricao;

	Categoria(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
	}

	public static class CategoriaSerializer extends JsonSerializer<Categoria> {
		@Override
		public void serialize(Categoria categoria, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
			jsonGenerator.writeString(categoria.getDescricao());
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

			for (Categoria categoria : Categoria.values()) {
				if (categoria.getDescricao().equals(descricao)) {
					return categoria;
				}
			}

			throw new IllegalArgumentException("Unknown value: " + descricao);
		}
	}

}