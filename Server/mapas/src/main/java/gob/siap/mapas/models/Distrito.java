package gob.siap.mapas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author ssocial.dsg
 */
@Entity(name = "Distrito")
@Table(name = "cat_distrito")
public class Distrito {

    @Id
    @Column(name = "iddistrito")
    private Long cve_ddr;

    @Column(name = "idestado")
    private Integer estado;

    @Column(name = "distrito")
    private String nombre;

    public Long getCve_ddr() {
        return cve_ddr;
    }

    public void setCve_ddr(Long cve_ddr) {
        this.cve_ddr = cve_ddr;
    }

    public Integer getEstado() {
        return estado;
    }

    public void setEstado(Integer estado) {
        this.estado = estado;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
