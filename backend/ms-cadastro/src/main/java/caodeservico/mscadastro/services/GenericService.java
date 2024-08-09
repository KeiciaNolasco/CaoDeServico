package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.User;
import caodeservico.mscadastro.exceptions.CustomException;
import caodeservico.mscadastro.feignclients.UserFeignClient;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

import java.lang.reflect.Field;

public abstract class GenericService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    @Autowired
    private UserFeignClient userFeignClient;

    @Transactional
    public List<T> findAll() {
        try {
            return getRepository().findAll();
        } catch (Exception e) {
            throw new CustomException("Erro ao buscar todas as entidades", e);
        }
    }

    @Transactional
    public Optional<T> findById(ID id) {
        try {
            return getRepository().findById(id);
        } catch (Exception e) {
            throw new CustomException("Erro ao buscar entidade com id " + id, e);
        }
    }

    @Transactional
    public T save(T entity) {
        try {
            return getRepository().save(entity);
        } catch (Exception e) {
            throw new CustomException("Erro ao salvar entidade", e);
        }
    }

    @Transactional
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

    @Transactional
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

    @Transactional
    public T saveWithUserId(Long userId, T entity) {
        try {
            User user = userFeignClient.findById(userId);
            for (Field field : entity.getClass().getDeclaredFields()) {
                field.setAccessible(true);
                if (field.isAnnotationPresent(Column.class)) {
                    Column column = field.getAnnotation(Column.class);
                    if (!column.nullable() && field.get(entity) == null) {
                        throw new CustomException("O campo " + field.getName() + " não pode ser nulo");
                    }
                }
            }
            try {
                Field idField = entity.getClass().getDeclaredField("id");
                idField.setAccessible(true);
                idField.set(entity, userId);
            } catch (NoSuchFieldException | IllegalAccessException e) {
                throw new CustomException("Erro ao associar o ID do usuário com a entidade", e);
            }
            return save(entity);
        } catch (Exception e) {
            throw new CustomException("Erro ao buscar usuário com id " + userId + " do Feign Client", e);
        }
    }

}
