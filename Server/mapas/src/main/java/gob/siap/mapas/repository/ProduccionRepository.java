package gob.siap.mapas.repository;

import gob.siap.mapas.models.ProduccionCultivo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ssocial.dsg
 */
public interface ProduccionRepository extends CrudRepository<ProduccionCultivo, Long> {

    @Query(nativeQuery = true, value = "EXEC GetProduccionByCultivo @anio = :anio, @ciclo = :ciclo, @modalidad = :modalidad, @estado = :estado, @distrito = :distrito, @municipio = :municipio, @catalogo = :catalogo")
    public Iterable<ProduccionCultivo> getProduccionByCultivo(
            @Param("anio") int anio,
            @Param("ciclo") int ciclo,
            @Param("modalidad") int modalidad,
            @Param("estado") int estado,
            @Param("distrito") int distrito,
            @Param("municipio") int municipio,
            @Param("catalogo") String catalogo
    );
}
