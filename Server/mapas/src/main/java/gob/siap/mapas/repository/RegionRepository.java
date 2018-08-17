package gob.siap.mapas.repository;

import gob.siap.mapas.models.Region;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

/**
 *
 * @author ssocial.dsg
 */
public interface RegionRepository extends CrudRepository<Region, Long> {

    @Query(nativeQuery = true, value = "EXEC GetEstadosByParams @anio = :anio, @ciclo = :ciclo, @moda = :modalidad, @cultivo = :cultivo, @variedad = :variedad, @estado = :estado, @ddr = :distrito, @mpio = :municipio, @catalogo = :catalogo")
    public Iterable<Region> getEstadoByParams(
            @Param("anio") int anio,
            @Param("ciclo") int ciclo,
            @Param("modalidad") int modalidad,
            @Param("cultivo") int cultivo,
            @Param("variedad") int variedad,
            @Param("estado") int estado,
            @Param("distrito") int distrito,
            @Param("municipio") int municipio,
            @Param("catalogo") String catalogo
    );

}
