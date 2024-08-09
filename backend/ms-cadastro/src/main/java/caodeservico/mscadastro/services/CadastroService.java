package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.Cadastro;
import caodeservico.mscadastro.exceptions.CustomException;
import caodeservico.mscadastro.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CadastroService extends GenericService<Cadastro, Long> {

	private final CadastroRepository cadastroRepository;
	private final CondutorRepository condutorRepository;
	private final CaoDeServicoRepository caoDeServicoRepository;
	private final EnderecoRepository enderecoRepository;
	private final AdestramentoRepository adestramentoRepository;
	private final DocumentacaoRepository documentacaoRepository;

	@Autowired
	public CadastroService(CadastroRepository cadastroRepository, CondutorRepository condutorRepository, CaoDeServicoRepository caoDeServicoRepository, EnderecoRepository enderecoRepository, AdestramentoRepository adestramentoRepository, DocumentacaoRepository documentacaoRepository) {
		this.cadastroRepository = cadastroRepository;
		this.condutorRepository = condutorRepository;
		this.caoDeServicoRepository = caoDeServicoRepository;
		this.enderecoRepository = enderecoRepository;
		this.adestramentoRepository = adestramentoRepository;
		this.documentacaoRepository = documentacaoRepository;
	}

	@Override
	protected JpaRepository<Cadastro, Long> getRepository() {
		return cadastroRepository;
	}

	@Transactional
	@Override
	public Cadastro save(Cadastro cadastro) {
		if (cadastro.getCondutor() != null) {
			condutorRepository.save(cadastro.getCondutor());
			if (cadastro.getCao() != null) {
				caoDeServicoRepository.save(cadastro.getCao());
			}
			if (cadastro.getEndereco() != null) {
				enderecoRepository.save(cadastro.getEndereco());
			}
			if (cadastro.getAdestramento() != null) {
				adestramentoRepository.save(cadastro.getAdestramento());
			}
			if (cadastro.getDocumentacao() != null) {
				documentacaoRepository.save(cadastro.getDocumentacao());
			}
			return cadastroRepository.save(cadastro);
		}else {
			throw new CustomException("Erro ao salvar o Cadastro");
		}
	}

	@Transactional
	@Override
	public Cadastro update(Long id, Cadastro cadastro) {
		if (cadastroRepository.existsById(id)) {
			if (cadastro.getCondutor() != null) {
				condutorRepository.save(cadastro.getCondutor());
			}
			if (cadastro.getCao() != null) {
				caoDeServicoRepository.save(cadastro.getCao());
			}
			if (cadastro.getEndereco() != null) {
				enderecoRepository.save(cadastro.getEndereco());
			}
			if (cadastro.getAdestramento() != null) {
				adestramentoRepository.save(cadastro.getAdestramento());
			}
			if (cadastro.getDocumentacao() != null) {
				documentacaoRepository.save(cadastro.getDocumentacao());
			}
			return cadastroRepository.save(cadastro);
		} else {
			throw new CustomException("Cadastro não encontrado com o id " + id);
		}
	}

	@Transactional
	@Override
	public void delete(Long id) {
		if (cadastroRepository.existsById(id)) {
			Cadastro cadastro = cadastroRepository.findById(id).orElseThrow(() -> new CustomException("Cadastro não encontrado com o id " + id));
			if (cadastro.getCondutor() != null) {
				condutorRepository.delete(cadastro.getCondutor());
			}
			if (cadastro.getCao() != null) {
				caoDeServicoRepository.delete(cadastro.getCao());
			}
			if (cadastro.getEndereco() != null) {
				enderecoRepository.delete(cadastro.getEndereco());
			}
			if (cadastro.getAdestramento() != null) {
				adestramentoRepository.delete(cadastro.getAdestramento());
			}
			if (cadastro.getDocumentacao() != null) {
				documentacaoRepository.delete(cadastro.getDocumentacao());
			}
			cadastroRepository.delete(cadastro);
		} else {
			throw new CustomException("Cadastro não encontrado com o id " + id);
		}
	}

}