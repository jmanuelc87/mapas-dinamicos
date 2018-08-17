package gob.siap.mapas.models;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author ssocial.dsg
 */
@Entity
public class ProduccionCultivo {

    @Id
    private int id;

    private String cultivo;

    private int idvariedad;

    private String variedad;

    private double sembrada;

    private double cosechada;

    private double produccion;

    private double rendimiento;

    private double pmr;

    private double valor;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCultivo() {
        return cultivo;
    }

    public void setCultivo(String cultivo) {
        this.cultivo = cultivo;
    }

    public int getIdvariedad() {
        return idvariedad;
    }

    public void setIdvariedad(int idvariedad) {
        this.idvariedad = idvariedad;
    }

    public String getVariedad() {
        return variedad;
    }

    public void setVariedad(String variedad) {
        this.variedad = variedad;
    }

    public double getSembrada() {
        return sembrada;
    }

    public void setSembrada(double sembrada) {
        this.sembrada = sembrada;
    }

    public double getCosechada() {
        return cosechada;
    }

    public void setCosechada(double cosechada) {
        this.cosechada = cosechada;
    }

    public double getProduccion() {
        return produccion;
    }

    public void setProduccion(double produccion) {
        this.produccion = produccion;
    }

    public double getRendimiento() {
        return rendimiento;
    }

    public void setRendimiento(double rendimiento) {
        this.rendimiento = rendimiento;
    }

    public double getPmr() {
        return pmr;
    }

    public void setPmr(double pmr) {
        this.pmr = pmr;
    }

    public double getValor() {
        return valor;
    }

    public void setValor(double valor) {
        this.valor = valor;
    }

}
