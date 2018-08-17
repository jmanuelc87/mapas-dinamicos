package gob.siap.mapas.dto;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 *
 * @author ssocial.dsg
 */
public class DTOUtil<T extends DTOBuilder> {

    public Iterable<Map<String, Object>> convert(Iterable<T> iter) {
        List<Map<String, Object>> list = new ArrayList<>();
        try {
            for (T element : iter) {
                list.add(element.toDTO());
            }
            return list;
        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException ex) {
            throw new Exception(ex.getMessage());
        } finally {
            return list;
        }
    }
}
