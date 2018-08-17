package gob.siap.mapas.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 *
 * @author ssocial.dsg
 */
@Entity(name = "CultivoDetalle")
@Table(name = "ago_cultivo2")
public class CultivoDetalle {

    @Id
    @Column(name = "cvecultivo")
    public int id;

    @Column(name = "nomcultivo")
    public String nombre;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

}
