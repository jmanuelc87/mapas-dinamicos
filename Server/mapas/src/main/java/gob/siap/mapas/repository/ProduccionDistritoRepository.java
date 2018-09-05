package gob.siap.mapas.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import gob.siap.mapas.models.ProduccionDistrito;

/**
 *
 * @author ssocial.dsg
 */
public interface ProduccionDistritoRepository extends CrudRepository<ProduccionDistrito, Long> {

    @Query(nativeQuery = true, value = "EXEC GetProduccionByEstado @anio = :anio, @ciclo = :ciclo, @moda = :modalidad, @cultivo = :cultivo, @variedad = :variedad, @estado = :estado, @distrito = :distrito, @catalogo = :catalogo, @filtro = 'distrito'")
    public Iterable<ProduccionDistrito> getProduccionByDistrito(
            @Param("anio") int anio,
            @Param("ciclo") int ciclo,
            @Param("modalidad") int modalidad,
            @Param("cultivo") int cultivo,
            @Param("variedad") int variedad,
            @Param("estado") int estado,
            @Param("distrito") int distrito,
            @Param("catalogo") String catalogo
    );
}
