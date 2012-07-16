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

    public ModelTable(String name, String description, EtlLoadBean loader) {
        this.name = name;
        this.description = description;
        this.loader = loader;
    }

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

    @Override
    public boolean equals(Object obj) {
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        final ModelTable other = (ModelTable) obj;
        if ((this.name == null) ? (other.name != null) : !this.name.equals(other.name)) {
            return false;
        }
        return true;
    }    
}
