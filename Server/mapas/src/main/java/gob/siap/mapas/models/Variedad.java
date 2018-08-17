package gob.siap.mapas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author ssocial.dsg
 */
@Entity(name = "Variedad")
@Table(name = "ago_variedades")
public class Variedad {

    @Id
    @Column(name = "cvevariedad")
    private int id;

    @Column(name = "cvecultivo")
    private int cultivo;

    @Column(name = "nomvariedad")
    private String variedad;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getCultivo() {
        return cultivo;
    }

    public void setCultivo(int cultivo) {
        this.cultivo = cultivo;
    }

    public String getVariedad() {
        return variedad;
    }

    public void setVariedad(String variedad) {
        this.variedad = variedad;
    }

}
