package caodeservico.mscadastro.entities;


import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

public enum Categoria {
	CÃO_DE_ALERTA_MÉDICO_PARA_ALERGIA("Alerta Médico para Alergia"),
	CÃO_DE_ALERTA_MÉDICO_PARA_CARDÍACO("Alerta Médico para Cardíaco"),
	CÃO_DE_ALERTA_MÉDICO_PARA_DIABÉTICO("Alerta Médico para Diabético"),
	CÃO_DE_ALERTA_MÉDICO_PARA_EPILEPSIA_OU_CONVULSÃO("Alerta Médico para Epilepsia ou Convulsão"),
	CÃO_DE_ALERTA_MÉDICO_PSIQUIÁTRICO("Alerta Médico Psiquiátrico"),
	CÃO_OUVINTE("Ouvinte"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_ALERGIA("Resposta Médico para Alergia"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_CARDÍACO("Resposta Médico para Cardíaco"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_DIABÉTICO("Resposta Médico para Diabético"),
	CÃO_DE_RESPOSTA_MÉDICO_PARA_EPILEPSIA_OU_CONVULSÃO("Resposta Médico para Epilepsia ou Convulsão"),
	CÃO_DE_SERVIÇO_EMOCIONAL("Serviço Emocional"),
	CÃO_DE_SERVIÇO_DE_MOBILIDADE("Serviço de Mobilidade"),
	CÃO_DE_SERVIÇO_MULTIFUNÇÃO("Serviço Multifuncional"),
	CÃO_DE_SERVIÇO_PSIQUIÁTRICO("Serviço Psiquiátrico");

	private String descricao;

	Categoria(String descricao) {
		this.descricao = descricao;
	}

	public String getDescricao() {
		return descricao;
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