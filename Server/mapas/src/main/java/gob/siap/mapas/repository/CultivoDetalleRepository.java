package gob.siap.mapas.repository;

import gob.siap.mapas.models.CultivoDetalle;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author ssocial.dsg
 */
public interface CultivoDetalleRepository extends CrudRepository<CultivoDetalle, Integer> {

    public Iterable<CultivoDetalle> findAllByOrderByNombre();

}
