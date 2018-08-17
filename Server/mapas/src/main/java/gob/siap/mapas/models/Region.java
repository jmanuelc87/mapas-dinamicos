package gob.siap.mapas.models;

import gob.siap.mapas.dto.DTOBuilder;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author ssocial.dsg
 */
@Entity
public class Region extends DTOBuilder {

    @Id
    private int idestado;

    private String nomestado;

    private int cveddr;

    private String nomddr;

    private int cvempio;

    private String nommpio;

    public int getIdestado() {
        return idestado;
    }

    public void setIdestado(int idestado) {
        this.idestado = idestado;
    }

    public String getNomestado() {
        return nomestado;
    }

    public void setNomestado(String nomestado) {
        this.nomestado = nomestado;
    }

    public int getCveddr() {
        return cveddr;
    }

    public void setCveddr(int cveddr) {
        this.cveddr = cveddr;
    }

    public String getNomddr() {
        return nomddr;
    }

    public void setNomddr(String nomddr) {
        this.nomddr = nomddr;
    }

    public int getCvempio() {
        return cvempio;
    }

    public void setCvempio(int cvempio) {
        this.cvempio = cvempio;
    }

    public String getNommpio() {
        return nommpio;
    }

    public void setNommpio(String nommpio) {
        this.nommpio = nommpio;
    }

}
