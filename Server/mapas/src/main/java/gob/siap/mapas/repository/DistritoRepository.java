package gob.siap.mapas.repository;

import gob.siap.mapas.models.Distrito;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author ssocial.dsg
 */
public interface DistritoRepository extends CrudRepository<Distrito, Long> {

    public Iterable<Distrito> findDistritoByEstado(int estado);

}
