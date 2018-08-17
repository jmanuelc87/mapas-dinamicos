package gob.siap.mapas.repository;

import gob.siap.mapas.models.ProduccionDistritoMunicipio;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ssocial.dsg
 */
public interface ProduccionDistritoMunicipioRepository extends CrudRepository<ProduccionDistritoMunicipio, Long> {

    @Query(nativeQuery = true, value = "EXEC GetProduccionByEstado @anio = :anio, @ciclo = :ciclo, @moda = :modalidad, @cultivo = :cultivo, @variedad = :variedad, @estado = :estado, @distrito = :distrito, @catalogo = :catalogo, @filtro = 'ddr-mun'")
    public Iterable<ProduccionDistritoMunicipio> getProduccionByDistritoMunicipio(
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
