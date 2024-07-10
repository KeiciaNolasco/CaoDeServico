package caodeservico.msuser.resources;

import caodeservico.msuser.services.GenericService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

public abstract class GenericResource<T, ID> {

    protected abstract GenericService<T, ID> getService();

    @GetMapping
    public ResponseEntity<List<T>> findAll() {
        List<T> list = getService().findAll();
        return ResponseEntity.ok().body(list);
    }

    @GetMapping("/{id}")
    public ResponseEntity<T> findById(@PathVariable ID id) {
        T obj = getService().findById(id)
                .orElseThrow(() -> new RuntimeException("Entity not found with id " + id));
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public ResponseEntity<T> create(@RequestBody T entity) {
        T obj = getService().save(entity);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(getId(obj)).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @PutMapping("/{id}")
    public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T entity) {
        T updatedObj = getService().update(id, entity);
        return ResponseEntity.ok().body(updatedObj);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        getService().delete(id);
        return ResponseEntity.noContent().build();
    }

    protected abstract ID getId(T entity);

}
