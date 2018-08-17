package gob.siap.mapas.repository;

import gob.siap.mapas.models.Variedad;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author ssocial.dsg
 */
public interface VariedadRepository extends CrudRepository<Variedad, Integer> {

    public Iterable<Variedad> findAllByCultivoOrderByVariedad(int cultivo);
}
