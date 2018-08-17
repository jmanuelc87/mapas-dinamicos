package gob.siap.mapas.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ssocial.dsg
 */
@RestController
@RequestMapping(path = "/")
public class MainController {

    @GetMapping()
    public String index() {
        return "Servicios Mapas Dinámicos";
    }

}
