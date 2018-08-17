package gob.siap.mapas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author ssocial.dsg
 */
@Entity(name = "Year")
@Table(name = "anios")
public class Year {

    @Id
    @Column(name = "anio")
    private int anio;

    public Year() {
    }

    public Year(int anio) {
        this.anio = anio;
    }

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

}
