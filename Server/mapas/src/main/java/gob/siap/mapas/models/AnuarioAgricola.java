package gob.siap.mapas.models;

/**
 *
 * @author ssocial.dsg
 */
public class AnuarioAgricola extends Anuario {

    private int anio;

    private int estado;

    private int distrito;

    private int municipio;

    private int ciclo;

    private int modalidad;

    private int cultivo;

    private int variedad;

    private String catalogo;

    private String filtro;

    private double sembrada;

    private double cosechada;

    private double produccion;

    private double rendimiento;

    private double pmr;

    private double valor;

    public int getAnio() {
        return anio;
    }

    public void setAnio(int anio) {
        this.anio = anio;
    }

    public int getEstado() {
        return estado;
    }

    public void setEstado(int estado) {
        this.estado = estado;
    }

    public int getDistrito() {
        return distrito;
    }

    public void setDistrito(int distrito) {
        this.distrito = distrito;
    }

    public int getMunicipio() {
        return municipio;
    }

    public void setMunicipio(int municipio) {
        this.municipio = municipio;
    }

    public int getCiclo() {
        return ciclo;
    }

    public void setCiclo(int ciclo) {
        this.ciclo = ciclo;
    }

    public int getModalidad() {
        return modalidad;
    }

    public void setModalidad(int modalidad) {
        this.modalidad = modalidad;
    }

    public int getCultivo() {
        return cultivo;
    }

    public void setCultivo(int cultivo) {
        this.cultivo = cultivo;
    }

    public int getVariedad() {
        return variedad;
    }

    public void setVariedad(int variedad) {
        this.variedad = variedad;
    }

    public String getCatalogo() {
        return catalogo;
    }

    public void setCatalogo(String catalogo) {
        this.catalogo = catalogo;
    }

    public String getFiltro() {
        return filtro;
    }

    public void setFiltro(String filtro) {
        this.filtro = filtro;
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

    @Override
    public String toString() {
        return "AnuarioAgricola{" + "anio=" + anio + ", estado=" + estado + ", distrito=" + distrito + ", municipio=" + municipio + ", ciclo=" + ciclo + ", modalidad=" + modalidad + ", cultivo=" + cultivo + ", variedad=" + variedad + ", catalogo=" + catalogo + ", filtro=" + filtro + ", sembrada=" + sembrada + ", cosechada=" + cosechada + ", produccion=" + produccion + ", rendimiento=" + rendimiento + ", pmr=" + pmr + ", valor=" + valor + '}';
    }

}
