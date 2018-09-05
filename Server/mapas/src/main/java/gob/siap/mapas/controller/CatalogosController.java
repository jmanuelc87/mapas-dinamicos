package gob.siap.mapas.controller;

import gob.siap.mapas.models.Year;
import gob.siap.mapas.models.CultivoDetalle;
import gob.siap.mapas.models.CultivoGenerico;
import gob.siap.mapas.models.Distrito;
import gob.siap.mapas.models.Estado;
import gob.siap.mapas.models.Municipio;
import gob.siap.mapas.models.Variedad;
import gob.siap.mapas.repository.CultivoDetalleRepository;
import gob.siap.mapas.repository.CultivoGenericoRepository;
import gob.siap.mapas.repository.DistritoRepository;
import gob.siap.mapas.repository.EstadoRepository;
import gob.siap.mapas.repository.MunicipioRepository;
import gob.siap.mapas.repository.VariedadRepository;
import gob.siap.mapas.repository.YearsRepository;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author ssocial.dsg
 */
@RestController
@RequestMapping(path = "catalogo")
public class CatalogosController {

    @Autowired
    private YearsRepository years;

    @Autowired
    private EstadoRepository estados;

    @Autowired
    private DistritoRepository distritos;

    @Autowired
    private MunicipioRepository municipios;

    @Autowired
    private CultivoGenericoRepository genericos;

    @Autowired
    private CultivoDetalleRepository detalle;

    @Autowired
    private VariedadRepository variedad;

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "years")
    public Iterable<Year> getAnios() {

        List<Year> toReturn = new ArrayList<>();
        Iterable<Integer> anios = years.findAllDistinct();

        for (Integer anio : anios) {
            toReturn.add(new Year(anio));
        }

        return toReturn;
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "estados")
    public Iterable<Estado> getEstados() {
        return estados.findAll();
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "distritos")
    public Iterable<Distrito> getDistritos(@RequestParam(value = "id", defaultValue = "1") int estado) {
        return distritos.findDistritoByEstado(estado);
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "municipios")
    public Iterable<Municipio> getMunicipios(@RequestParam(value = "distritoid", defaultValue = "1") int distrito, @RequestParam(value = "estadoid", defaultValue = "1") int estado) {
        return municipios.findMunicipioByEstadoAndDistrito(estado, distrito);
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "cultivos/generico")
    public Iterable<CultivoGenerico> getCultivoGenerico() {
        return genericos.findAllByOrderByNombre();
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "cultivos/detalle")
    public Iterable<CultivoDetalle> getCultivosDetalle() {
        return detalle.findAllByOrderByNombre();
    }

    @CrossOrigin(methods = {RequestMethod.POST, RequestMethod.GET}, origins = {"*"})
    @GetMapping(path = "variedades/{cultivo}")
    public Iterable<Variedad> getVariedades(@PathVariable(name = "cultivo") int cultivo) {
        return variedad.findAllByCultivoOrderByVariedad(cultivo);
    }

}
