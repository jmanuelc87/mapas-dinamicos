package gob.siap.mapas.models;

import gob.siap.mapas.dto.DTOBuilder;
import javax.persistence.Entity;
import javax.persistence.Id;

/**
 *
 * @author ssocial.dsg
 */
@Entity
public class ProduccionDistritoMunicipio extends DTOBuilder {
    
    @Id
    private int id;

    private int idestado;

    private String estado;

    private int iddistrito;

    private String distrito;

    private int idmunicipio;

    private String municipio;

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

    public int getIdestado() {
        return idestado;
    }

    public void setIdestado(int idestado) {
        this.idestado = idestado;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public int getIddistrito() {
        return iddistrito;
    }

    public void setIddistrito(int iddistrito) {
        this.iddistrito = iddistrito;
    }

    public String getDistrito() {
        return distrito;
    }

    public void setDistrito(String distrito) {
        this.distrito = distrito;
    }

    public int getIdmunicipio() {
        return idmunicipio;
    }

    public void setIdmunicipio(int idmunicipio) {
        this.idmunicipio = idmunicipio;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
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
