package caodeservico.mscadastro.resources;

import caodeservico.mscadastro.services.GenericService;
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

    @GetMapping("/findById/{id}")
    public ResponseEntity<T> findById(@PathVariable ID id) {
        T obj = getService().findById(id).orElse(null);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping("/save")
    public ResponseEntity<T> save(@RequestBody T entity) {
        T obj = getService().save(entity);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(getId(obj)).toUri();
        return ResponseEntity.created(uri).body(obj);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<T> update(@PathVariable ID id, @RequestBody T entity) {
        T updatedObj = getService().update(id, entity);
        return ResponseEntity.ok().body(updatedObj);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        getService().delete(id);
        return ResponseEntity.noContent().build();
    }

    protected abstract ID getId(T entity);

}
