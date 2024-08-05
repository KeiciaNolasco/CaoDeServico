package caodeservico.mscadastro.services;

import caodeservico.mscadastro.exceptions.CustomException;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class GenericService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    public List<T> findAll() {
        try {
            return getRepository().findAll();
        } catch (Exception e) {
            throw new CustomException("Erro ao buscar todas as entidades", e);
        }
    }

    public Optional<T> findById(ID id) {
        try {
            return getRepository().findById(id);
        } catch (Exception e) {
            throw new CustomException("Erro ao buscar entidade com id " + id, e);
        }
    }

    public T save(T entity) {
        try {
            return getRepository().save(entity);
        } catch (Exception e) {
            throw new CustomException("Erro ao salvar entidade", e);
        }
    }

    public T update(ID id, T entity) {
        if (getRepository().existsById(id)) {
            try {
                return getRepository().save(entity);
            } catch (Exception e) {
                throw new CustomException("Erro ao atualizar entidade com id " + id, e);
            }
        } else {
            throw new CustomException("Entidade não encontrada com o id " + id);
        }
    }

    public void delete(ID id) {
        if (getRepository().existsById(id)) {
            try {
                getRepository().deleteById(id);
            } catch (Exception e) {
                throw new CustomException("Erro ao deletar entidade com id " + id, e);
            }
        } else {
            throw new CustomException("Entidade não encontrada com o id " + id);
        }
    }

}
