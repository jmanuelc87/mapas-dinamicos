package gob.siap.mapas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author ssocial.dsg
 */
@Entity(name = "Municipio")
@Table(name = "cat_municipal")
public class Municipio {

    @Id
    @Column(name = "cvempio")
    public int cve_mun;

    @Column(name = "nommpio")
    public String nombre;

    @Column(name = "cveestado")
    public int estado;

    @Column(name = "cveddr")
    public int distrito;

}
