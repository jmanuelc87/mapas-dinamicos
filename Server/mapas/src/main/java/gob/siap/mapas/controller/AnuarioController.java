package gob.siap.mapas.controller;

import gob.siap.mapas.dto.DTOUtil;
import gob.siap.mapas.models.AnuarioAgricola;
import gob.siap.mapas.models.ProduccionCultivo;
import gob.siap.mapas.models.ProduccionDistrito;
import gob.siap.mapas.models.ProduccionDistritoMunicipio;
import gob.siap.mapas.models.ProduccionEstado;
import gob.siap.mapas.models.ProduccionMunicipio;
import gob.siap.mapas.models.Region;
import gob.siap.mapas.repository.ProduccionDistritoMunicipioRepository;
import gob.siap.mapas.repository.ProduccionDistritoRepository;
import gob.siap.mapas.repository.ProduccionEstadoRepository;
import gob.siap.mapas.repository.ProduccionMunicipioRepository;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import gob.siap.mapas.repository.ProduccionRepository;
import gob.siap.mapas.repository.RegionRepository;

/**
 *
 * @author ssocial.dsg
 */
@RestController
@RequestMapping(path = "consultas")
public class AnuarioController {

    private Logger log = Logger.getLogger(this.getClass().toString());

    @Autowired
    private ProduccionRepository repo;

    @Autowired
    private ProduccionEstadoRepository repo1;

    @Autowired
    private ProduccionDistritoRepository repo2;

    @Autowired
    private ProduccionMunicipioRepository repo3;

    @Autowired
    private ProduccionDistritoMunicipioRepository repo4;

    @Autowired
    private RegionRepository repo5;

    @PostMapping(path = "prod-cultivo")
    public Iterable<ProduccionCultivo> getProduccionCultivo(@RequestBody AnuarioAgricola a) {
        return repo.getProduccionByCultivo(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getEstado(), a.getDistrito(), a.getMunicipio(), a.getCatalogo());
    }

    @PostMapping(path = "prod-estado")
    public Iterable getProduccion(@RequestBody AnuarioAgricola a) {
        Iterable returnValue = null;
        if ("estado".equals(a.getFiltro())) {
            DTOUtil<ProduccionEstado> util = new DTOUtil<>();
            Iterable<ProduccionEstado> estado = repo1.getProduccionByEstado(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getCultivo(), a.getVariedad(), a.getEstado(), a.getDistrito(), a.getCatalogo());
            returnValue = util.convert(estado);
        } else if ("distrito".equals(a.getFiltro())) {
            DTOUtil<ProduccionDistrito> util = new DTOUtil<>();
            Iterable<ProduccionDistrito> distrito = repo2.getProduccionByDistrito(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getCultivo(), a.getVariedad(), a.getEstado(), a.getDistrito(), a.getCatalogo());
            returnValue = util.convert(distrito);
        } else if ("municipio".equals(a.getFiltro())) {
            DTOUtil<ProduccionMunicipio> util = new DTOUtil<>();
            Iterable<ProduccionMunicipio> municipio = repo3.getProduccionByMunicipio(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getCultivo(), a.getVariedad(), a.getEstado(), a.getDistrito(), a.getCatalogo());
            returnValue = util.convert(municipio);
        } else if ("ddr-mun".equals(a.getFiltro())) {
            DTOUtil<ProduccionDistritoMunicipio> util = new DTOUtil<>();
            Iterable<ProduccionDistritoMunicipio> ddrmun = repo4.getProduccionByDistritoMunicipio(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getCultivo(), a.getVariedad(), a.getEstado(), a.getDistrito(), a.getCatalogo());
            returnValue = util.convert(ddrmun);
        }

        return returnValue;
    }

    @PostMapping(path = "estados")
    public Iterable getRegiones(@RequestBody AnuarioAgricola a) {
        Iterable<Region> iter = repo5.getEstadoByParams(a.getAnio(), a.getCiclo(), a.getModalidad(), a.getCultivo(), a.getVariedad(), a.getEstado(), a.getDistrito(), a.getMunicipio(), a.getCatalogo());
        DTOUtil<Region> util = new DTOUtil<>();
        return util.convert(iter);
    }
}
