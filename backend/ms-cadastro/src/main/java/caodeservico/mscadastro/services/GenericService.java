package caodeservico.mscadastro.services;

import caodeservico.mscadastro.entities.User;
import caodeservico.mscadastro.exceptions.CustomException;
import caodeservico.mscadastro.feignclients.UserFeignClient;
import jakarta.persistence.Column;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Base64;
import java.util.Date;
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

                if (field.getName().equals("foto") && field.getType().equals(byte[].class)) {
                    byte[] fotoBytes = (byte[]) field.get(entity);
                    if (fotoBytes != null) {
                        field.set(entity, fotoBytes);
                    }
                }

                if (field.getName().equals("nascimento")) {
                    if (field.getType().equals(String.class)) {
                        String nascimentoStr = (String) field.get(entity);
                        if (nascimentoStr != null) {
                            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                            Date nascimento = df.parse(nascimentoStr);
                            field.set(entity, nascimento);
                        }
                    } else if (field.getType().equals(Date.class)) {
                    }
                }
            }

            Field idField = entity.getClass().getDeclaredField("id");
            idField.setAccessible(true);
            idField.set(entity, userId);

            return save(entity);
        } catch (Exception e) {
            throw new CustomException("Erro ao salvar entidade com id " + userId, e);
        }
    }

}
