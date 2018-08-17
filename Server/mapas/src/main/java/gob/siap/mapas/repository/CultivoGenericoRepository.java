package gob.siap.mapas.repository;

import gob.siap.mapas.models.CultivoGenerico;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author ssocial.dsg
 */
public interface CultivoGenericoRepository extends CrudRepository<CultivoGenerico, Integer> {

    public Iterable<CultivoGenerico> findAllByOrderByNombre();

}
