package caodeservico.msuser.services;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public abstract class GenericService<T, ID> {

    protected abstract JpaRepository<T, ID> getRepository();

    public List<T> findAll() {
        return getRepository().findAll();
    }

    public Optional<T> findById(ID id) {
        return getRepository().findById(id);
    }

    public T save(T entity) {
        return getRepository().save(entity);
    }

    public T update(ID id, T entity) {
        if (getRepository().existsById(id)) {
            return getRepository().save(entity);
        } else {
            throw new RuntimeException("Entity not found with id " + id);
        }
    }

    public void delete(ID id) {
        if (getRepository().existsById(id)) {
            getRepository().deleteById(id);
        } else {
            throw new RuntimeException("Entity not found with id " + id);
        }
    }

}
