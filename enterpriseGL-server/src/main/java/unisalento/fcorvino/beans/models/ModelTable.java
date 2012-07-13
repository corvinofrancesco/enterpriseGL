package unisalento.fcorvino.beans.models;

import unisalento.fcorvino.etl.EtlLoadBean;

/**
 *
 * @author Francesco Corvino
 */
public class ModelTable {
    private String name;
    private String description;
    private EtlLoadBean loader;

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public EtlLoadBean getLoader() {
        return loader;
    }

    public void setLoader(EtlLoadBean loader) {
        this.loader = loader;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }    
}
