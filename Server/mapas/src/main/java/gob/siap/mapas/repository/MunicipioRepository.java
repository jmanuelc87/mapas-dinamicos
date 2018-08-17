package gob.siap.mapas.repository;

import gob.siap.mapas.models.Municipio;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author ssocial.dsg
 */
public interface MunicipioRepository extends CrudRepository<Municipio, Integer> {

    public Iterable<Municipio> findMunicipioByEstadoAndDistrito(int estado, int distrito);

}
