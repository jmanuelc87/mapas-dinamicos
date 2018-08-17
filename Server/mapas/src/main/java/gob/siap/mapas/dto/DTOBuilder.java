package gob.siap.mapas.dto;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author ssocial.dsg
 */
public class DTOBuilder {

    public Map<String, Object> toDTO() throws IllegalAccessException, IllegalArgumentException, InvocationTargetException {
        Method[] methods = this.getClass().getMethods();
        Map<String, Object> dto = new HashMap<>();
        for (Method method : methods) {
            if (method.getName().startsWith("get") && !method.getName().contains("Class")) {
                Object returnValue = method.invoke(this);
                String propName = method.getName().substring(3, method.getName().length());
                dto.put(propName.substring(0, 1).toLowerCase() + propName.substring(1, propName.length()), returnValue);
            }
        }
        return dto;
    }

}
