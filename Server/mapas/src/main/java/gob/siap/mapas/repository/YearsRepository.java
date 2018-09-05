package gob.siap.mapas.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import gob.siap.mapas.models.Year;

/**
 *
 * @author ssocial.dsg
 */
public interface YearsRepository extends CrudRepository<Year, Integer> {

    @Query("SELECT DISTINCT anio FROM Year AS a ORDER BY anio DESC")
    Iterable<Integer> findAllDistinct();

    public Year findDistinctYearByAnio(int anio);
}
